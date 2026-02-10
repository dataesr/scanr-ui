import { Network, NetworkSearchArgs } from "../../types/network"
import configCreate from "./config/vosviewer"
import infoCreate from "./config/info"
import { networkSearch } from "./search"
import networkCreate from "./network/create"

export default async function getNetwork(args: NetworkSearchArgs): Promise<Network> {
  try {
    const aggregation = await networkSearch(args)
    const network = await networkCreate({ ...args, aggregation })
    const config = configCreate(args.source, args.model)
    const info = infoCreate(args.source, args.model, args.query)
    return {
      network: network,
      config: config,
      info: info,
      ...(args.parameters.sample && { count: aggregation.map((bucket) => bucket.doc_count).reduce((a, b) => a + b) }),
    }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export async function getStructureNetworkById(ids: any, source: string, model: string): Promise<Network> {
  const organizationFilter = { terms: { "affiliations.id.keyword": ids } }
  const data = getNetwork({
    source: source,
    model: model,
    filters: [organizationFilter],
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

export async function getAuthorsNetworkById(ids: string[], source: string, model: string): Promise<Network> {
  const authorsFilter = { terms: { "authors.person.keyword": ids } }
  const data = getNetwork({
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
