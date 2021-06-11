import React from "react";
import { ThemeProvider } from "styled-components";

interface ThemeProps {
  children: React.ReactNode;
  theme: "dark" | "light";
}

interface Theme {}

const lightTheme: Theme = {};
const darkTheme: Theme = {};

export const UserTheme = (props: ThemeProps): JSX.Element => {
  const { children, theme } = props;
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
};
