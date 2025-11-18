import { useState } from "react";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );

  const setAuthState = (data) => {
    setAccessToken(data.accessToken);
    setUsername(data.userId);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("username", data.userId);
  };

  const logout = () => {
    setAccessToken(null);
    setUsername(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
  };

  return { accessToken, username, setAuthState, logout };
};
