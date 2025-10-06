import { useState } from "react";
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

const LikeButton = styled.button`
  background-color: ${(props) => (props.$liked ? "#ffcccb" : "#f0eeee")};
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const NumberOfLikes = styled.p`
  color: #747272;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LikeComponent = ({ thoughtId, initialHearts }) => {
  const [likes, setLikes] = useState(initialHearts);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (isLiked) return;

    try {
      const response = await fetch(`${API_URL}/thoughts/${thoughtId}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error("Failed to like thought");
      }

      const data = await response.json();
      console.log("Like successful:", data);

      setLikes(data.hearts);
      setIsLiked(true);
    } catch (error) {
      console.error("Failed to like thought:", error);
    }
  };

  return (
    <LikeWrapper>
      <LikeButton onClick={handleLike} $liked={isLiked}>
        ❤️
      </LikeButton>
      <NumberOfLikes>x {likes}</NumberOfLikes>
    </LikeWrapper>
  );
};
