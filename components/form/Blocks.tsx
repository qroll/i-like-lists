import styled from "styled-components";
import { th } from "../Theme";

export const TextLabel = styled.label`
  color: ${th.color("gray-600")};
  font-size: ${th.fontSize("sm")};
  font-weight: ${th.fontWeight("semibold")};
  margin-left: ${th.space("xxs")};
`;

export const TextInput = styled.input<{ hasError: boolean }>`
  border: 1px solid ${(props) => (props.hasError ? th.color("red-500") : th.color("primary-50"))};
  border-radius: ${th.radii("default")};
  color: ${th.color("gray-800")};
  font-size: ${th.fontSize("default")};
  padding: ${th.space("sm")};
  transition: 0.5s all ease;
  width: 100%;

  &:focus {
    border: 1px solid ${(props) => (props.hasError ? th.color("red-500") : th.color("primary-300"))};
    outline: none;
  }

  ${TextLabel} + & {
    margin-top: ${th.space("xs")};
  }
`;

export const Error = styled.div<{ hasError: boolean }>`
  color: ${th.color("red-500")};
  font-size: ${th.fontSize("xs")};
  margin-left: ${th.space("xxs")};
  margin-top: ${th.space("xxs")};
  visibility: ${(props) => (props.hasError ? "visible" : "hidden")};
`;
