import Graph from "graphology"
import { NetworkCommunities } from "../../../types/network"
import { arrayGetMedian } from "../_utils/functions"

export default function clustersAssignMetrics(
  graph: Graph,
  clusters: NetworkCommunities,
  normalize: boolean = false,
  normalizeFromMedian: boolean = false,
) {
  clusters.forEach((cluster) => {
    const nodes = new Set(cluster.nodes.map(({ id }) => id))
    let density = 0
    let centrality = 0

    nodes.forEach((node) => {
      graph.forEachEdge(node, (_, attr, source, target) => {
        const weight = attr.weight || 1
        const isInternal = nodes.has(source) && nodes.has(target)

        if (isInternal) {
          // Internal edge: contributes to density (divide by 2 as we count each edge twice)
          density += weight / 2
        } else {
          // External edge: contributes to centrality
          centrality += weight
        }
      })
    })

    cluster.metrics = { density, centrality }
  })

  if (normalize) {
    const densities = clusters.map((c) => c.metrics.density)
    const centralities = clusters.map((c) => c.metrics.centrality)

    const minDensity = Math.min(...densities)
    const maxDensity = Math.max(...densities)
    const rangeDensity = maxDensity - minDensity || 1

    const minCentrality = Math.min(...centralities)
    const maxCentrality = Math.max(...centralities)
    const rangeCentrality = maxCentrality - minCentrality || 1

    // Normalize using min-max scaling
    clusters.forEach((cluster) => {
      cluster.metrics.density = (cluster.metrics.density - minDensity) / rangeDensity
      cluster.metrics.centrality = (cluster.metrics.centrality - minCentrality) / rangeCentrality
    })
  }

  if (normalizeFromMedian) {
    const densities = clusters.map((c) => c.metrics.density)
    const centralities = clusters.map((c) => c.metrics.centrality)

    const medianDensity = arrayGetMedian(densities)
    const medianCentrality = arrayGetMedian(centralities)

    // Normalize from medians
    clusters.forEach((cluster) => {
      cluster.metrics.density = cluster.metrics.density - medianDensity
      cluster.metrics.centrality = cluster.metrics.centrality - medianCentrality
    })
  }
}


