import Graph from "graphology-types"
import betweennessCentrality from "graphology-metrics/centrality/betweenness"
import { degreeCentrality } from "graphology-metrics/centrality/degree"
import closenessCentrality from "graphology-metrics/centrality/closeness"
import eigenvectorCentrality from "graphology-metrics/centrality/eigenvector"
import pagerank from "graphology-metrics/centrality/pagerank"
import { weightedUndirectedDegree } from "graphology-metrics/node/weighted-degree"
import { density } from "graphology-metrics/graph/density"
import subgraph from "graphology-operators/subgraph"

function computeLocalDensity(graph: Graph, node: string): number {
  const neighbors = graph.neighbors(node)
  if (neighbors.length < 2) return 0

  // Create ego graph (node + all neighbors)
  const egoNodes = [node, ...neighbors]
  const egoGraph = subgraph(graph, egoNodes)

  return density(egoGraph)
}

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

export default function graphAssignNodesMetrics(graph: Graph) {
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
