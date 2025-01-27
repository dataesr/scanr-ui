import { TrendsRankingSort, TrendsRankingSorts } from "../../../types/trends"

export const TRENDS_RANKING_SORTS_MAPPING: TrendsRankingSorts = [
  { id: "count-top", label: "count", order: "top", nextSort: "" },
  { id: "trend-top", label: "trend", order: "top", nextSort: "trend-bot" },
  { id: "trend-bot", label: "trend", order: "bot", nextSort: "trend-top" },
]

export const TRENDS_RANKING_SORTS_IDS = TRENDS_RANKING_SORTS_MAPPING.map((sort) => sort.id)
export const TRENDS_RANKING_SORTS_NAMES = [...new Set([...TRENDS_RANKING_SORTS_MAPPING.map((sort) => sort.label)])]

export const trendsRankingSortFromId = (id: string): TrendsRankingSort =>
  TRENDS_RANKING_SORTS_MAPPING.find((sort) => sort.id === id)
export const trendsRankingSortFromLabel = (label: string): TrendsRankingSort =>
  TRENDS_RANKING_SORTS_MAPPING.find((sort) => sort.label === label)
