const regex = /(?!\B"[^"]*)[	,;](?![^"]*"\B)/

export function useCSV(csvString: string, hasHeaders = true) {
  // Regex matches characters "  ", "," or ";" unless they're enclosed by quotes
  const rawRows = csvString
    // Handles removal of last newline if there are any
    .replace(/\n$/, "")
    .split("\n")

  const rows = rawRows.reduce<string[][]>((acc, row) => {
    const data = row.split(regex)

    // Handles removal of quotes within strings
    // Example: '"The Gambia"' => "The Gambia"
    data.forEach((entry, index) => {
      if (entry.match(/\"/g)) {
        data[index] = entry.replace(/\"/g, "")
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
