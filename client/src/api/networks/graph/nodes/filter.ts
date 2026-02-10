import { UndirectedGraph } from "graphology"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import betweennessCentrality from "graphology-metrics/centrality/betweenness"
import { CONFIG } from "../../config/elastic"
import { NetworkFilters, NetworkParameters } from "../../../../types/network"

export default function graphFilterNodes(
  graph: UndirectedGraph,
  source: string,
  model: string,
  filters: NetworkFilters,
  parameters: NetworkParameters,
): UndirectedGraph {
  const { maxNodes, maxComponents, filterNode, filterFocus } = parameters

  if (filterFocus && ["authors", "institutions", "structures"].includes(model)) {
    // Limit graph to filtered ids (only for authors and affiliations)
    const focusIds = filters.reduce(
      (acc, filter) => [...acc, ...(filter?.terms?.[CONFIG[source][model].aggregation] || [])],
      [],
    )
    graph = subgraph(
      graph,
      focusIds.filter((id) => graph.hasNode(id)),
    )
  } else {
    // Filter nodes
    if (filterNode) {
      graph = subgraph(graph, [...graph.neighbors(filterNode), filterNode])
    }

    // Keep only largests components
    const sortedComponents = connectedComponents(graph).sort((a, b) => b.length - a.length)
    let numberOfComponents = maxComponents || sortedComponents.length
    graph = subgraph(graph, sortedComponents.slice(0, numberOfComponents).flat())
    while (graph.order > maxNodes && numberOfComponents > 1) {
      numberOfComponents -= 1
      graph = subgraph(graph, sortedComponents.slice(0, numberOfComponents).flat())
    }

    // Keep only largests nodes
    if (graph.order > maxNodes) {
      betweennessCentrality.assign(graph)
      const sortedNodes = graph
        .mapNodes((node, attr) => ({
          node: node,
          centrality: attr.betweennessCentrality,
        }))
        .sort((a, b) => b.centrality - a.centrality)
        .map((node) => node.node)
      graph = subgraph(graph, sortedNodes.slice(0, maxNodes))
    }
  }

  if (graph.order < 3) {
    throw new Error(`Network error: need at least three items to display the network (items=${graph.order})`)
  }

  return graph
}
