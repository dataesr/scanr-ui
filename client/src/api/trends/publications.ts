import { postHeaders, publicationsIndex } from "../../config/api"
import { ElasticAggregation, ElasticBucket, ElasticBuckets } from "../../types/commons"
import { TrendsArgs } from "../../types/trends"
import { FIELDS } from "../publications/_utils/constants"
import { CONFIG } from "./config"
import { citationsTrends, publicationsTrends } from "./trends"

type TrendsAggregation = Array<ElasticBucket & { model: ElasticAggregation }>

export async function getPublicationsTrends({ cursor, model, query, years, filters, normalized }: TrendsArgs) {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          { range: { year: { gte: years[0] } } },
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
      },
    },
    aggs: {
      years: {
        terms: { field: "year", size: years.length },
        aggs: {
          model: { terms: { field: CONFIG[model].field, size: 60000 / years.length } },
        },
      },
      count: { value_count: { field: "id.keyword" } },
    },
  }

  if (filters && filters.length > 0) body.query.bool.filter = filters

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })

  if (res.status !== 200) {
    console.error(`Elasticsearch error: ${res.status}`)
    return null
  }

  const json = await res.json()
  const count: number = json?.aggregations?.count?.value || 0
  const aggregation: TrendsAggregation = json?.aggregations?.["years"]?.buckets

  if (!aggregation?.length) {
    console.error(`Elasticsearch error: no aggregation found for years ${years[0]}-${years[years.length - 1]}`)
    return null
  }

  const trends = publicationsTrends(aggregation, cursor, years, normalized)
  return { ...trends, count: count }
}

export async function getCitationsTrends({ cursor, model, query, years, filters, normalized }: TrendsArgs) {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          { exists: { field: "cited_by_counts_by_year" } },
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
      },
    },
    aggs: {
      model: {
        terms: { field: CONFIG[model].field, size: 10000 },
        aggs: {
          ...years.reduce(
            (acc, year) => (acc = { ...acc, [`citationsIn${year}`]: { sum: { field: `cited_by_counts_by_year.${year}` } } }),
            {}
          ),
        },
      },
      count: { value_count: { field: "id.keyword" } },
    },
  }

  if (filters && filters.length > 0) body.query.bool.filter = filters

  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })

  if (res.status !== 200) {
    console.error(`Elasticsearch error: ${res.status}`)
    return null
  }

  const json = await res.json()
  const count: number = json?.aggregations?.count?.value || 0
  const aggregation: ElasticBuckets = json?.aggregations?.model?.buckets

  if (!aggregation?.length) {
    console.error(`Elasticsearch error: no aggregation found for years ${years[0]}-${years[years.length - 1]}`)
    return null
  }

  const trends = citationsTrends(aggregation, cursor, years, normalized)
  return { ...trends, count: count }
}
