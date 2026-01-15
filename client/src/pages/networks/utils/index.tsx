export const getBooleanParam = (param: string, defaultValue = true) =>
  param ? (param.toLowerCase() === "true" ? true : false) : defaultValue

export const getMedian = (arr: number[]) => {
  const sorted = [...arr].sort((a, b) => a - b)
  const length = sorted.length
  const middle = Math.floor(length / 2)

  if (length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  } else {
    return sorted[middle]
  }
}