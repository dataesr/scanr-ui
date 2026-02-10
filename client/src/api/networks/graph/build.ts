import { UndirectedGraph } from "graphology"
import { ignoreIds } from "../config/ignore"
import { ElasticBuckets } from "../../../types/commons"

export const nodeGetId = (id: string) => {
  const nodeId = id.split("###")[0]
  return isNaN(+nodeId) ? nodeId : String(+nodeId)
}

const nodeGetLabel = (id: string, lang: string) => {
  const prefix = lang.toUpperCase() + "_"
  const labels = (id.split("###")[1] ?? id).split("|||")
  const label = labels.find((label) => label.startsWith(prefix)) ?? labels[0]
  return label.charAt(2) === "_" ? label.slice(3).trim() : label.trim()
}
const edgeGetKey = (id1: string, id2: string) => (id1 < id2 ? `${id1}-link-${id2}` : `${id2}-link-${id1}`)

export default function graphBuild(aggregation: ElasticBuckets, model: string, lang: string): UndirectedGraph {
  // Create Graph object
  let graph = new UndirectedGraph()

  aggregation.forEach((item) => {
    const { key, doc_count: count } = item
    const [source, target] = key.split("---")
    const sourceId = nodeGetId(source)
    const targetId = nodeGetId(target)
    const sourceLabel = nodeGetLabel(source, lang)
    const targetLabel = nodeGetLabel(target, lang)

    // Remove ignored ids
    if (ignoreIds?.[model]?.includes(sourceId) || ignoreIds?.[model]?.includes(targetId)) return

    // Add nodes and compute weight
    graph.updateNode(sourceId, (attr) => ({
      label: attr?.label || sourceLabel,
      weight: (attr?.weight ?? 0) + count,
      links: attr?.links ? [...attr.links, key] : [key],
    }))
    graph.updateNode(targetId, (attr) => ({
      label: attr?.label || targetLabel,
      weight: (attr?.weight ?? 0) + count,
      links: attr?.links ? [...attr.links, key] : [key],
    }))

    // Add edges and compute weight
    const edgeKey = edgeGetKey(sourceId, targetId)
    graph.updateUndirectedEdgeWithKey(edgeKey, sourceId, targetId, (attr) => ({
      weight: (attr?.weight ?? 0) + count,
      label: `${(attr?.weight ?? 0) + count} links`,
    }))
  })

  return graph
}
