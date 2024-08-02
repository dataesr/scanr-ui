import { publicationsIndex, postHeaders } from "../../../config/api"
import { SearchArgs, ElasticResult } from "../../../types/commons"
import { Publication } from "../../../types/publication"
import { FIELDS, LIGHT_SOURCE } from "../_utils/constants"

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
  console.log("ragBody", body)
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
