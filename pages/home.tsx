import { GetServerSidePropsResult, NextPageContext } from "next";
import nc from "next-connect";
import Head from "next/head";
import { FlexContainer } from "../components/Layout";
import { Heading, Text } from "../components/Text";
import { authMiddleware } from "../lib/auth/middleware";
import { ApiRequest } from "../lib/auth/types";
import { loggingMiddleware } from "../lib/common/logger/middleware";
import { webErrorHandler } from "../lib/error/handler";

interface HomeProps {
  username: string;
}

export default function Home(props: HomeProps): JSX.Element {
  const { username } = props;
  return (
    <FlexContainer>
      <Head>
        <title>i like lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" fontSize="$4xl">
        i-like-lists
      </Heading>
      <Text>
        Welcome <Text fontWeight="$bold">{username}</Text>
      </Text>
    </FlexContainer>
  );
}

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<HomeProps>> {
  const { req, res } = context;
  try {
    await nc().use(loggingMiddleware).use(authMiddleware).run(req!, res!);
    return {
      props: {
        username: (req as ApiRequest).user?.username,
      },
    };
  } catch (err) {
    return webErrorHandler(err, req!, res!);
  }
}
