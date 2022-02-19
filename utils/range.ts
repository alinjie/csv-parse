export function range(to: number) {
  const result = [...Array(to).keys()]
  result.push(to)
  return result.slice(1)
}
