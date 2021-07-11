import type { AppProps } from "next/app";
import { UserTheme } from "../components/Theme";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <UserTheme>
        <Component {...pageProps} />
      </UserTheme>
    </>
  );
}
