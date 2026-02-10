import Graph from "graphology"
import { configGetItemPage } from "../config/vosviewer"

export const clusterGetIds = (graph: Graph, cluster: number): Array<string> =>
  graph.filterNodes((_, attr) => attr?.cluster === cluster)

export const clusterGetSize = (graph: Graph, cluster: number): number =>
  graph.filterNodes((_, attr) => attr?.cluster === cluster).length

export const clusterGetNodes = (
  graph: Graph,
  cluster: number,
  source: string,
  model: string,
): Array<{ id: string; weight: number; label: string }> => {
  const ids = clusterGetIds(graph, cluster)
  const nodes = ids.map((id) => ({
    id: id,
    weight: graph.getNodeAttribute(id, "weight"),
    label: graph.getNodeAttribute(id, "label"),
    page: configGetItemPage(source, model, id),
  }))
  return nodes.sort((a, b) => b.weight - a.weight)
}
