import { NetworkInfo } from "../../../types/network"

export default function infoCreate(source: string, query: string, model: string): NetworkInfo {
  const title = `Co-${model} network `
  const description =
    query === "*" || !query
      ? `This is a visualization of a ${model} network from all ${source}.`
      : `This is a visualization of a ${model} network from ${source} related to « ${query} ».`

  return { title: title, description: description }
}
