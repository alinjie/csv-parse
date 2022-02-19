export function useSortedData(
  headers: string[],
  data: string[][],
  sortBy: string | undefined,
  direction: "ASC" | "DESC" | undefined
) {
  const numberOfColumns = data[0].length
  let columnIndex = headers.findIndex((header) => header === sortBy)

  if (direction === undefined) return data

  return data.sort((a, b) => {
    let aSortValue: string | number = a[columnIndex]
    let bSortValue: string | number = b[columnIndex]

    const isSortable = aSortValue !== bSortValue
    const isLastColumn = columnIndex === numberOfColumns - 1

    // Find next sortable column if
    // the initial a and b values are equal
    if (!isSortable && !isLastColumn) {
      while (aSortValue === bSortValue) {
        if (columnIndex == numberOfColumns - 1) break

        columnIndex++
        aSortValue = a[columnIndex]
        bSortValue = b[columnIndex]
      }
    }

    // Convert values to numbers if we're dealing
    // with a numeric column
    const isIntColumn = !isNaN(parseInt(aSortValue))
    if (isIntColumn) {
      aSortValue = parseInt(aSortValue)
      bSortValue = parseInt(bSortValue)
    }

    if (direction === "ASC") {
      return aSortValue < bSortValue ? -1 : 1
    }

    return aSortValue < bSortValue ? 1 : -1
  })
}
