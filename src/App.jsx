import { useState, useEffect } from "react";
import { HappyThoughtsForm } from "./components/HappyThoughtsForm";
import { HappyThoughtsPosts } from "./components/HappyThoughtsPosts";
import styled from "styled-components";

const AppContainer = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;
`;

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(url);
      const data = await response.json();
      console.log("DATA FROM API:", data);

      if (response.ok) {
        setPosts(data);
      } else {
        throw new Error("Failed to fetch posts");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (message) => {
    const newPost = {
      _id: Date.now().toString(),
      message,
      hearts: 0,
      createdAt: new Date().toISOString(),
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <AppContainer>
      <HappyThoughtsForm onSubmit={addPost} />
      <HappyThoughtsPosts posts={posts} loading={loading} error={error} />
    </AppContainer>
  );
};
