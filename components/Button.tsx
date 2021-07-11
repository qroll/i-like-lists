import styled, { th } from "@xstyled/styled-components";

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.buttonBox<ButtonProps>`
  background-color: #626293;
  border: none;
  border-radius: default;
  color: #fff;
  cursor: pointer;
  font-size: m;
  font-weight: normal;
  outline: none;
  box-shadow: none;
  padding: xs m;

  &:focus,
  &:hover {
    background-color: #414162;
    text-decoration: underline;
    outline: none;
    box-shadow: none;
  }

  &:disabled,
  &:focus:disabled,
  &:hover:disabled {
    background-color: ${th.color("gray-400")};
    cursor: not-allowed;
    text-decoration: none;
    outline: none;
    box-shadow: none;
  }
`;
