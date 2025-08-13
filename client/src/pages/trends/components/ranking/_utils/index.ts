import { DSFRColors } from "@dataesr/dsfr-plus"
import { TrendsRankingItem } from "../../../../../types/trends"

const DEFAULT_COLOR = "beige-gris-galet"
// const DIFF_THRESHOLD = 0.15 // 15%
const SLOPE_THRESHOLD = (normalized: boolean): number => {
  return normalized ? 0.005 : 0.5
}

export function itemGetColor(item: TrendsRankingItem, field: "slope" | "norm_slope", normalized: boolean): DSFRColors {
  const threshold = SLOPE_THRESHOLD(normalized)
  const value = item?.[field] || 0

  if (value > threshold) return "success"
  if (value < -threshold) return "warning"

  return DEFAULT_COLOR
}

export function itemGetTrendState(item: TrendsRankingItem, normalized: boolean) {
  const threshold = SLOPE_THRESHOLD(normalized)

  const slope = normalized ? item.norm_slope : item.slope

  if (slope > threshold) return "trends.trending"
  if (slope < -threshold) return "trends.fading"

  return "trends.stable"
}


export function itemGetCategoryColor(openAlexField: string) {
  switch (openAlexField) {
    case "subfield":
      return "green-emeraude"
    case "field":
      return "purple-glycine"
    case "domain":
      return "blue-cumulus"
    default:
      return "blue-cumulus"
  }
}

export function formatItemVariation(variation: number): string {
  if (variation === Infinity) return "breakout"
  if (variation === -Infinity) return "exctint"

  return `${(variation * 100).toFixed(0)}%`
}
