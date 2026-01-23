import Graph from "graphology-types"
import betweennessCentrality from "graphology-metrics/centrality/betweenness"
import { degreeCentrality } from "graphology-metrics/centrality/degree"
import closenessCentrality from "graphology-metrics/centrality/closeness"
import eigenvectorCentrality from "graphology-metrics/centrality/eigenvector"
import pagerank from "graphology-metrics/centrality/pagerank"
import { weightedUndirectedDegree } from "graphology-metrics/node/weighted-degree"
import { density } from "graphology-metrics/graph/density"
import subgraph from "graphology-operators/subgraph"

/**
 * Compute local density (ego graph density) for a node
 * The ego graph is the subgraph containing the node and all its neighbors
 */
function computeLocalDensity(graph: Graph, node: string): number {
  const neighbors = graph.neighbors(node)
  if (neighbors.length < 2) return 0

  // Create ego graph (node + all neighbors)
  const egoNodes = [node, ...neighbors]
  const egoGraph = subgraph(graph, egoNodes)

  return density(egoGraph)
}

/**
 * Compute clustering coefficient for a node
 * The ratio of existing edges between neighbors to the maximum possible edges
 */
function computeClusteringCoefficient(graph: Graph, node: string): number {
  const neighbors = graph.neighbors(node)
  const k = neighbors.length

  if (k < 2) return 0

  // Count edges between neighbors
  let edgeCount = 0
  for (let i = 0; i < neighbors.length; i++) {
    for (let j = i + 1; j < neighbors.length; j++) {
      if (graph.hasEdge(neighbors[i], neighbors[j])) {
        edgeCount++
      }
    }
  }

  // Maximum possible edges between k neighbors
  const maxEdges = (k * (k - 1)) / 2

  return edgeCount / maxEdges
}

export function assignNodeMetrics(graph: Graph) {
  // Assign centrality metrics to nodes
  betweennessCentrality.assign(graph, {
    getEdgeWeight: null,
    normalized: true,
  })
  degreeCentrality.assign(graph)
  closenessCentrality.assign(graph)
  try {
    // Sometimes it doesnt convert
    eigenvectorCentrality.assign(graph)
  } catch (error) {
    console.error(error)
  }
  pagerank.assign(graph)

  // Compute and assign all metrics to nodes
  graph.updateEachNodeAttributes((node, attr) => {
    const degree = graph.degree(node)
    const weightedDegree = weightedUndirectedDegree(graph, node)
    const localDensity = computeLocalDensity(graph, node)
    const clusteringCoefficient = computeClusteringCoefficient(graph, node)

    return {
      ...attr,
      metrics: {
        // Degree metrics
        degree,
        weightedDegree,
        // Centrality metrics
        betweennessCentrality: attr.betweennessCentrality,
        degreeCentrality: attr.degreeCentrality,
        closenessCentrality: attr.closenessCentrality,
        eigenvectorCentrality: attr?.eigenvectorCentrality,
        pagerank: attr.pagerank,
        // Density metrics
        localDensity,
        clusteringCoefficient,
      },
    }
  })
}

export function assignClustersMetrics(graph: Graph, communities: Array<any>, normalize: boolean = false) {
  communities.forEach((community) => {
    const nodes = new Set(community.nodes.map(({ id }) => id))
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

    community.metrics = { density, centrality }
  })

  if (normalize) {
    // Collect all density and centrality values for min-max normalization
    const densities = communities.map((c) => c.metrics.density)
    const centralities = communities.map((c) => c.metrics.centrality)

    const minDensity = Math.min(...densities)
    const maxDensity = Math.max(...densities)
    const rangeDensity = maxDensity - minDensity || 1

    const minCentrality = Math.min(...centralities)
    const maxCentrality = Math.max(...centralities)
    const rangeCentrality = maxCentrality - minCentrality || 1

    // Normalize both metrics using min-max scaling
    communities.forEach((community) => {
      community.metrics.density = (community.metrics.density - minDensity) / rangeDensity
      community.metrics.centrality = (community.metrics.centrality - minCentrality) / rangeCentrality
    })
  }
}
