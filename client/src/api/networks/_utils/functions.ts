export const arrayPush = (arr: Array<any>, elem: any): Array<any> => {
  if (!elem) return arr
  if (typeof elem === "object")
    if (Array.isArray(elem)) {
      arr.push(...elem)
    } else {
      arr.push(...Object.keys(elem))
    }
  else {
    arr.push(elem)
  }
  return arr
}

export const labelClean = (label: string): string => {
  const clean = label
    // .split(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/)
    .split(" ")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ")

  return clean
}

export const arrayGetMedian = (arr: number[]) => {
  const sorted = [...arr].sort((a, b) => a - b)
  const length = sorted.length
  const middle = Math.floor(length / 2)

  if (length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  } else {
    return sorted[middle]
  }
}
