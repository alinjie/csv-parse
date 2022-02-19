import { renderHook } from "@testing-library/react-hooks"
import { useCSV } from "../use-csv"

describe("delimiter tests", () => {
  test("parses comma-separeted CSV data correctly", () => {
    const CSV = "name,age,born_year\nali,25,1997"

    const { result } = renderHook(() => useCSV(CSV, true))
    const { headers, rows } = result.current

    expect(headers).toEqual(["name", "age", "born_year"])
    expect(rows).toEqual([["ali", "25", "1997"]])
  })

  test("parses semi colon-separeted CSV data correctly", () => {
    const CSV = "name;age;born_year\nAli;25;1997"

    const { result } = renderHook(() => useCSV(CSV, true))
    const { headers, rows } = result.current

    expect(headers).toEqual(["name", "age", "born_year"])
    expect(rows).toEqual([["Ali", "25", "1997"]])
  })

  test("parses semi tab-separeted CSV data correctly", () => {
    const CSV = "name\tage\tborn_year\nAli\t25\t1997"

    const { result } = renderHook(() => useCSV(CSV, true))
    const { headers, rows } = result.current

    expect(headers).toEqual(["name", "age", "born_year"])
    expect(rows).toEqual([["Ali", "25", "1997"]])
  })
})

describe("spec", () => {
  test("does not include the last new-line as an empty row", () => {
    const CSV = "name\tage\tborn_year\nAli\t25\t1997\n"
    const { result } = renderHook(() => useCSV(CSV, true))
    const { rows } = result.current
    expect(rows.length).toEqual(1)
  })

  test("allows space separated row data", () => {
    const CSV = 'name\tage\tborn_year\n"Ali Kristoffer"\t25\t1997\n'
    const { result } = renderHook(() => useCSV(CSV, true))
    const { rows } = result.current
    expect(rows[0].length).toEqual(3)
  })

  test("allows comma within row data", () => {
    const CSV = 'name,lives\n"Ali Kristoffer Njie","Oslo, Norway"'
    const { result } = renderHook(() => useCSV(CSV, true))
    const { rows } = result.current

    expect(rows).toEqual([["Ali Kristoffer Njie", "Oslo, Norway"]])
  })
})
