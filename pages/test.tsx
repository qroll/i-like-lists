import Head from "next/head";
import { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { FlexContainer } from "../components/Layout";
import { Heading } from "../components/Text";

export default function App(): JSX.Element {
  useEffect(() => {
    console.log("useEffect", document.readyState);
    const readyStateChange = () => {
      console.log("readyStateChange", document.readyState);
    };
    document.addEventListener("readystatechange", readyStateChange);
    return () => document.removeEventListener("readystatechange", readyStateChange);
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect", document.readyState);
  }, []);

  return (
    <FlexContainer p="$xl" justifyContent="center">
      <Head>
        <title>meh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" fontSize="$4xl" fontWeight="$bold">
        cats are good
      </Heading>
      <Img src="https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80" />
    </FlexContainer>
  );
}

const Img = styled.img`
  width: 100%;

  @media (max-width: 300px) {
    width: 100px;
  }
`;
