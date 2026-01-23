import { LangField } from "./commons"

export type Network = {
  network: NetworkData
  config?: NetworkConfig
  info?: NetworkInfo
  count?: number
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
  metrics?: Record<string, number>
  page?: string
  search?: string
  documentsCount?: number
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
    page?: string
  }>
  metadata?: {
    documentsByYear?: Record<string, number>
    documentsCount?: number
    documentsMaxYear?: number
    documents?: Array<Record<string, string | number>>
    citationsByYear?: Record<string, number>
    citationsCount?: number
    citationsRecent?: number
    citationsScore?: number
    domains?: Record<string, number>
    oaPercent?: number
  }
  metrics?: {
    density: number
    centrality: number
  }
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

export type NetworkCountBody = {
  query: {
    bool?: {
      must?: Array<Record<string, unknown>>
      filter?: Array<Record<string, unknown>>
    }
    function_score?: Record<string, unknown>
  }
}
export type NetworkCountArgs = {
  source: string
  model: string
  query?: string
  filters?: NetworkFilters
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
  source: string
  model: string
  query?: string
  filters?: NetworkFilters
  lang?: string
  parameters?: NetworkParameters
  integration?: string
}
export type NetworkSearchHitsArgs = {
  source: string
  model: string
  query?: string
  filters?: NetworkFilters
  links?: Array<string>
}
export type NetworkSearchAggsArgs = {
  source: string
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

export type ElasticHits = Array<ElasticHit>
export type ElasticHit = {
  id: string
  label?: LangField
  title?: LangField
  year?: number
  cited_by_counts_by_year?: Record<string, number>
}

export type NetworksIntegrationOptions = {
  showGraphOnly?: boolean
  showHeader?: boolean
  showBreadcrumb?: boolean
  showTitle?: boolean
  showOptionsBar?: boolean
  showSearchBar?: boolean
  showSelectModel?: boolean
  showSelectSource?: boolean
  showFilters?: boolean
  showParameters?: boolean
  showExports?: boolean
  showClustersAnalytics?: boolean
  graphHeight?: string
}

export type NetworkParameter = number | boolean | string
export type NetworkParameters = {
  maxNodes: number
  maxComponents: number
  clusters: boolean
  filterNode: string
  sample: boolean
}
