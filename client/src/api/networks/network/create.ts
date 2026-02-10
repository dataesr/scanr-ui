import graphCreate from "../graph/create"
import clustersCreate from "../clusters/create"
import { configGetItemPage, configGetItemSearch } from "../config/vosviewer"
import { NetworkData, NetworkFilters, NetworkParameters } from "../../../types/network"
import { ElasticBucket } from "../../../types/commons"

interface NetworkCreateArgs {
  source: string
  query?: string
  model: string
  filters?: NetworkFilters
  aggregation: Array<ElasticBucket>
  parameters: NetworkParameters
  lang?: string
  integration?: string
}
export default async function networkCreate(args: NetworkCreateArgs): Promise<NetworkData> {
  const { query, aggregation, source, model, lang, parameters, filters, integration } = args

  // Get graph
  let graph = graphCreate(aggregation, source, model, lang, parameters, filters)

  // Get clusters
  const clusters = await clustersCreate(graph, query, source, model, filters, parameters.clusters)

  // Get items
  const items = graph.mapNodes((key, attr) => ({
    id: key,
    x: attr.x,
    y: attr.y,
    label: attr.label,
    cluster: attr.cluster + 1,
    weights: {
      Weight: attr.weight,
      Degree: graph.degree(key),
      ...(parameters.clusters && { Citations: attr?.citationsCount || 0 }),
    },
    metrics: attr.metrics,
    scores: { ...(attr?.documentsMaxYear && { "Last document": attr.documentsMaxYear }) },
    page: configGetItemPage(source, model, key),
    search: configGetItemSearch(query, source, model, key, integration),
    ...(attr?.documentsCount !== undefined && {
      documentsCount: attr?.documentsCount,
    }),
    ...(attr?.citationsCount !== undefined && {
      citationsCount: attr?.citationsCount,
    }),
    ...(attr?.citationsRecent !== undefined && {
      citationsRecent: attr?.citationsRecent,
    }),
    ...(attr?.citationsScore !== undefined && {
      citationsScore: attr?.citationsScore,
    }),
  }))

  // Get links
  const links = graph.mapEdges((_, attr, source, target) => ({
    source_id: source,
    target_id: target,
    strength: attr.weight,
  }))

  const network: NetworkData = {
    items,
    links,
    clusters,
  }
  console.log("network", network)

  return network
}
