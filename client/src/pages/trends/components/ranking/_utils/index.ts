import { DSFRColors } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
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
  const intl = useIntl()
  const threshold = SLOPE_THRESHOLD(normalized)

  const slope = normalized ? item.norm_slope : item.slope

  if (slope > threshold) return intl.formatMessage({ id: "trends.trending" })
  if (slope < -threshold) return intl.formatMessage({ id: "trends.fading" })

  return intl.formatMessage({ id: "trends.stable" })
}

export function itemGetTrendVariation(item: TrendsRankingItem) {
  const variation = item.variation

  if (variation === Infinity) return "Breakout"
  if (variation === -Infinity) return "Exctint"

  const prefix = variation >= 0 ? "+" : "-"
  return `${prefix}${Math.abs(variation * 100).toFixed(0)}%`
}
