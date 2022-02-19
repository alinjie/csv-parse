import { cleanup, fireEvent, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from ".."

const CSV = `Country_Name,Country_Code,Population
Norway,NO,1000
"The Gambia",GMB,100`

test("CSV data is rendered", () => {
  const { getByText, container } = render(<Home csv={CSV} />)
  const rows = container.querySelectorAll("tbody > tr")

  const cells = ["The Gambia", "Norway", "NO"]
  cells.forEach((cell) => expect(getByText(cell)).toBeInTheDocument())
  expect(rows.length).toEqual(2)
})

test("CSV data is sorted", () => {
  const { getByTestId } = render(<Home csv={CSV} />)
  let row = getByTestId("row-1")
  const column = getByTestId("column-1")

  fireEvent.click(column)
  row = getByTestId("row-1")
  expect(row.innerHTML.match(/Norway/g)).toBeTruthy()

  fireEvent.click(column)
  row = getByTestId("row-1")
  expect(row.innerHTML.match(/The Gambia/g)).toBeTruthy()
})

test("CSV data is sorted by next column if members are equal", () => {
  const CSV = "name,age\nali,24\nali,25"
  const { getByTestId } = render(<Home csv={CSV} />)
  let row = getByTestId("row-1")
  const column = getByTestId("column-1")

  fireEvent.click(column)
  row = getByTestId("row-1")
  expect(row.innerHTML.match(/25/g)).toBeTruthy()

  fireEvent.click(column)
  row = getByTestId("row-1")
  expect(row.innerHTML.match(/24/g)).toBeTruthy()
})
