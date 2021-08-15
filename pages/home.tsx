import { GetServerSidePropsResult, NextPageContext } from "next";
import Head from "next/head";
import { FlexContainer } from "../components/Layout";
import { Heading, Text } from "../components/Text";
import UserModel from "../lib/models/user";
import { DataFetcher } from "../utils/page/DataFetcher";
import { Data, ServerSideProps, User } from "../utils/page/decorators";

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
  class HomeDataFetcher extends DataFetcher {
    @Data({ authRequired: true })
    getServerSideProps(@User user: UserModel): GetServerSidePropsResult<HomeProps> {
      return {
        props: {
          username: user.username,
        },
      };
    }
  }

  return ServerSideProps(HomeDataFetcher, context);
}
