import { useState } from "react";
import styled from "styled-components";
import { HappyThoughtsForm } from "./HappyThoughtsForm";
import { LikeComponent } from "./LikeComponent";
import { TimeComponent } from "./TimeComponent";

const AppContainer = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;
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

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
            <DetailWrapper>
              <LikeComponent />
              <TimeComponent />
            </DetailWrapper>
          </StyledDiv>
        ))}
      </PostsContainer>
    </AppContainer>
  );
};
