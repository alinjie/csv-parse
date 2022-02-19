import { renderHook } from "@testing-library/react-hooks"
import { useSortedData } from "../use-sorted-data"

const HEADERS = ["Name", "Age"]
const ROWS = [
  ["Ali", "25"],
  ["Morgan", "84"],
]

test("leaves data in original order when no direction is supplied", () => {
  const { result } = renderHook(() =>
    useSortedData(HEADERS, ROWS, "Name", undefined)
  )

  expect(result.current).toEqual([
    ["Ali", "25"],
    ["Morgan", "84"],
  ])
})

test("leaves data in original order when no direction is supplied", () => {
  const { result } = renderHook(() =>
    useSortedData(HEADERS, ROWS, "Name", "ASC")
  )

  expect(result.current).toEqual([
    ["Ali", "25"],
    ["Morgan", "84"],
  ])
})

test("leaves data in original order when no direction is supplied", () => {
  const { result } = renderHook(() =>
    useSortedData(HEADERS, ROWS, "Name", "DESC")
  )

  expect(result.current).toEqual([
    ["Morgan", "84"],
    ["Ali", "25"],
  ])
})

test("sorts on next available column when members are equal", () => {
  const DATA = [
    ["Ali", "24"],
    ["Ali", "25"],
  ]
  const { result } = renderHook(() =>
    useSortedData(HEADERS, DATA, "Name", "DESC")
  )

  expect(result.current).toEqual([
    ["Ali", "25"],
    ["Ali", "24"],
  ])
})
