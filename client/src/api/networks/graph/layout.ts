import Graph from "graphology"
import circular from "graphology-layout/circular"
import forceAtlas2 from "graphology-layout-forceatlas2"

export default function graphAssignLayout(graph: Graph) {
  // Add forceAtlas layout
  circular.assign(graph) // Needs a starting layout for forceAtlas to work
  const sensibleSettings = forceAtlas2.inferSettings(graph)
  forceAtlas2.assign(graph, { iterations: 100, settings: sensibleSettings })
}
