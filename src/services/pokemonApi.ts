// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pokemon } from "./pokemonTypes";
import queryString from "query-string";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    indexPokemon: builder.query<
      {
        count: number;
        next: string;
        prev: string;
        results: { name: string }[];
      },
      { limit?: number; offset?: number }
    >({
      query: (params) => `pokemon?${queryString.stringify(params)}`,
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});
