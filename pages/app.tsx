import Head from "next/head";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Card, Container } from "../components/Layout";
import { H1 } from "../components/Text";

export default function App(): JSX.Element {
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
      <TitleCard>
        <H1>i-like-lists</H1>
        <Button onClick={goToLogin}>Login</Button>
        <Button onClick={goToRegister}>Register</Button>
      </TitleCard>
    </Container>
  );
}

const TitleCard = styled(Card)`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  padding: 2em 1em;
  width: 80vw;
`;
