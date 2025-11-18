import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/users/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      onLogin(data);
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Logga in</button>
    </form>
  );
};
