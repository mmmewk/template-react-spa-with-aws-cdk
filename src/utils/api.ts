import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import humps from "humps";

export const withCamelizeKeys = (
  query: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >
) => {
  return async (...params: Parameters<typeof query>) => {
    const response = await query(...params);

    if (response.data) response.data = humps.camelizeKeys(response.data);

    return response;
  };
};
