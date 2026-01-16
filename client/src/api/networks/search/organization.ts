import { Network } from "../../../types/network"
import { networkSearch } from "./search"

export async function getStructureNetworkById(ids: any , source: string, model: string): Promise<Network> {
  const organizationFilter = { terms: { "affiliations.id.keyword": ids } }
  const data = networkSearch({
    source: source,
    model: model,
    filters: [organizationFilter],
    lang: "fr",
    parameters: { maxNodes: 300, maxComponents: 5, clusters: false, filterNode: "", sample: true },
  })
    .then((data) => data)
    .catch(() => undefined)

  return data
}
