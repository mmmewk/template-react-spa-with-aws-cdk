import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import { withCamelizeKeys } from "./api";

test("withCamelize should return a function that camelizes the response of an api call", async () => {
  const query: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  > = () => {
    return Promise.resolve({
      data: {
        snake_case: 1,
        parent_snake: {
          child_snake: 2,
        },
      },
    });
  };

  const camelizedQuery = withCamelizeKeys(query);
  const result = await camelizedQuery(
    "endpoint",
    {} as unknown as BaseQueryApi,
    {}
  );

  expect(result).toEqual({
    data: {
      snakeCase: 1,
      parentSnake: {
        childSnake: 2,
      },
    },
  });
});
