export type TrendsRanking = {
  ranking: Record<string, TrendsRankingItems>
  nextCursor: number
  sourceCount: number
  searchTotal: number
  includesTotal: number
}

export type TrendsRankingItems = Array<TrendsRankingItem>
export type TrendsRankingItem = {
  id: string
  label: string
  count: Record<string, number>
  slope: number
  norm_slope: number
  intercept: number
  r2: number
  sum: number
  variation: number
}

export type TrendsRankingSorts = Array<TrendsRankingSort>
export type TrendsRankingSort = {
  id: string
  label: string
  order: string
  nextSort?: string
}

export type TrendsFilters = Array<TrendsFilter>
export type TrendsFilter = Record<string, unknown>

export type TrendsArgs = {
  cursor: number
  model: string
  query: string
  years: Array<number>
  normalized?: boolean
  filters?: TrendsFilters
  includes?: string
}

export type TrendsIntegrationOptions = {
  showTrendsOnly: boolean
  showHeader: boolean
  showTitle: boolean
  showBreadcrumb: boolean
  showOptionsBar: boolean
  showSearchBar: boolean
  showSelectModel: boolean
  showSelectSource: boolean
  showFilters: boolean
  showParameters: boolean
  showExports: boolean
}
