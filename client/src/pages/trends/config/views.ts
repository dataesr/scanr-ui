import { TrendsView, TrendsViews } from "../../../types/trends"

export const TRENDS_VIEWS: TrendsViews = [
  { id: "count-top", label: "count", order: "top", nextView: "" },
  // { id: "diff-top", label: "diff", order: "top", nextView: "diff-bot" },
  // { id: "diff-bot", label: "diff", order: "bot", nextView: "diff-top" },
  { id: "trend-top", label: "trend", order: "top", nextView: "trend-bot" },
  { id: "trend-bot", label: "trend", order: "bot", nextView: "trend-top" },
]

export const TRENDS_VIEWS_KEYS = TRENDS_VIEWS.map((view) => view.id)
export const TRENDS_VIEWS_LABELS = [...new Set([...TRENDS_VIEWS.map((view) => view.label)])]

export const trendsViewGetConfig = (id: string): TrendsView => TRENDS_VIEWS.find((view) => view.id === id)
export const trendsViewFromLabel = (label: string): string => TRENDS_VIEWS.find((view) => view.label === label).id
