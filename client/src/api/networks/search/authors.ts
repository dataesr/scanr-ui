import { Network } from "../../../types/network"
import { networkSearch } from "./search"

export async function getAuthorsNetworkById(ids: string[], source: string, model: string): Promise<Network> {
  const authorsFilter = { terms: { "authors.person.keyword": ids } }
  const data = networkSearch({
    source: source,
    model: model,
    filters: [authorsFilter],
    lang: "fr",
    parameters: {
      maxNodes: 300,
      maxComponents: 5,
      clusters: false,
      filterNode: "",
      sample: true,
      filterFocus: true,
    },
  })
    .then((data) => data)
    .catch(() => undefined)

  return data
}
