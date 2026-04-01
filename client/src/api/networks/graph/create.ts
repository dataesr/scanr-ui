import { UndirectedGraph } from "graphology"
import { ElasticBuckets } from "../../../types/commons"
import { NetworkFilters, NetworkParameters } from "../../../types/network"
import graphBuild from "./build"
import graphFilterNodes from "./nodes/filter"
import graphMergeNodes from "./nodes/merge"
import graphAssignLayout from "./layout"
import graphReplaceNodesLabels from "./nodes/label"
import graphAssignNodesMetrics from "./nodes/metrics"

export default function graphCreate(
  aggregation: ElasticBuckets,
  source: string,
  model: string,
  lang: string,
  parameters: NetworkParameters,
  filters: NetworkFilters,
): UndirectedGraph {
  // Create Graph object from aggregation
  let graph = graphBuild(aggregation, model, lang)

  // Merge nodes with same labels (only for domains)
  graph = graphMergeNodes(graph, model)

  // Filter graph
  graph = graphFilterNodes(graph, source, model, filters, parameters)

  // Replace labels
  graphReplaceNodesLabels(graph, model)

  // Assign layout
  graphAssignLayout(graph)

  // Assign metrics
  graphAssignNodesMetrics(graph)

  return graph
}
