import { useState } from "react";
import styled from "styled-components";
import { HappyThoughtsForm } from "./HappyThoughtsForm";

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  gap: 2rem;
`;
const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledDiv = styled.div`
  padding: 1rem;
  border: 1px solid black;
  box-shadow: 8px 8px 0px black;
`;

const PostsText = styled.p`
  font-family: monospace;
  font-size: 16px;
  word-wrap: break-word;
`;

const LikeButton = styled.button`
  background-color: #f0eeee;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
`;

export const HappyThoughtsPosts = () => {
  const [posts, setPosts] = useState([]);
  const addPost = (message) => {
    setPosts((currPosts) => [{ id: Date.now(), message }, ...currPosts]);
  };
  return (
    <AppContainer>
      <HappyThoughtsForm onSubmit={addPost} />
      <PostsContainer>
        {posts.map((i) => (
          <StyledDiv key={i.id}>
            <PostsText>{i.message}</PostsText>
            <LikeButton>❤️</LikeButton>
          </StyledDiv>
        ))}
      </PostsContainer>
    </AppContainer>
  );
};
