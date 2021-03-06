import fuzzysort from "fuzzysort";
import { Data } from "../data/database";

export async function fuzzySearch(
  searchInput: string,
  database: Data[],
  options?: { minScore?: number; maxResults?: number }
): Promise<Data[]> {
  const minScore = options?.minScore ?? -Infinity;
  const maxResults = options?.maxResults ?? 4;

  const flattenedDatabase = database.map((d, i) => ({
    id: i,
    ...d,
  }));

  const fuzzyOptions = {
    limit: 1,
    allowTypo: true,
  };

  const results = [];

  for (const d of flattenedDatabase) {
    const displayResult = fuzzysort.single(searchInput, d.displayLabel);
    const tagResults = await fuzzysort.goAsync(searchInput, d.tags, fuzzyOptions);

    const displayScore = displayResult ? displayResult.score * 0.5 : -Infinity;
    const tagScore = tagResults[0] ? tagResults[0].score * 0.8 : -Infinity;

    // console.log(`item=${d.displayLabel} display=${displayScore} tagScore=${tagScore}`);
    const highestScore = Math.max(displayScore, tagScore);

    if (highestScore > minScore) {
      results.push({
        id: d.id,
        score: Math.max(displayScore, tagScore),
      });
    }
  }

  results.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else if (a.score > b.score) {
      return -1;
    } else {
      return 0;
    }
  });

  const mappedData = results.map((result) => database[result.id]).slice(0, maxResults);
  return mappedData;
}
