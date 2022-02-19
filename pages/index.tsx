import { InferGetStaticPropsType } from "next"
import { useCSV } from "../hooks/use-csv"
import { usePagination } from "../hooks/use-pagination"
import { range } from "../utils/range"
import cx from "classnames"
import { useState } from "react"
import { useSortedData } from "../hooks/use-sorted-data"

type Sorting = {
  column: string
  direction: "DESC" | "ASC" | undefined
}

export default function Home({
  csv,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sorting, setSorting] = useState<Sorting>()
  const { rows, headers } = useCSV(csv, true)
  const sortedData = useSortedData(
    headers,
    rows,
    sorting?.column,
    sorting?.direction
  )

  const { data, numberOfPages, setPage, currentPage } =
    usePagination(sortedData)

  return (
    <div className="grid h-screen w-screen place-content-center">
      <table className="block max-w-6xl  overflow-auto rounded border  text-left text-xs">
        <thead>
          <tr className="bg-indigo-500 text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                data-testid={`column-${index}`}
                className="cursor-pointer whitespace-nowrap  p-4"
                onClick={() =>
                  setSorting({
                    column: header,
                    direction: sorting?.direction === "DESC" ? "ASC" : "DESC",
                  })
                }
              >
                <div className="flex items-center ">
                  {header.replace(/_/g, " ")}
                  {sorting?.column === header && (
                    <span className="ml-1 block">
                      {sorting?.direction === "DESC" ? (
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          data-testid="icon-descending"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          data-testid="icon-ascending"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                          ></path>
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={cx(index % 2 === 1 ? "bg-indigo-50" : "bg-white")}
              data-testid={`row-${index + 1}`}
            >
              {row.map((entry, index) => (
                <td key={index} className="whitespace-nowrap border-b p-4">
                  {entry}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mx-auto mt-4 flex space-x-2">
        {range(numberOfPages).map((page) => (
          <button
            className={cx(
              "h-7 w-7 rounded-full text-sm ",
              currentPage === page
                ? "bg-indigo-500 text-white"
                : "text-indigo-500"
            )}
            key={page}
            onClick={() => setPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    "https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_csv/data/630580e802a621887384f99527b68f59/population-figures-by-country-csv_csv.csv"
  )

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const csv = await response.text()

  return {
    props: { csv },
  }
}
