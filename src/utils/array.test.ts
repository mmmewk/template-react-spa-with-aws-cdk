import { notEmpty } from "./array";

test("array.filter(notEmpty) should return an array without null or undefined values", () => {
  expect([1, undefined, null, 2].filter(notEmpty)).toEqual([1, 2]);
});
