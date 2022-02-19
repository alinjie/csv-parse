const SEPARATOR_REGEX = /(?!\B"[^"]*)[	,;](?![^"]*"\B)/
const QUOTED_REGEX = /(?<!.)(\B")|"\B(?!.)/g

export function useCSV(csvString: string, hasHeaders = true) {
  // Regex matches characters "  ", "," or ";" unless they're enclosed by quotes
  const rawRows = csvString
    // Handles removal of last newline if there are any
    .replace(/\n$/, "")
    .split("\n")

  const rows = rawRows.reduce<string[][]>((acc, row) => {
    const data = row.split(SEPARATOR_REGEX)

    // Handles removal of quotes within strings
    // Example: '"The Gambia"' => "The Gambia"
    data.forEach((entry, index) => {
      if (entry.match(QUOTED_REGEX)) {
        data[index] = entry.replace(QUOTED_REGEX, "")
      }
    })

    acc.push(data)

    return acc
  }, [])

  const headers = hasHeaders
    ? rows[0]
    : Array(rows[0].length)
        .fill(null)
        .map((_, i) => `Column ${i + 1}`)

  return { rows: hasHeaders ? rows.splice(1) : rows, headers }
}
