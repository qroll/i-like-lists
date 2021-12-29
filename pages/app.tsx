import Head from "next/head";
import { ColumnContainer, FlexContainer } from "../components/Layout";
import { Heading } from "../components/Text";
import { PageButton } from "../features/app/components/PageButton";

export default function App(): JSX.Element {
  return (
    <FlexContainer p="$xl" justifyContent="center">
      <Head>
        <title>i like lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" fontSize="$4xl" fontWeight="$bold">
        i-like-lists
      </Heading>
      <ColumnContainer mt="$m" alignItems="center">
        <PageButton href="/login" label="Login" />
        <PageButton href="/register" label="Register" />
        <PageButton
          href="https://www.youtube.com/watch?v=k83hDT6bmCM&list=PLeeDS-Ydy9E1eWmcj0XhCWtPC6BkMArcy&index=6"
          label="Pet a cat"
        />
      </ColumnContainer>
    </FlexContainer>
  );
}
