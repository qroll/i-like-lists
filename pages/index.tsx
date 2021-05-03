import Head from "next/head";
import { Container } from "../components/Layout";
import { H1 } from "../components/Text";

export default function Home(): JSX.Element {
  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <Container>
      <Head>
        <title>i like lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1>i-like-lists</H1>
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToRegister}>Register</button>
    </Container>
  );
}
