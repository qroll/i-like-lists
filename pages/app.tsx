import Head from "next/head";
import { Button } from "../components/Button";
import { FlexContainer } from "../components/Layout";
import { Heading } from "../components/Text";

export default function App(): JSX.Element {
  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <FlexContainer pt="xl" pb="xl">
      <Head>
        <title>i like lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" fontSize="4xl" fontWeight="bold" mt="20vh">
        i-like-lists
      </Heading>
      <Button mt="2xl" onClick={goToLogin}>
        Login
      </Button>
      <Button mt="m" onClick={goToRegister}>
        Register
      </Button>
      <Button mt="m" onClick={goToRegister} disabled>
        Delete Website
      </Button>
    </FlexContainer>
  );
}
