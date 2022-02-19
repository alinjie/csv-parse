import { range } from "../range"

test("outputs correct ranges", () => {
  expect(range(1)).toEqual([1])
  expect(range(10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
