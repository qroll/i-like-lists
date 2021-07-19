import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TriangleIcon } from "../components/icons";
import { Match } from "../features/recycling/components/Match";
import { SearchBar } from "../features/recycling/components/SearchBar";
import { Data } from "../features/recycling/data/database";
import { randomPrompts } from "../features/recycling/data/prompts";
import { fetchData } from "../features/recycling/utils/fetchData";
import { fuzzySearch } from "../features/recycling/utils/fuzzySearch";
import { useDebouncedEffect } from "../utils/useDebounce";

enum LoadState {
  Initial,
  NotLoaded,
  Loading,
  Loaded,
  Error,
}

interface RecycleProps {
  database: Data[];
}

export default function Recycle(props: RecycleProps): JSX.Element {
  const { database } = props;
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<Data[]>([]);
  const [searchState, setSearchState] = useState<LoadState>(LoadState.Initial);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    // set up prompt
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    const text = randomPrompts[randomIndex];
    setPrompt(text + "?");
  }, []);

  useDebouncedEffect(
    async () => {
      if (searchInput.trim().length === 0) {
        return;
      }

      setSearchState(LoadState.Loading);

      const [results] = await Promise.all([
        fuzzySearch(searchInput, database),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      setSearchResult(results);
      setSearchState(LoadState.Loaded);
    },
    [searchInput],
    500
  );

  return (
    <Container>
      <Head>
        <title>can i recycle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Prompt>can i recycle...</Prompt>
      <SearchBar
        searchInput={searchInput}
        searchPrompt={prompt}
        onChange={setSearchInput}
        containerStyle={{ margin: "$xl" }}
      />
      {searchState === LoadState.Loading && <Loading />}
      {searchState === LoadState.Loaded && <SearchResult results={searchResult} />}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 25vh 0.5em 25vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #efefef;
`;

const Loading = () => {
  return <Svg as={TriangleIcon} fill="#333" />;
};

const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.5);
  }
  70% {
    transform: scale(1);
  }
  90% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

const Svg = styled.svg`
  height: 2rem;
  animation: ${bounce} 1s infinite ease-in-out;
  margin: 1rem;
`;

interface SearchResultProps {
  results: Data[];
}

const SearchResult = ({ results }: SearchResultProps) => {
  if (results.length === 0) {
    return <NotFoundMessage>no matches found :(</NotFoundMessage>;
  }

  const firstMatch = results[0];
  const hasOtherMatches = results.length > 1;

  return (
    <>
      <Prompt>the answer is...</Prompt>
      <Match matchedItem={firstMatch} />
      {hasOtherMatches && (
        <>
          <Prompt>here's other matches</Prompt>
          {results.map((match, i) => {
            if (i === 0) {
              // can't be bothered to slice, let's just do this
              return null;
            }

            return <Match key={match.name} matchedItem={match} />;
          })}
        </>
      )}
    </>
  );
};

const Prompt = styled.h1`
  font-size: 2em;
`;

const NotFoundMessage = styled.h1`
  font-size: 1.5em;
  color: #333;
`;

export const getStaticProps: GetStaticProps<RecycleProps> = async (context) => {
  const database = await fetchData();
  return {
    props: { database },
    revalidate: 60 * 30, // 30 minutes
  };
};
