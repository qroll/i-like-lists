import fuzzysort from "fuzzysort";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Match } from "../features/recycling/components/Match";
import { SearchBar } from "../features/recycling/components/SearchBar";
import { Data, database } from "../features/recycling/data/database";
import { randomPrompts } from "../features/recycling/data/prompts";
import { useDebouncedEffect } from "../utils/useDebounce";

const flattenedDatabase = database.map((d, i) => ({
  id: i,
  ...d,
  tags: d.tags.join(" "),
}));

enum LoadState {
  Initial,
  NotLoaded,
  Loading,
  Loaded,
  Error,
}

export default function Recycle(): JSX.Element {
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

      const results = await fuzzysort.goAsync(searchInput, flattenedDatabase, {
        limit: 4,
        allowTypo: true,
        keys: ["displayLabel", "tags"],
      });

      console.log(results);

      const mappedData = results.map((result) => database[result.obj.id]);
      setSearchResult(mappedData);
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
      <SearchBar searchInput={searchInput} searchPrompt={prompt} onChange={setSearchInput} />
      {searchState === LoadState.Loading && <div />}
      {searchState === LoadState.Loaded && <SearchResult results={searchResult} />}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 25vh 0.5em 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #efefef;
`;

interface SearchResultProps {
  results: Data[];
}

const SearchResult = ({ results }: SearchResultProps) => {
  if (results.length === 0) {
    return <div>No matches found</div>;
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
