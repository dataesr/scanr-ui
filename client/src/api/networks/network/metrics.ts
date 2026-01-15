import { UndirectedGraph } from "graphology";
import betweennessCentrality from "graphology-metrics/centrality/betweenness";
import { degreeCentrality } from "graphology-metrics/centrality/degree";
import closenessCentrality from "graphology-metrics/centrality/closeness";
import eigenvectorCentrality from "graphology-metrics/centrality/eigenvector";
import pagerank from "graphology-metrics/centrality/pagerank";
import { weightedUndirectedDegree } from "graphology-metrics/node/weighted-degree";
import { undirectedDensity } from "graphology-metrics/graph/density";
import subgraph from "graphology-operators/subgraph";

/**
 * Compute median of an array of numbers
 */
function getMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Compute local density (ego graph density) for a node
 * The ego graph is the subgraph containing the node and all its neighbors
 */
function computeLocalDensity(graph: UndirectedGraph, node: string): number {
  const neighbors = graph.neighbors(node);
  if (neighbors.length < 2) return 0;

  // Create ego graph (node + all neighbors)
  const egoNodes = [node, ...neighbors];
  const egoGraph = subgraph(graph, egoNodes);

  return undirectedDensity(egoGraph);
}

/**
 * Compute clustering coefficient for a node
 * The ratio of existing edges between neighbors to the maximum possible edges
 */
function computeClusteringCoefficient(
  graph: UndirectedGraph,
  node: string
): number {
  const neighbors = graph.neighbors(node);
  const k = neighbors.length;

  if (k < 2) return 0;

  // Count edges between neighbors
  let edgeCount = 0;
  for (let i = 0; i < neighbors.length; i++) {
    for (let j = i + 1; j < neighbors.length; j++) {
      if (graph.hasEdge(neighbors[i], neighbors[j])) {
        edgeCount++;
      }
    }
  }

  // Maximum possible edges between k neighbors
  const maxEdges = (k * (k - 1)) / 2;

  return edgeCount / maxEdges;
}

export default function assignMetrics(graph: UndirectedGraph) {
  // Assign centrality metrics to node attributes
  betweennessCentrality.assign(graph, {
    getEdgeWeight: null,
    normalized: true,
  });
  degreeCentrality.assign(graph);
  closenessCentrality.assign(graph);
  eigenvectorCentrality.assign(graph);
  pagerank.assign(graph);

  // Compute and assign all metrics to nodes
  graph.updateEachNodeAttributes((node, attr) => {
    const degree = graph.degree(node);
    const weightedDegree = weightedUndirectedDegree(graph, node);
    const localDensity = computeLocalDensity(graph, node);
    const clusteringCoefficient = computeClusteringCoefficient(graph, node);

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
        eigenvectorCentrality: attr.eigenvectorCentrality,
        pagerank: attr.pagerank,
        // Density metrics
        localDensity,
        clusteringCoefficient,
      },
    };
  });

  // Collect all metric values for median computation
  const metricValues = {
    degree: [] as number[],
    weightedDegree: [] as number[],
    betweennessCentrality: [] as number[],
    degreeCentrality: [] as number[],
    closenessCentrality: [] as number[],
    eigenvectorCentrality: [] as number[],
    pagerank: [] as number[],
    localDensity: [] as number[],
    clusteringCoefficient: [] as number[],
  };

  graph.forEachNode((_, { metrics }) =>
    Object.keys(metricValues).forEach((key) =>
      metricValues[key].push(metrics[key])
    )
  );

  // Compute and store medians in graph attributes
  graph.setAttribute(
    "metricsMedian",
    Object.keys(metricValues).reduce((acc, key) => {
      acc[key] = getMedian(metricValues[key]);
      return acc;
    }, {} as { [key: string]: number })
  );
}
