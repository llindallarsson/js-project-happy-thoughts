import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f0eeee;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid black;
  box-shadow: 8px 8px 0px black;
`;

const FormLabel = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
`;

const StyledTextarea = styled.textarea`
  min-height: 4rem;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.4;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const FormButton = styled.button`
  display: inline-block;
  background-color: #ffa3a5;
  padding: 8px 16px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  align-self: flex-start;
`;

export const HappyThoughtsForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormLabel htmlFor="messageInput">
        What's making you happy right now?
      </FormLabel>
      <StyledTextarea
        type="text"
        placeholder="Type your message..."
        value={message}
        id="messageInput"
        name="message"
        onChange={(event) => setMessage(event.target.value)}
      />
      <FormButton type="submit"> ❤️ Send Happy Thought ❤️ </FormButton>
    </StyledForm>
  );
};
