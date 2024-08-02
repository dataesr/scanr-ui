import { publicationsIndex, postHeaders } from "../../../config/api"
import { SearchArgs, ElasticResult } from "../../../types/commons"
import { Publication } from "../../../types/publication"
import { FIELDS, LIGHT_SOURCE } from "../_utils/constants"

const MIN_YEAR = 2013
const MAX_YEAR = new Date().getFullYear()

export async function searchForRAG({ query, filters, size }: SearchArgs): Promise<Array<Publication>> {
  const body: any = {
    _source: LIGHT_SOURCE,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
          {
            exists: {
              field: "summary",
            },
          },
        ],
      },
    },
  }
  if (filters) body.query.bool.filter = filters
  if (size) body.size = size
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }
  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })
  const data = await res.json()
  const publications: Array<Publication> =
    data?.hits?.hits
      ?.map((publication: ElasticResult<Publication>) => publication?._source)
      .filter((publication: Publication) => publication) || []

  return publications
}

export async function searchForTrends({ query }: SearchArgs): Promise<any> {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
        filter: [{ range: { year: { gte: MIN_YEAR } } }],
      },
    },
    aggs: {
      year: {
        terms: { field: "year", size: MAX_YEAR - MIN_YEAR },
      },
      authors: {
        terms: { field: "authors.id_name.keyword" },
      },
    },
  }
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }
  console.log("trendsBody", body)
  const res = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })
  const data = await res.json()
  const aggregations = data.aggregations
  console.log("data", data)
  console.log("aggregations", aggregations)

  return aggregations
}