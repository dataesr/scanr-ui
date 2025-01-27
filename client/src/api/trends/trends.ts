import { ElasticAggregation, ElasticBucket, ElasticBuckets } from "../../types/commons"
import { linearRegressionSlope } from "./_utils/regression"
import variation from "./_utils/variation"

const EXCLUDE_WORDS = [""]
const PAGE_ITEMS = 10

type TrendsAggregation = Array<ElasticBucket & { [x: string]: ElasticAggregation }>

function computeTrends(data: Array<any>, cursor: number, years: Array<number>, normalized: boolean) {
  const maxYear = years[years.length - 1]
  const minItems = (cursor || 0) * PAGE_ITEMS
  const maxItems = ((cursor || 0) + 1) * PAGE_ITEMS

  // Filter items
  const items = data.filter(({ label }) => !EXCLUDE_WORDS.includes(label))

  // Add linear regression + diff from last year
  items.forEach((item) => {
    const { slope, intercept, r2 } = linearRegressionSlope(item.count, years)
    item.slope = slope
    item.norm_slope = slope / item.sum
    item.intercept = intercept
    item.r2 = r2
    item.diff = variation(item.count, maxYear)
  })

  // Sort items by volume max year
  const sortedItems = items.sort((a, b) => (b?.count?.[maxYear] || 0) - (a?.count?.[maxYear] || 0))

  // Compute top items
  const topCount = sortedItems.slice(minItems, maxItems)
  // const topDiff = sortedItems
  //   .slice()
  //   .sort((a, b) => b.diff - a.diff)
  //   .slice(0, MAX_ITEMS)
  // const botDiff = sortedItems
  //   .slice()
  //   .sort((a, b) => (b?.count?.[min_year - 1] || 0) - (a?.count?.[maxYear - 1] || 0))
  //   .sort((a, b) => a.diff - b.diff)
  //   .slice(0, MAX_ITEMS)
  const topSlope = sortedItems
    .slice()
    .sort((a, b) => (normalized ? b.norm_slope - a.norm_slope : b.slope - a.slope))
    .slice(minItems, maxItems)
  const botSlope = sortedItems
    .slice()
    .sort((a, b) => (normalized ? a.norm_slope - b.norm_slope : a.slope - b.slope))
    .slice(minItems, maxItems)

  const trends = {
    ranking: {
      "count-top": topCount,
      // "diff-top": topDiff,
      // "diff-bot": botDiff,
      "trend-top": topSlope,
      "trend-bot": botSlope,
    },
    nextCursor: maxItems < sortedItems.length ? cursor + 1 : undefined,
    total: sortedItems.length,
  }

  return trends
}

export function publicationsTrends(
  aggregation: TrendsAggregation,
  cursor: number,
  years: Array<number>,
  normalized: boolean
) {
  // Items count by year
  const _items: Record<string, Record<string, any>> = aggregation.reduce((acc, bucket) => {
    bucket?.model?.buckets.forEach((item) => {
      const id = item.key.split("###")[0]
      const label = item.key.split("###")?.[1] || id
      acc[id] = {
        ...acc?.[id],
        id: id,
        label: acc?.[id]?.label || label,
        count: { ...acc?.[id]?.count, [bucket.key]: (acc?.[id]?.count?.[bucket.key] || 0) + item.doc_count },
        sum: (acc?.[id]?.sum || 0) + item.doc_count,
      }
    })
    return acc
  }, {})
  const items = Object.values(_items)

  const trends = computeTrends(items, cursor, years, normalized)
  return trends
}

export function citationsTrends(aggregation: ElasticBuckets, cursor: number, years: Array<number>, normalized: boolean) {
  // Items citations count by year
  const _items: Record<string, Record<string, any>> = aggregation.reduce((acc, item) => {
    years.forEach((year) => {
      const id = item.key.split("###")[0]
      const label = item.key.split("###")?.[1] || id
      const citationsCount = item?.[`citationsIn${year}`]?.value
      acc[id] = {
        ...acc?.[id],
        id: id,
        label: acc?.[id]?.label || label,
        count: { ...acc?.[id]?.count, ...(citationsCount && { [year]: (acc?.[id]?.count?.[year] || 0) + citationsCount }) },
        sum: (acc?.[id]?.sum || 0) + citationsCount,
      }
    })
    return acc
  }, {})
  const items = Object.values(_items)

  const trends = computeTrends(items, cursor, years, normalized)
  return trends
}