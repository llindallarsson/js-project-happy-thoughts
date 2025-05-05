import { useState } from "react";
import styled from "styled-components";

const MAX_CHARACTERS = 120;

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
  border: 1px solid ${(props) => (props["aria-invalid"] ? "red" : "black")};
  resize: vertical;
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

const CharacterCount = styled.p`
  font-size: 14px;
  color: ${(props) => (props.exceeded ? "red" : "black")};
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
`;

export const HappyThoughtsForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const isTooLong = message.length > MAX_CHARACTERS;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isTooLong) return;
    onSubmit(message);
    setMessage("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormLabel htmlFor="messageInput">
        What's making you happy right now?
      </FormLabel>
      <StyledTextarea
        id="messageInput"
        name="message"
        placeholder="Type your message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        aria-invalid={isTooLong}
        required
      />

      <CharacterCount exceeded={isTooLong}>
        {message.length} / {MAX_CHARACTERS}
      </CharacterCount>

      {isTooLong && (
        <ErrorMessage role="alert">
          Your message is too long. Max {MAX_CHARACTERS} characters.
        </ErrorMessage>
      )}

      <FormButton type="submit" disabled={isTooLong}>
        {" "}
        ❤️ Send Happy Thought ❤️{" "}
      </FormButton>
    </StyledForm>
  );
};
