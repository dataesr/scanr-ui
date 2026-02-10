import Graph from "graphology"
import { NetworkCommunities, NetworkFilters } from "../../../types/network"
import louvain from "graphology-communities-louvain"
import seedrandom from "seedrandom"
import { COLORS } from "../_utils/constants"
import { clusterGetNodes, clusterGetSize } from "./cluster"
import clustersAssignMetrics from "./metrics"
import clustersAssignAILabels from "./labels"
import clustersAssignMetadatas from "./metadata"

export default async function clustersCreate(
  graph: Graph,
  query: string,
  source: string,
  model: string,
  filters: NetworkFilters,
  computeClusters: boolean,
): Promise<NetworkCommunities> {
  // Assign clusters
  const randomSeed = (query || "*") + model + JSON.stringify(filters)
  louvain.assign(graph, { rng: seedrandom(randomSeed), nodeCommunityAttribute: "cluster" })

  // Find number of clusters
  const count = graph.reduceNodes((acc, _, attr) => Math.max(acc, attr.cluster), 0) + 1

  if (count < 1) return []

  // Create clusters array
  const clusters = Array.from({ length: count }, (_, index) => {
    const clusterNodes = clusterGetNodes(graph, index, source, model)
    const cluster = {
      cluster: index + 1,
      label: `${clusterNodes[0].label}${clusterNodes.length > 1 ? ` (+${clusterNodes.length - 1})` : ""}`,
      color: COLORS?.[index] ?? "#e2e2e2",
      size: clusterGetSize(graph, index),
      nodes: clusterNodes,
    }
    return cluster
  })
  clusters.sort((a, b) => b.size - a.size)

  // Assign metrics
  clustersAssignMetrics(graph, clusters, true)

  if (computeClusters) {
    // Assign metadata
    await clustersAssignMetadatas(graph, clusters, query, source, model, filters)

    // Assign IA labels
    await clustersAssignAILabels(clusters)
  }

  return clusters
}
