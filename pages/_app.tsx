import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import "../styles/globals.css";

const theme = {};

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
