import Graph from "graphology"

function mergeNodesFromLabel(graph: Graph) {
  const labels = new Map()

  // map all labels
  graph.forEachNode((key, attrs) => {
    const label = attrs.label
    if (!labels.has(label)) labels.set(label, [])
    labels.get(label).push(key)
  })

  labels.forEach((nodes, _) => {
    if (nodes.length <= 1) return

    const master = nodes[0]
    const dupes = nodes.slice(1)

    dupes.forEach((dupe: string) => {
      // merge nodes attributes
      const dupeAttr = graph.getNodeAttributes(dupe)

      // get weight of master/dupe link if it exist
      let masterLinkWeight = 0
      try {
        masterLinkWeight = graph.getUndirectedEdgeAttribute(master, dupe, "weight")
      } catch (_) {}
      graph.updateNode(master, (attr) => ({
        label: attr.label,
        weight: attr.weight + dupeAttr.weight - masterLinkWeight,
        links: [...attr.links, ...dupeAttr.links],
      }))

      // merge edges
      graph.forEachEdge(dupe, (_, dupeEdgeAttr, source, target) => {
        const other = source === dupe ? target : source
        if (other === master) return
        const edgeKey = master < other ? `${master}-link-${other}` : `${other}-link-${master}`
        const edgeSource = master < other ? master : other
        const edgeTarget = master < other ? other : master
        graph.updateUndirectedEdgeWithKey(edgeKey, edgeSource, edgeTarget, (attr) => ({
          weight: (attr?.weight || 0) + dupeEdgeAttr.weight,
          label: `${(attr?.weight || 0) + dupeEdgeAttr.weight} links`,
        }))
      })

      // drop dupe
      graph.dropNode(dupe)
    })
  })
  return graph
}

export default function graphMergeNodes(graph: Graph, model: string) {
  if (["domains"].includes(model)) return mergeNodesFromLabel(graph)

  return graph
}
