import { useState } from "react";

export const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8081/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      onSignup(data);
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Skapa konto</h2>
      <input
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Skapa användare</button>
    </form>
  );
};
