import { useState } from "react";
import styled from "styled-components";

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
  color: #888888;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LikeComponent = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
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
