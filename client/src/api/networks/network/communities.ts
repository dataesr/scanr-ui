import Graph from "graphology-types"
import louvain from "graphology-communities-louvain"
import seedrandom from "seedrandom"
import { arrayPush, labelClean } from "../_utils/functions"
import { networkSearchHits } from "../search/search"
import { ElasticHits, NetworkCommunities, NetworkFilters } from "../../../types/network"
import { aiLabeledClusters } from "./mistralai"
import { COLORS } from "../_utils/constants"
import { GetColorName } from "hex-color-to-color-name"

const communityGetAttribute = (graph: Graph, community: number, name: string): Array<string> | Array<number> =>
  graph.reduceNodes(
    (acc, _, attr) => (attr.community === community && attr?.[name] ? (acc = arrayPush(acc, attr[name])) : acc),
    []
  )

const communityGetLinks = (graph: Graph, community: number): Array<string> => [
  ...new Set(communityGetAttribute(graph, community, "links").flat(1).map(String)),
]

const communityGetIds = (graph: Graph, community: number): Array<string> =>
  graph.filterNodes((_, attr) => attr?.community === community)

const communityGetSize = (graph: Graph, community: number): number =>
  graph.filterNodes((_, attr) => attr?.community === community).length

const communityGetMaxYear = (graph: Graph, community: number): number =>
  Math.max(...communityGetAttribute(graph, community, "maxYear").map(Number))

const communityGetMaxWeightNodes = (graph: Graph, community: number): Array<string> => {
  const maxWeight = Math.max(...communityGetAttribute(graph, community, "weight").map(Number))
  const labels = graph.reduceNodes(
    (acc, _, attr) => (acc = attr?.community === community && attr?.weight === maxWeight ? [...acc, attr.label] : acc),
    []
  )
  return labels
}

const communityGetTopWeightNodes = (graph: Graph, community: number, top = 10): Array<string> => {
  const ids = communityGetIds(graph, community)
  const weights = ids.map((id) => ({
    id: id,
    weight: graph.getNodeAttribute(id, "weight"),
    label: graph.getNodeAttribute(id, "label"),
  }))
  const topWeights = weights
    .sort((a, b) => b.weight - a.weight)
    .map((item) => item.label)
    .slice(0, top)
  return topWeights
}

const communityGetYears = (hits: ElasticHits): Record<string, number> =>
  hits.reduce((acc, hit) => {
    const year = hit.year
    acc[year] = acc[year] ? acc[year] + 1 : 1
    return acc
  }, {})

// const communityGetPublications = (hits: ElasticHits): Array<string> => hits.map((hit) => hit.title.default)

const communityGetDomains = (hits: ElasticHits): Record<string, number> =>
  hits.reduce((acc, hit) => {
    if (hit?.domains) {
      hit.domains.forEach(({ label, count }) => {
        const clean = labelClean(label.default)
        acc[clean] = acc[clean] ? acc[clean] + count : count
      })
    }
    return acc
  }, {})

const communityGetOaPercent = (hits: ElasticHits): number =>
  (hits.map((hit) => hit.isOa).filter(Boolean).length / hits.length) * 100

export default async function communitiesCreate(graph: Graph, computeClusters: boolean): Promise<NetworkCommunities> {
  const query: string = graph.getAttribute("query")
  const model: string = graph.getAttribute("model")
  const filters: NetworkFilters = graph.getAttribute("filters")

  // Assign communities
  const randomSeed = query + model + JSON.stringify(filters)
  louvain.assign(graph, { rng: seedrandom(randomSeed) })

  if (!computeClusters) return []

  // Find number of communities
  const count = graph.reduceNodes((acc, _, attr) => Math.max(acc, attr.community), 0) + 1
  if (count < 1) return []

  // Create communities array
  const communities = Promise.all(
    Array.from({ length: count }, async (_, index) => {
      // Get elastic publications
      const hits = await networkSearchHits({ model, query, filters, links: communityGetLinks(graph, index) })

      const community = {
        cluster: index + 1,
        label: COLORS?.[index] ? GetColorName(COLORS[index]) : `Unnamed ${index + 1}`,
        color: COLORS?.[index] ?? "#e2e2e2",
        size: communityGetSize(graph, index),
        ids: communityGetIds(graph, index),
        maxYear: communityGetMaxYear(graph, index),
        maxWeightNodes: communityGetMaxWeightNodes(graph, index),
        topWeightNodes: communityGetTopWeightNodes(graph, index),
        ...(hits && {
          hits: hits.length,
          years: communityGetYears(hits),
          domains: communityGetDomains(hits),
          oaPercent: communityGetOaPercent(hits),
        }),
      }
      return community
    })
  ).then((c) => c.sort((a, b) => b.size - a.size))

  // Add labels with IA
  const labeledCommunities = await aiLabeledClusters(await communities)

  if (labeledCommunities) return labeledCommunities

  return communities
}
