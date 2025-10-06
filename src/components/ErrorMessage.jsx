import styled from "styled-components";

const ErrorContainer = styled.div`
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  color: #c33;
`;

const ErrorMessage = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <ErrorContainer>
      <p>{error}</p>
      {onDismiss && (
        <button onClick={onDismiss} style={{ marginTop: "0.5rem" }}>
          Dismiss
        </button>
      )}
    </ErrorContainer>
  );
};

export { ErrorMessage };
