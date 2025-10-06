import React from "react";
import styled from "styled-components";

import { HappyThoughtsForm } from "./components/HappyThoughtsForm";
import { HappyThoughtsPosts } from "./components/HappyThoughtsPosts";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { ErrorMessage } from "./components/ErrorMessage";
import { useAuth } from "./hooks/useAuth";
import { usePosts } from "./hooks/usePosts";

const AppContainer = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;

  @media (min-width: 667px) {
    padding: 4rem;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const WelcomeMessage = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

const LogoutButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #ff5252;
  }

  &:focus {
    outline: 2px solid #ff6b6b;
    outline-offset: 2px;
  }
`;

const AuthSection = styled.div`
  max-width: 400px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #333;
  }

  & > div {
    margin-bottom: 2rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  &:after {
    content: "";
    width: 32px;
    height: 32px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const App = () => {
  const { accessToken, username, setAuthState, logout } = useAuth();
  const { posts, loading, postLoading, error, addPost, refetchPosts } =
    usePosts(accessToken, username);

  const handleLogout = () => {
    logout();
    // Optionally clear posts when logging out
    // This depends on your app's requirements
  };

  const dismissError = () => {
    // You might want to implement error dismissal in usePosts hook
    console.log("Error dismissed");
  };

  // Show loading spinner on initial load
  if (loading && posts.length === 0) {
    return (
      <AppContainer>
        <LoadingSpinner />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <ErrorMessage error={error} onDismiss={dismissError} />

      {!accessToken ? (
        <AuthSection>
          <div>
            <h2>Create account</h2>
            <SignupForm onSignup={setAuthState} />
          </div>

          <div>
            <h2>Log in</h2>
            <LoginForm onLogin={setAuthState} />
          </div>
        </AuthSection>
      ) : (
        <>
          <Header>
            <WelcomeMessage>Welcome, {username || "user"}!</WelcomeMessage>
            <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
          </Header>

          <HappyThoughtsForm
            onSubmit={addPost}
            loading={postLoading}
            disabled={postLoading}
          />

          <HappyThoughtsPosts
            posts={posts}
            loading={loading}
            error={error}
            onRefresh={refetchPosts}
          />
        </>
      )}
    </AppContainer>
  );
};
