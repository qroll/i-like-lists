import { GetServerSidePropsResult, NextPageContext } from "next";
import Head from "next/head";
import { Container } from "../components/Layout";
import { H1, Text } from "../components/Text";
import nc from "next-connect";
import { authMiddleware } from "../lib/auth/middleware";
import { loggingMiddleware } from "../lib/common/logger/middleware";
import { webErrorHandler } from "../lib/error/handler";

interface HomeProps {
  username: string;
}

export default function Home(props: HomeProps): JSX.Element {
  const { username } = props;
  return (
    <Container>
      <Head>
        <title>i like lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1>i-like-lists</H1>
      <Text>
        Welcome <Text bold>{username}</Text>
      </Text>
    </Container>
  );
}

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<HomeProps>> {
  const { req, res } = context;
  try {
    await nc().use(loggingMiddleware).use(authMiddleware).run(req, res);
    return {
      props: {
        username: req.user?.username,
      },
    };
  } catch (err) {
    return webErrorHandler(err, req, res);
  }
}
