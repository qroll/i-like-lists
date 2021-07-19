import { ButtonHTMLAttributes, MouseEvent } from "react";
import styled from "styled-components";
import { getSystemProps, SystemProps, th } from "./Theme";

interface ButtonProps extends SystemProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonHTMLAttributes<any>["type"];
}

const StyledButton = styled.button<SystemProps>`
  background-color: ${th.color("primary-400")};
  border: none;
  border-radius: ${th.radii("default")};
  color: #fff;
  cursor: pointer;
  font-size: ${th.fontSize("default")};
  font-weight: normal;
  outline: none;
  box-shadow: none;
  padding: ${th.space("xs")} ${th.space("m")};

  &:focus,
  &:hover {
    background-color: ${th.color("primary-500")};
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

  ${getSystemProps()}
`;

export const Button = (props: ButtonProps): JSX.Element => {
  const { children, ...buttonProps } = props;
  return <StyledButton {...buttonProps}>{children}</StyledButton>;
};
