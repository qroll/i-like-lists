import { GetServerSidePropsResult, GetStaticPropsResult, NextPageContext } from "next";

export class DataFetcher {
  context: NextPageContext;

  constructor(context: NextPageContext) {
    this.context = context;
  }

  getServerSideProps(...args: any[]): GetServerSidePropsResult<any>;
  getServerSideProps(context: NextPageContext): GetServerSidePropsResult<any> {
    return {
      redirect: {
        destination: `/error`,
        permanent: false,
      },
    };
  }

  getStaticProps(context: NextPageContext): GetStaticPropsResult<any> {
    return {
      redirect: {
        destination: `/error`,
        permanent: false,
      },
    };
  }
}
