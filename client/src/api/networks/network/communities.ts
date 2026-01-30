import Graph from "graphology-types"
import louvain from "graphology-communities-louvain"
import seedrandom from "seedrandom"
import { arrayPush, labelClean } from "../_utils/functions"
import { networkSearchHits, networkSearchAggs } from "../search/search"
import { ElasticHits, NetworkCommunities, NetworkFilters } from "../../../types/network"
import { mistralAssignClustersLabels } from "./mistralai"
import { COLORS } from "../_utils/constants"
// import { GetColorName } from "hex-color-to-color-name"
import { configGetItemPage } from "./config"
import { CONFIG } from "./config"
import { nodeGetId } from "./network"
import { ElasticAggregations } from "../../../types/commons"
import { assignClustersMetrics } from "./metrics"

const CURRENT_YEAR = new Date().getFullYear()
const RECENT_YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR]

const nodeGetCitationsCount = (citationsByYear: Record<string, number>): number =>
  citationsByYear ? Object.values(citationsByYear).reduce((acc: number, value: number) => acc + value, 0) : 0

const nodeGetCitationsRecent = (citationsByYear: Record<string, number>): number =>
  citationsByYear ? (citationsByYear?.[CURRENT_YEAR - 1] || 0) + (citationsByYear?.[CURRENT_YEAR] || 0) : 0

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

const communityGetNodes = (graph: Graph, community: number): Array<{ id: string; weight: number; label: string }> => {
  const ids = communityGetIds(graph, community)
  const nodes = ids.map((id) => ({
    id: id,
    weight: graph.getNodeAttribute(id, "weight"),
    label: graph.getNodeAttribute(id, "label"),
    page: configGetItemPage(graph.getAttribute("source"), graph.getAttribute("model"), id),
  }))
  return nodes.sort((a, b) => b.weight - a.weight)
}

const communityGetDocumentsCount = (aggs: ElasticAggregations): number => aggs?.documentsCount?.value || 0

const communityGetDocumentsByYear = (aggs: ElasticAggregations): Record<string, number> =>
  aggs?.documentsByYear?.buckets.reduce((acc, bucket) => ({ ...acc, [bucket.key]: bucket.doc_count }), {})

const communityGetDocumentsMaxYear = (aggs: ElasticAggregations): number => aggs?.documentsMaxYear?.value || 0

const communityGetCitationsByYear = (aggs: ElasticAggregations): Record<string, number> =>
  Object.entries(aggs)
    .filter(([key]) => key.startsWith("citationsIn"))
    .reduce((acc, [key, value]) => ({ ...acc, [key.slice(-4)]: value?.value }), {})

const communityGetCitationsCount = (aggs: ElasticAggregations): number =>
  Object.values(communityGetCitationsByYear(aggs)).reduce((acc, value) => acc + value, 0)

const communityGetCitationsRecent = (aggs: ElasticAggregations): number =>
  Object.entries(communityGetCitationsByYear(aggs)).reduce(
    (acc, [key, value]) => (RECENT_YEARS.includes(Number(key)) ? acc + value : acc),
    0
  )

const communityGetCitationsScore = (aggs: ElasticAggregations): number =>
  communityGetCitationsRecent(aggs) / communityGetDocumentsCount(aggs)

const communityGetDomains = (aggs: ElasticAggregations): Record<string, number> =>
  aggs?.domains?.buckets.reduce((acc, bucket) => ({ ...acc, [labelClean(String(bucket.key))]: bucket.doc_count }), {})

const communityGetOaPercent = (aggs: ElasticAggregations): number => {
  const isOa = aggs?.isOa?.buckets.find((bucket) => bucket.key_as_string === "true")?.doc_count || 0
  const isNotOa = aggs?.isOa?.buckets.find((bucket) => bucket.key_as_string === "false")?.doc_count || 0
  return (isOa / (isOa + isNotOa || 1)) * 100
}

const communityGetDocuments = (hits: ElasticHits): Array<Record<string, string | number>> =>
  hits.map((hit) => ({
    id: hit.id,
    title:
      hit?.title?.default || hit?.title?.fr || hit?.title?.en || hit?.label?.default || hit?.label?.fr || hit?.label?.en,
    citationsCount: nodeGetCitationsCount(hit?.cited_by_counts_by_year),
    citationsRecent: nodeGetCitationsRecent(hit?.cited_by_counts_by_year),
  }))

const communityGetNodesInfos = (hits: ElasticHits, source: string, model: string): any =>
  hits.reduce((acc, hit) => {
    const field = CONFIG[source][model].field.split(".").slice(0, -1).join(".")
    const citationsByYear = hit?.cited_by_counts_by_year
    hit?.[field]?.forEach((node) => {
      const key = node[CONFIG[source][model].field.split(".").at(-1)]
      if (!key) return
      const id = nodeGetId(key)
      acc[id] = {
        ...acc?.[id],
        documentsCount: acc?.[id]?.documentsCount ? acc[id].documentsCount + 1 : 1,
        documentsMaxYear: acc?.[id]?.documentsMaxYear ? Math.max(acc[id].documentsMaxYear, hit.year) : hit.year,
        citationsByYear: {
          ...citationsByYear,
          ...(acc?.[id]?.citationsByYear &&
            Object.entries(acc[id].citationsByYear).reduce(
              (obj, [key, value]: [string, number]) => ({ ...obj, [key]: value + (citationsByYear?.[key] || 0) }),
              {}
            )),
        },
      }
    })
    return acc
  }, {})

async function communitiesAssignMetadata(graph: Graph, communities: NetworkCommunities) {
  const query: string = graph.getAttribute("query")
  const source: string = graph.getAttribute("source")
  const model: string = graph.getAttribute("model")
  const filters: NetworkFilters = graph.getAttribute("filters")

  // Assign metadata to communities and await all promises
  await Promise.all(
    communities.map(async (community) => {
      const index = community.cluster - 1 // louvain assign 0-based index while vosviewer communities are 1-based
      // Get elastic data
      const [hits, aggs] = await Promise.all([
        networkSearchHits({ source, model, query, filters, links: communityGetLinks(graph, index) }),
        networkSearchAggs({ source, model, query, filters, links: communityGetLinks(graph, index) }),
      ])

      // Add info to nodes
      if (hits) {
        const nodesInfos = communityGetNodesInfos(hits, source, model)
        communityGetIds(graph, index).forEach((key) => {
          if (!Object.keys(nodesInfos).includes(key)) return
          const nodeInfos = nodesInfos[key]
          const nodeDocumentsCount = nodeInfos.documentsCount
          const nodeDocumentsMaxYear = nodeInfos.documentsMaxYear
          const nodeCitationsByYear = nodeInfos?.citationsByYear
          const nodeCitationsCount = nodeGetCitationsCount(nodeCitationsByYear)
          const nodeCitationsRecent = nodeGetCitationsRecent(nodeCitationsByYear)
          const nodeCitationsScore = nodeCitationsRecent / (nodeDocumentsCount || 1) || 0
          graph.setNodeAttribute(key, "documentsCount", nodeDocumentsCount)
          graph.setNodeAttribute(key, "documentsMaxYear", nodeDocumentsMaxYear)
          graph.setNodeAttribute(key, "citationsCount", nodeCitationsCount)
          graph.setNodeAttribute(key, "citationsRecent", nodeCitationsRecent)
          graph.setNodeAttribute(key, "citationsScore", nodeCitationsScore)
        })
      }

      community.metadata = {
        ...(aggs && {
          documentsCount: communityGetDocumentsCount(aggs),
          documentsByYear: communityGetDocumentsByYear(aggs),
          documentsMaxYear: communityGetDocumentsMaxYear(aggs),
          citationsByYear: communityGetCitationsByYear(aggs),
          citationsCount: communityGetCitationsCount(aggs),
          citationsRecent: communityGetCitationsRecent(aggs),
          citationsScore: communityGetCitationsScore(aggs),
          domains: communityGetDomains(aggs),
          oaPercent: communityGetOaPercent(aggs),
        }),
        ...(hits && {
          documents: communityGetDocuments(hits),
          documentsCount: hits.length,
        }),
      }
    })
  )
}

export default async function communitiesCreate(graph: Graph, computeClusters: boolean): Promise<NetworkCommunities> {
  const query: string = graph.getAttribute("query")
  const model: string = graph.getAttribute("model")
  const filters: NetworkFilters = graph.getAttribute("filters")

  // Assign communities
  const randomSeed = (query || "*") + model + JSON.stringify(filters)
  louvain.assign(graph, { rng: seedrandom(randomSeed) })

  // Find number of communities
  const count = graph.reduceNodes((acc, _, attr) => Math.max(acc, attr.community), 0) + 1

  if (count < 1) return []

  // Create communities array
  const communities = Array.from({ length: count }, (_, index) => {
    const communityNodes = communityGetNodes(graph, index)
    const community = {
      cluster: index + 1,
      // label: COLORS?.[index] ? GetColorName(COLORS[index]) : `Unnamed ${index + 1}`,
      label: `${communityNodes[0].label} (+${communityNodes.length - 1})`,
      color: COLORS?.[index] ?? "#e2e2e2",
      size: communityGetSize(graph, index),
      nodes: communityNodes,
    }
    return community
  })
  communities.sort((a, b) => b.size - a.size)

  // Assign metrics
  assignClustersMetrics(graph, communities, true)

  if (computeClusters) {
    // Assign metadata
    await communitiesAssignMetadata(graph, communities)
    // Assign IA labels
    await mistralAssignClustersLabels(communities)
  }

  return communities
}
