import axios from "axios";
import Papa from "papaparse";
import { Data } from "../data/database";

export async function fetchData(): Promise<Data[]> {
  const request = await axios.get(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSt9lLhkKjxTmoG8t_pB4B5qdG-O80ef4juKso7xdoeSIGH_uBHF-yGIVwFcrpHpoZCUm2BtFFVJUMX/pub?output=csv"
  );

  const rawCsv = request.data;

  const result = await Papa.parse<Data>(rawCsv, {
    header: true,
    transformHeader: (header) => {
      const tokens = header.split("_");
      // capitalise the starting word
      const capitalisedTokens = tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1));
      // return in camelCase
      return [tokens[0], ...capitalisedTokens.slice(1)].join("");
    },
    transform: (value, field) => {
      return field === "tags" ? value.split(",") : value;
    },
  });

  return result.data;
}
