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
  x: number
  y: number
  cluster: number
  weights: Record<string, number>
  scores: Record<string, number>
  page?: string
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
  ids?: Array<string>
  maxYear?: number
  maxWeightNodes?: Array<string>
  topWeightNodes?: Array<string>
  hits?: number
  years?: Record<string, number>
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
  max_year?: {
    value: number
  }
}

export type ElasticDomains = Array<ElasticDomain>
export type ElasticDomain = {
  label: LangField
  count: number
}

export type ElasticHits = Array<ElasticHit>
export type ElasticHit = {
  id: string
  title?: LangField
  productionType?: string
  isOa?: boolean
  domains?: ElasticDomains
  year?: number
}
