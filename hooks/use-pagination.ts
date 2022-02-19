import { useState } from "react"

export function usePagination<T = unknown>(
  data: T[],
  pageSize = 10,
  startPage = 1
) {
  const [currentPage, setCurrentPage] = useState(startPage)
  const numberOfPages = Math.ceil(data.length / pageSize)

  const paginated = data.slice(
    pageSize * (currentPage - 1),
    pageSize * currentPage
  )

  const setPage = (num: number) => setCurrentPage(num)

  return { numberOfPages, data: paginated, setPage, currentPage }
}
