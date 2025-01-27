import { DSFRColors } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

const DEFAULT_COLOR = "beige-gris-galet"
const DIFF_THRESHOLD = 0.15 // 15%
const SLOPE_THRESHOLD = (normalized: boolean): number => {
  return normalized ? 0.005 : 0.5
}

export function itemGetColor(item: any, field: "diff" | "slope" | "norm_slope", normalized: boolean): DSFRColors {

  if (field === "diff" && item.diff === Infinity)
    return Object.keys(item.count).length === 1 ? "green-bourgeon" : "green-emeraude"

  const threshold = field === "diff" ? DIFF_THRESHOLD : SLOPE_THRESHOLD(normalized)
  const value = item?.[field] || 0

  if (value > threshold) return "success"
  if (value < -threshold) return "warning"

  return DEFAULT_COLOR
}

export function itemGetTrendState(item: any, normalized: boolean) {
  const intl = useIntl()
  const threshold = SLOPE_THRESHOLD(normalized)

  const slope = normalized ? item.norm_slope : item.slope

  if (slope > threshold) return intl.formatMessage({ id: "trends.trending" })
  if (slope < -threshold) return intl.formatMessage({ id: "trends.fading" })

  return intl.formatMessage({ id: "trends.stable" })
}
