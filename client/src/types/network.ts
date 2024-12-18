import { LangField } from "./commons"

export type Network = {
  network: NetworkData
  config?: NetworkConfig
  info?: NetworkInfo
}
export type NetworkData = {
  items: NetworkItems
  links: NetworkLinks
  clusters?: NetworkCommunities
}
export type NetworkItems = Array<NetworkItem>
export type NetworkItem = {
  id: string
  label: string
  x?: number
  y?: number
  cluster: number
  weights: Record<string, number>
  scores: Record<string, number>
  page?: string
  publicationsCount?: number
  citationsCount?: number
  citationsRecent?: number
  citationsScore?: number
}
export type NetworkLinks = Array<NetworkLink>
export type NetworkLink = {
  source_id: string
  target_id: string
  strength: number
}
export type NetworkCommunities = Array<NetworkCommunity>
export type NetworkCommunity = {
  cluster: number
  label: string
  size: number
  color: string
  nodes: Array<{
    id: string
    label: string
    weight?: number
    url?: string
  }>
  maxYear?: number
  publicationsByYear?: Record<string, number>
  publicationsCount?: number
  publications?: Array<Record<string, string | number>>
  citationsByYear?: Record<string, number>
  citationsCount?: number
  citationsRecent?: number
  citationsScore?: number
  domains?: Record<string, number>
  oaPercent?: number
}
export type NetworkConfig = {
  terminology?: Record<string, unknown>
  color_schemes?: Record<string, unknown>
  templates?: Record<string, unknown>
  styles?: Record<string, unknown>
}
export type NetworkInfo = {
  title?: string
  description?: string
}

export type NetworkSearchBody = {
  size: number
  query: {
    bool?: {
      must?: Array<Record<string, unknown>>
      filter?: Array<Record<string, unknown>>
    }
    function_score?: Record<string, unknown>
  }
  aggs?: Record<string, unknown>
}
export type NetworkSearchArgs = {
  model: string
  query?: string
  filters?: NetworkFilters
  options?: {
    computeClusters?: boolean
    lang?: string
  }
  parameters?: NetworkParameters
}
export type NetworkSearchHitsArgs = {
  model: string
  query?: string
  filters?: NetworkFilters
  links?: Array<string>
}

export type NetworkHits = Array<NetworkHit>
export type NetworkHit = {
  id: string
  title?: string
  type?: string
  isOa?: boolean
  year?: number
  domains?: Record<string, unknown>
}

export type NetworkFilters = Array<NetworkFilter>
export type NetworkFilter = Record<string, unknown>

export type ElasticBuckets = Array<ElasticBucket>
export type ElasticBucket = {
  key: string
  doc_count: number
  key_as_string?: string
  max_year?: {
    value: number
  }
}
export type ElasticHits = Array<ElasticHit>
export type ElasticHit = {
  id: string
  title?: LangField
  cited_by_counts_by_year?: Record<string, number>
}
export type ElasticAggregation = {
  buckets?: ElasticBuckets
  sum_other_doc_count?: number
  value?: number
}
export type ElasticAggregations = Record<string, ElasticAggregation>

export type NetworksIntegrationOptions = {
  showGraphOnly?: boolean
  showTitle?: boolean
  showSubtitle?: boolean
  showClustersAnalytics?: boolean
  showClustersButton?: boolean
  showSearchBar?: boolean
  showFilters?: boolean
  showExports?: boolean
  showBreadcrumb?: boolean
  showSelect?: boolean
  showHeader?: boolean
  graphHeight?: string
}

export type NetworkParameter = number | boolean | string
export type NetworkParameters = {
  maxNodes: number
  maxComponents: number
  clusters: boolean
  layout: string
  filterNode: string
}
