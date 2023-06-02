import { useWindowWidth } from "@react-hook/window-size/throttled";
import { useCallback, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const;

export const useMediaBreakpoints = (
  size: "sm" | "md" | "lg",
  direction: "up" | "down"
) => {
  const width = useWindowWidth();
  if (direction === "up") {
    return width >= BREAKPOINTS[size];
  } else {
    return width < BREAKPOINTS[size];
  }
};

type useQueryParamsOptions<P> = {
  parseNumbers?: boolean;
  parseBooleans?: boolean;
  defaultValue: P;
  arrayFormat?: queryString.ParseOptions["arrayFormat"];
};

const defaultQueryParamsOptions = {
  parseNumbers: false,
  parseBooleans: false,
  arrayFormat: "comma" as queryString.ParseOptions["arrayFormat"],
};

type QueryParamType = string | number | boolean;

export const useQueryParam = <P extends QueryParamType | QueryParamType[]>(
  key: string,
  customOptions: useQueryParamsOptions<P>
) => {
  const options = useMemo(
    () => ({ ...defaultQueryParamsOptions, ...customOptions }),
    [customOptions]
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<Record<string, any>>({});

  useEffect(() => {
    setParams(queryString.parse(searchParams.toString(), options));
  }, [searchParams, options]);

  const setParam = useCallback(
    (value: P | null) => {
      if (!searchParams) return;

      setSearchParams(
        queryString.stringify(
          {
            ...params,
            [key]: value,
          },
          { ...options, skipNull: true, skipEmptyString: true }
        )
      );
    },
    [key, searchParams, setSearchParams, params, options]
  );

  let value = params[key];
  if (Array.isArray(options.defaultValue) && !Array.isArray(value))
    value = [value];
  if (typeof value !== typeof options.defaultValue)
    value = options.defaultValue;

  return [value, setParam] as const;
};
