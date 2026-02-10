import Graph from "graphology-types"
import { arrayPush, labelClean } from "../_utils/functions"
import { networkSearchHits, networkSearchAggs } from "../search"
import { ElasticHits, NetworkCommunities, NetworkFilters } from "../../../types/network"
import { CONFIG } from "../config/elastic"
import { ElasticAggregations } from "../../../types/commons"
import { nodeGetId } from "../graph/build"

const CURRENT_YEAR = new Date().getFullYear()
const RECENT_YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR]

const nodeGetCitationsCount = (citationsByYear: Record<string, number>): number =>
  citationsByYear ? Object.values(citationsByYear).reduce((acc: number, value: number) => acc + value, 0) : 0

const nodeGetCitationsRecent = (citationsByYear: Record<string, number>): number =>
  citationsByYear ? (citationsByYear?.[CURRENT_YEAR - 1] || 0) + (citationsByYear?.[CURRENT_YEAR] || 0) : 0

const clusterGetAttribute = (graph: Graph, cluster: number, name: string): Array<string> | Array<number> =>
  graph.reduceNodes(
    (acc, _, attr) => (attr.cluster === cluster && attr?.[name] ? (acc = arrayPush(acc, attr[name])) : acc),
    [],
  )

const clusterGetLinks = (graph: Graph, cluster: number): Array<string> => [
  ...new Set(clusterGetAttribute(graph, cluster, "links").flat(1).map(String)),
]

const clusterGetIds = (graph: Graph, cluster: number): Array<string> =>
  graph.filterNodes((_, attr) => attr?.cluster === cluster)

const clusterGetDocumentsCount = (aggs: ElasticAggregations): number => aggs?.documentsCount?.value || 0

const clusterGetDocumentsByYear = (aggs: ElasticAggregations): Record<string, number> =>
  aggs?.documentsByYear?.buckets.reduce((acc, bucket) => ({ ...acc, [bucket.key]: bucket.doc_count }), {})

const clusterGetDocumentsMaxYear = (aggs: ElasticAggregations): number => aggs?.documentsMaxYear?.value || 0

const clusterGetCitationsByYear = (aggs: ElasticAggregations): Record<string, number> =>
  Object.entries(aggs)
    .filter(([key]) => key.startsWith("citationsIn"))
    .reduce((acc, [key, value]) => ({ ...acc, [key.slice(-4)]: value?.value }), {})

const clusterGetCitationsCount = (aggs: ElasticAggregations): number =>
  Object.values(clusterGetCitationsByYear(aggs)).reduce((acc, value) => acc + value, 0)

const clusterGetCitationsRecent = (aggs: ElasticAggregations): number =>
  Object.entries(clusterGetCitationsByYear(aggs)).reduce(
    (acc, [key, value]) => (RECENT_YEARS.includes(Number(key)) ? acc + value : acc),
    0,
  )

const clusterGetCitationsScore = (aggs: ElasticAggregations): number =>
  clusterGetCitationsRecent(aggs) / clusterGetDocumentsCount(aggs)

const clusterGetDomains = (aggs: ElasticAggregations): Record<string, number> =>
  aggs?.domains?.buckets.reduce((acc, bucket) => ({ ...acc, [labelClean(String(bucket.key))]: bucket.doc_count }), {})

const clusterGetOaPercent = (aggs: ElasticAggregations): number => {
  const isOa = aggs?.isOa?.buckets.find((bucket) => bucket.key_as_string === "true")?.doc_count || 0
  const isNotOa = aggs?.isOa?.buckets.find((bucket) => bucket.key_as_string === "false")?.doc_count || 0
  return (isOa / (isOa + isNotOa || 1)) * 100
}

const clusterGetDocuments = (hits: ElasticHits): Array<Record<string, string | number>> =>
  hits.map((hit) => ({
    id: hit.id,
    title:
      hit?.title?.default || hit?.title?.fr || hit?.title?.en || hit?.label?.default || hit?.label?.fr || hit?.label?.en,
    citationsCount: nodeGetCitationsCount(hit?.cited_by_counts_by_year),
    citationsRecent: nodeGetCitationsRecent(hit?.cited_by_counts_by_year),
  }))

const clusterGetNodesInfos = (hits: ElasticHits, source: string, model: string): any =>
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
              {},
            )),
        },
      }
    })
    return acc
  }, {})

export default async function clustersAssignMetadatas(
  graph: Graph,
  clusters: NetworkCommunities,
  query: string,
  source: string,
  model: string,
  filters: NetworkFilters,
) {
  // Assign metadata to clusters and await all promises
  await Promise.all(
    clusters.map(async (cluster) => {
      const index = cluster.cluster - 1 // louvain assign 0-based index while vosviewer clusters are 1-based
      // Get elastic data
      const [hits, aggs] = await Promise.all([
        networkSearchHits({ source, model, query, filters, links: clusterGetLinks(graph, index) }),
        networkSearchAggs({ source, model, query, filters, links: clusterGetLinks(graph, index) }),
      ])

      // Add info to nodes
      if (hits) {
        const nodesInfos = clusterGetNodesInfos(hits, source, model)
        clusterGetIds(graph, index).forEach((key) => {
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

      cluster.metadata = {
        ...(aggs && {
          documentsCount: clusterGetDocumentsCount(aggs),
          documentsByYear: clusterGetDocumentsByYear(aggs),
          documentsMaxYear: clusterGetDocumentsMaxYear(aggs),
          citationsByYear: clusterGetCitationsByYear(aggs),
          citationsCount: clusterGetCitationsCount(aggs),
          citationsRecent: clusterGetCitationsRecent(aggs),
          citationsScore: clusterGetCitationsScore(aggs),
          domains: clusterGetDomains(aggs),
          oaPercent: clusterGetOaPercent(aggs),
        }),
        ...(hits && {
          documents: clusterGetDocuments(hits),
          documentsCount: hits.length,
        }),
      }
    }),
  )
}
