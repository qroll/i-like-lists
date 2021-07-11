import React from "react";
import { Theme, ThemeProvider, defaultTheme, Preflight } from "@xstyled/styled-components";

interface ThemeProps {
  children: React.ReactNode;
  theme?: "dark" | "light";
}

const baseTheme: Theme = {
  ...defaultTheme,
  space: {
    0: "0",
    xxs: "0.25rem",
    xs: "0.5rem",
    s: "0.75rem",
    m: "1rem",
    l: "1.25rem",
    xl: "1.5rem",
    "2xl": "1.75rem",
    "3xl": "2rem",
  },
};

const lightTheme: Theme = {
  ...baseTheme,
};

const darkTheme: Theme = {
  ...baseTheme,
};

export const UserTheme = (props: ThemeProps): JSX.Element => {
  const { children, theme } = props;
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Preflight />
      {children}
    </ThemeProvider>
  );
};
