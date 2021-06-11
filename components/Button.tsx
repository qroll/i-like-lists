import styled from "styled-components";

export const Button = styled.button`
  background-color: #626293;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  margin: 0.5em;
  outline: none;
  padding: 0.5em 0.8em;

  &:focus {
    background-color: #414162;
    box-shadow: 0 0 0 3px #7878a5;
  }

  &:hover {
    background-color: #414162;
  }
`;
