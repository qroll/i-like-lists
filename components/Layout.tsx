import styled from "styled-components";
import { getSystemProps, SystemProps } from "./Theme";

export const FlexContainer = styled.div<SystemProps>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #efefef;

  ${getSystemProps()}
`;

export const ColumnContainer = styled.div<SystemProps>`
  display: flex;
  flex-direction: column;

  ${getSystemProps()}
`;

export const RowContainer = styled.div<SystemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${getSystemProps()}
`;

export const Card = styled.div<SystemProps>`
  background-color: #ffffff;
  border-radius: 0.3em;
  box-shadow: 0 0 3px #ccc;

  ${getSystemProps()}
`;
