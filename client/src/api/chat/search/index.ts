import { publicationsIndex, postHeaders } from "../../../config/api"
import { SearchArgs, ElasticResult } from "../../../types/commons"
import { Publication } from "../../../types/publication"
import { FIELDS, LIGHT_SOURCE } from "../_utils/constants"

const MAX_YEAR = new Date().getFullYear()
const MIN_YEAR = MAX_YEAR - 5

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
        filter: [{ range: { year: { gte: MIN_YEAR } } }],
      },
    },
    aggs: {
      year: {
        terms: { field: "year", size: MAX_YEAR - MIN_YEAR },
        aggs: {
          top_publication: {
            top_hits: {
              _source: { includes: ["summary.*"] },
              size: 5,
            },
          },
        },
      },
      authors: {
        terms: { field: "authors.id_name.keyword", size: 5 },
      },
      affiliations: {
        terms: { field: "affiliations.id_name.keyword", size: 5 },
      },
      productionType: {
        terms: { field: "productionType.keyword", size: 5 },
      },
      isOa: {
        terms: { field: "isOa" },
      },
    },
  }
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }
  console.log("trendsBody", body)
  const response = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })
  console.log("trendsResponse", response)
  const data = await response.json()
  const aggregations = data.aggregations
  console.log("data", data)
  console.log("aggregations", aggregations)

  return aggregations
}