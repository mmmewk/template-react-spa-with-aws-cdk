// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item } from "./types";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    index: builder.query<{ message: string }, {}>({
      query: () => "/",
    }),
    getItems: builder.query<{ items: Item[] }, {}>({
      query: () => "items",
    }),
  }),
});
