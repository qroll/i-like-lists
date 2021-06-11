import Head from "next/head";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Document } from "flexsearch";
import { useDebouncedEffect } from "../utils/useDebounce";
import fuzzball from "fuzzball";
import fuzzysort from "fuzzysort";

const randomPrompts = ["a plastic bag", "bubble wrap"];

interface Data {
  name: string;
  displayLabel: string;
  description: string;
  tags: string[];
  isRecyclable: "YES" | "NO" | "DEPENDS";
}

const database: Data[] = [
  {
    name: "plastic-recycling-symbol-1",
    displayLabel: "Plastic Recycling Symbol #1",
    tags: ["plastic", "PET", "PETE", "polyethylene terephthalate"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-2",
    displayLabel: "Plastic Recycling Symbol #2",
    tags: ["plastic", "HDPE", "PE-HD", "high-density polyethylene"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-3",
    displayLabel: "Plastic Recycling Symbol #3",
    tags: ["plastic", "PVC", "polyvinyl chloride"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-4",
    displayLabel: "Plastic Recycling Symbol #4",
    tags: ["plastic", "LDPE", "PE-LD", "low-density polyethylene"],
    isRecyclable: "NO",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-5",
    displayLabel: "Plastic Recycling Symbol #5",
    tags: ["plastic", "PP", "polypropylene"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-6",
    displayLabel: "Plastic Recycling Symbol #6",
    tags: ["plastic", "PS", "polystyrene"],
    isRecyclable: "NO",
    description: "",
  },
  {
    name: "styrofoam",
    displayLabel: "Styrofoam",
    tags: ["takeaway"],
    isRecyclable: "NO",
    description: "",
  },
  {
    name: "printed-paper",
    displayLabel: "Printed paper",
    tags: ["paper"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "tissue",
    displayLabel: "Tissue",
    tags: ["paper"],
    isRecyclable: "NO",
    description: "Really, please throw your used tissues in the bin",
  },
  {
    name: "rechargeable-battery",
    displayLabel: "Rechargable battery",
    tags: ["battery", "electronics"],
    isRecyclable: "DEPENDS",
    description: "",
  },
];

const flattenedDatabase = database.map((d, i) => ({
  id: i,
  ...d,
  tags: d.tags.join(" "),
}));

// function generateIndex() {
//   const index = new Document<Data>({
//     document: {
//       index: ["displayLabel", "tags"],
//     },
//     tokenize: "full",
//     encoder: "extra",
//   });

//   for (let i = 0; i < database.length; i++) {
//     index.add(i, database[i]);
//   }

//   return index;
// }

enum LoadState {
  Initial,
  NotLoaded,
  Loading,
  Loaded,
  Error,
}

export default function Recycle(): JSX.Element {
  const [searchInput, setSearchInput] = useState("");
  const [searchIndex, setSearchIndex] = useState<Document<Data> | null>(null);
  const [searchResult, setSearchResult] = useState<Data[]>([]);
  const [searchState, setSearchState] = useState<LoadState>(LoadState.Initial);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    // set up prompt
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    const text = randomPrompts[randomIndex];
    setPrompt(text + "?");

    // set up index
    // const index = generateIndex();
    // setSearchIndex(index);
    // setSearchState(LoadState.NotLoaded);
  }, []);

  const updateSearchInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
  }, []);

  useDebouncedEffect(
    async () => {
      if (searchInput.trim().length === 0) {
        return;
      }

      // if (searchIndex) {
      //   setSearchState(LoadState.Loading);

      //   const results = await searchIndex.search(searchInput, ["displayLabel", "tags"]);

      //   const uniqueIds = Array.from(
      //     results
      //       .filter((r) => !!r)
      //       .reduce((set, r) => {
      //         r.result.forEach((item) => set.add(item));
      //         return set;
      //       }, new Set<number>())
      //   );

      //   const mappedData = uniqueIds.map((id) => database[id]);
      //   setSearchResult(mappedData);

      //   setSearchState(LoadState.Loaded);
      // }

      // const getScore = (query: string, choice: string) => {
      //   const score = fuzzball.ratio(query, choice);
      //   return score < 50 ? 0 : score;
      // };

      // const results = await fuzzball.extractAsPromised(searchInput, database, {
      //   limit: 4,
      //   cutoff: 50,
      //   scorer: (query, choice, options) => {
      //     return (
      //       getScore(query, choice.displayLabel) +
      //       choice.tags.reduce((a, c) => a + getScore(query, c), 0)
      //     );
      //   },
      // });

      // console.log(results);

      // const mappedData = results.map((result) => result[0]);
      // setSearchResult(mappedData);
      // setSearchState(LoadState.Loaded);

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
    [searchIndex, searchInput],
    500
  );

  return (
    <Container>
      <Head>
        <title>can i recycle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Prompt>can i recycle...</Prompt>
      <SearchBar>
        <SearchIcon />
        <SearchInput
          type="text"
          value={searchInput}
          onChange={updateSearchInput}
          placeholder={prompt}
        />
      </SearchBar>
      {searchState === LoadState.Initial && <div>indexing files</div>}
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

interface MatchProps {
  matchedItem: Data;
}

const mapRecyclableToIcon = (status: Data["isRecyclable"]) => {
  switch (status) {
    case "YES":
      return <RecyclableLabel as={TickIcon} fill="#70AE6E" />;
    case "NO":
      return <RecyclableLabel as={CrossIcon} fill="#BD1E1E" />;
    case "DEPENDS":
      return <RecyclableLabel as={CrossIcon} fill="#483C46" />;
  }
};

const Match = ({ matchedItem }: MatchProps) => {
  const icon = mapRecyclableToIcon(matchedItem.isRecyclable);

  return (
    <MatchContainer>
      {icon}
      <div>
        <Name>{matchedItem.displayLabel}</Name>
        {matchedItem.description && <Description>{matchedItem.description}</Description>}
      </div>
    </MatchContainer>
  );
};

const MatchContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.3em;
  box-shadow: 0 0 3px #ccc;
  padding: 1rem;
  display: flex;
  width: 80%;
  margin: 1rem;
  align-items: flex-start;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

const Description = styled.div`
  margin-top: 1rem;
`;

const IconBase = styled.svg``;

const RecyclableLabel = styled(IconBase)`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
`;

interface IconProps {
  className?: string;
  fill?: string;
}

const SearchIcon = (props: IconProps) => {
  const { fill = "#000000", className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill={fill}
      className={className}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
};

const TickIcon = (props: IconProps) => {
  const { fill = "#000000", className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} className={className}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </svg>
  );
};

const CrossIcon = (props: IconProps) => {
  const { fill = "#000000", className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} className={className}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );
};

const Prompt = styled.h1`
  font-size: 2em;
`;

const SearchBar = styled.label`
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  color: #333;
  outline: none;
  box-shadow: none;
  margin-left: 1rem;
  font-size: 1.2rem;

  &::placeholder {
    color: #bbb;
  }
`;
