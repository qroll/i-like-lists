import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  background,
  border,
  color,
  createSystem,
  flexbox,
  grid,
  shadow,
  layout,
  position,
  space,
  typography,
  AllSystemProps,
} from "system-props";
import { AppTheme } from "../AppTheme";

interface ThemeProps {
  children: React.ReactNode;
  theme?: "dark" | "light";
}

const baseTheme = {
  colors: {
    "primary-50": "#e8e8ef",
    "primary-100": "#c4c6d9",
    "primary-200": "#9fa1bf",
    "primary-300": "#7b7da5",
    "primary-400": "#626293",
    "primary-500": "#4a4882",
    "primary-600": "#44417a",
    "primary-700": "#3c376e",
    "primary-800": "#342e62",
    "primary-900": "#271e4f",
    "secondary-50": "#fdf7e2",
    "secondary-100": "#fae9b6",
    "secondary-200": "#f6db88",
    "secondary-300": "#f3ce5b",
    "secondary-400": "#f1c23f",
    "secondary-500": "#efb932",
    "secondary-600": "#eeac2d",
    "secondary-700": "#ec9b29",
    "secondary-800": "#ea8b26",
    "secondary-900": "#e77022",
    "gray-50": "#F9FAFB",
    "gray-100": "#F3F4F6",
    "gray-200": "#E5E7EB",
    "gray-300": "#D1D5DB",
    "gray-400": "#9CA3AF",
    "gray-500": "#6B7280",
    "gray-600": "#4B5563",
    "gray-700": "#374151",
    "gray-800": "#1F2937",
    "gray-900": "#111827",
    "red-50": "#fae6ea",
    "red-100": "#f3bfca",
    "red-200": "#eb98a9",
    "red-300": "#e37388",
    "red-400": "#db5c71",
    "red-500": "#d44d5d",
    "red-600": "#c4485a",
    "red-700": "#ae4255",
    "red-800": "#993d50",
    "red-900": "#733447",
  },
  breakpoints: ["768px", "1024px"],
  fontSizes: {
    xs: "0.694rem",
    sm: "0.833rem",
    default: "1rem",
    lg: "1.12rem",
    xl: "1.44rem",
    "2xl": "1.728rem",
    "3xl": "2.074rem",
    "4xl": "2.488rem",
  },
  fontWeights: {
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    default: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  space: {
    0: "0",
    xxs: "0.125rem",
    xs: "0.25rem",
    s: "0.5rem",
    sm: "0.75rem",
    m: "1rem",
    l: "2rem",
    xl: "4rem",
  },
};

const lightTheme = {
  ...baseTheme,
};

const darkTheme = {
  ...baseTheme,
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const UserTheme = (props: ThemeProps): JSX.Element => {
  const { children, theme } = props;
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export const system = createSystem();

export const config = {
  ...color,
  ...border,
  ...background,
  ...flexbox,
  ...grid,
  ...shadow,
  ...position,
  ...layout,
  ...space,
  ...typography,
  transform: true as const,
  textDecoration: true as const,
  transition: true as const,
};

export const getSystemProps: () => ReturnType<typeof system> = () => system(config);

export const th = {
  color: (val: keyof AppTheme["colors"]) => ({
    theme,
  }: {
    theme: AppTheme;
  }): AppTheme["colors"][keyof AppTheme["colors"]] => theme.colors[val],
  fontSize: (val: keyof AppTheme["fontSizes"]) => ({
    theme,
  }: {
    theme: AppTheme;
  }): AppTheme["fontSizes"][keyof AppTheme["fontSizes"]] => theme.fontSizes[val],
  fontWeight: (val: keyof AppTheme["fontWeights"]) => ({
    theme,
  }: {
    theme: AppTheme;
  }): AppTheme["fontWeights"][keyof AppTheme["fontWeights"]] => theme.fontWeights[val],
  radii: (val: keyof AppTheme["radii"]) => ({
    theme,
  }: {
    theme: AppTheme;
  }): AppTheme["radii"][keyof AppTheme["radii"]] => theme.radii[val],
  space: (val: keyof AppTheme["space"]) => ({
    theme,
  }: {
    theme: AppTheme;
  }): AppTheme["space"][keyof AppTheme["space"]] => theme.space[val],
};

export type SystemProps = Omit<AllSystemProps, "color">;
