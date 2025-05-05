import { useState } from "react";
import styled from "styled-components";

const LikeButton = styled.button`
  background-color: #f0eeee;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
`;

const NumberOfLikes = styled.p``;

export const LikeComponent = () => {
  const [likes, setLikes] = useState(0);
  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div>
      <LikeButton onClick={handleLike}>❤️</LikeButton>
      <NumberOfLikes>x {likes}</NumberOfLikes>
    </div>
  );
};
