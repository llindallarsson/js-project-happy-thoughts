import { useState, useEffect, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export const usePosts = (accessToken, username) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/thoughts`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err.message === "Failed to fetch"
          ? "Network error - check your connection and backend server"
          : "Could not load posts"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = useCallback(
    async (message) => {
      if (!accessToken || !username) {
        setError("You must be logged in to post");
        return;
      }

      // Optimistic update
      const tempPost = {
        id: `temp-${Date.now()}`,
        message,
        username,
        createdAt: new Date().toISOString(),
        hearts: 0,
        _isTemporary: true,
      };

      setPosts((prev) => [tempPost, ...prev]);
      setPostLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/thoughts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken.startsWith("Bearer ")
              ? accessToken
              : `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();

        // Replace temporary post with real data
        setPosts((prev) =>
          prev.map((post) => (post.id === tempPost.id ? data : post))
        );
      } catch (err) {
        console.error("Post error:", err);

        // Remove temporary post on error
        setPosts((prev) => prev.filter((post) => post.id !== tempPost.id));

        if (
          err.message.includes("401") ||
          err.message.includes("Unauthorized")
        ) {
          setError("Session expired. Please log in again.");
        } else {
          setError(err.message || "Could not post message");
        }
      } finally {
        setPostLoading(false);
      }
    },
    [accessToken, username]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    postLoading,
    error,
    addPost,
    refetchPosts: fetchPosts,
  };
};
