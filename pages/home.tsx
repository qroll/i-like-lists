import { GetServerSidePropsResult, NextPageContext } from "next";
import Head from "next/head";
import { FlexContainer } from "../components/Layout";
import { H1, Text } from "../components/Text";
import nc from "next-connect";
import { authMiddleware } from "../lib/auth/middleware";
import { loggingMiddleware } from "../lib/common/logger/middleware";
import { webErrorHandler } from "../lib/error/handler";
import { ApiRequest } from "../lib/auth/types";

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
      <H1>i-like-lists</H1>
      <Text>
        Welcome <Text bold>{username}</Text>
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
