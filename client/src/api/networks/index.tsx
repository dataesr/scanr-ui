import { Network, NetworkSearchArgs } from "../../types/network";
import { configCreate } from "./config/vosviewer"
import { infoCreate } from "./config/vosviewer"
import networkCreate from "./network/create";
import { networkSearch } from "./search"
import clustersAssignSimilarity from "./clusters/similarity";
import { isInProduction } from "../../utils/helpers";

export default async function getNetwork(
  args: NetworkSearchArgs,
): Promise<Network> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nfilters, ...searchArgs } = args
    const aggregation = await networkSearch(searchArgs)
    const [network, meta] = await networkCreate({ ...args, aggregation })
    const config = configCreate(args.source, args.model)
    const info = infoCreate(args.source, args.model, args.query)
    return {
      network: network,
      config: config,
      info: info,
      meta: {
        all_nodes: meta.all_nodes,
        ...(args.parameters.sample && {
          count: aggregation.map((bucket) => bucket.doc_count).reduce((a, b) => a + b),
        }),
      },
    }
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getMultipleNetworks(
  args: NetworkSearchArgs,
): Promise<Network[]> {
  // TODO: only to test vector quadrants in staging
  if (isInProduction()) {
    return [await getNetwork(args)];
  }

  const currentYear = new Date().getFullYear();

  const networksPromises = [
    getNetwork(args),
    getNetwork({
      ...args,
      filters: args.filters.concat({
        range: { year: { gte: currentYear - 9, lte: currentYear - 3 } },
      }),
    }),
    getNetwork({
      ...args,
      filters: args.filters.concat({
        range: { year: { gte: currentYear - 6, lte: currentYear } },
      }),
    }),
  ];
  const networks = await Promise.all(networksPromises).then((data) => data)

  const clustersGroups = networks.map((network) => network.network.clusters)
  clustersAssignSimilarity(clustersGroups);
  networks.forEach((network, index) => {
    network.network.clusters = clustersGroups[index]
  })
  return networks;
}

export async function getStructureNetworkById(
  ids: any,
  source: string,
  model: string,
): Promise<Network> {
  const organizationFilter = { terms: { "affiliations.id.keyword": ids } };
  const data = getNetwork({
    source: source,
    model: model,
    filters: [organizationFilter],
    lang: "fr",
    parameters: {
      maxNodes: 300,
      maxComponents: 5,
      clusters: false,
      filterNodes: [],
      filterNeighbors: true,
      sample: true,
    },
  })
    .then((data) => data)
    .catch(() => undefined)

  return data;
}

export async function getAuthorsNetworkById(
  ids: string[],
  source: string,
  model: string,
): Promise<Network> {
  const authorsFilter = { terms: { "authors.person.keyword": ids } };
  const data = getNetwork({
    source: source,
    model: model,
    filters: [authorsFilter],
    lang: "fr",
    parameters: {
      maxNodes: 300,
      maxComponents: 5,
      clusters: false,
      filterNodes: [],
      filterNeighbors: true,
      sample: true,
    },
  })
    .then((data) => data)
    .catch(() => undefined)

  return data;
}
