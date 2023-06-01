// Used to properly filter an array with empty values
// `const a = [1, undefined, 2].filter((val) => value !== null)` is of type (number | null)[]
// `const b = [1, undefined, null, 3].filter(notEmpty) is of type number[]
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
