import { UndirectedGraph } from "graphology"
import subgraph from "graphology-operators/subgraph"
import { connectedComponents } from "graphology-components"
import betweennessCentrality from "graphology-metrics/centrality/betweenness"
import { NetworkFilters, NetworkParameters } from "../../../../types/network"
import { networkSearchNodes } from "../../search"

export default async function graphFilterNodes(
  graph: UndirectedGraph,
  source: string,
  model: string,
  nfilters: NetworkFilters,
  parameters: NetworkParameters,
): Promise<UndirectedGraph> {
  const { maxNodes, maxComponents, filterNodes, filterNeighbors } = parameters

  // store nodes ids before filter
  graph.setAttribute(
    "all_nodes",
    graph.nodes().map((n) => `${n}###${graph.getNodeAttribute(n, "label")}`),
  )

  const _filterNodes = [...filterNodes] // avoid mutation of parameters
  if (nfilters.length) {
    const nodes = await networkSearchNodes({ source, model, filters: nfilters, ids: graph.nodes() })
    if (nodes?.length) _filterNodes.push(...nodes)
  }

  if (_filterNodes.length || nfilters.length) {
    const filterIds = _filterNodes
      .map((node) => node.split("###")[0])
      .filter((key) => graph.hasNode(key))
      .flatMap((id) => [...(filterNeighbors ? graph.neighbors(id) : []), id])
    graph = subgraph(graph, filterIds) //TODO: warning on front ?
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

  if (graph.order < 3) {
    throw new Error(`Network error: need at least three items to display the network (items=${graph.order})`)
  }

  return graph
}
