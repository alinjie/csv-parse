import { renderHook } from "@testing-library/react-hooks"
import { act } from "react-dom/test-utils"
import { usePagination } from "../use-pagination"

const DATA = [1, 2, 3, 4, 5, 6, 7, 8]
test("calculates correct number of pages", () => {
  const { result } = renderHook(() => usePagination(DATA, 2))
  const { numberOfPages } = result.current
  expect(numberOfPages).toEqual(4)
})

test("renders correct data based on page", () => {
  const { result } = renderHook(() => usePagination(DATA, 2))

  expect(result.current.currentPage).toEqual(1)
  expect(result.current.data).toEqual([1, 2])

  act(() => {
    result.current.setPage(2)
  })

  expect(result.current.currentPage).toEqual(2)
  expect(result.current.data).toEqual([3, 4])
})
