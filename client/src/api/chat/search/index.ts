import { publicationsIndex, projectsIndex, postHeaders } from "../../../config/api"
import { SearchArgs, ElasticResult } from "../../../types/commons"
import { Publication } from "../../../types/publication"
import { FIELDS as PUBLICATIONS_FIELDS, LIGHT_SOURCE as PUBLICATIONS_SOURCE } from "../../publications/_utils/constants"
import { FIELDS as PROJECT_FIELDS } from "../../projects/_utils/constants"

const MAX_YEAR = new Date().getFullYear()
const MIN_YEAR = MAX_YEAR - 5

export async function searchForRAG({ query, filters, size }: SearchArgs): Promise<Array<Publication>> {
  const body: any = {
    _source: PUBLICATIONS_SOURCE,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: PUBLICATIONS_FIELDS,
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

export async function searchPublicationsForTrends({ query }: SearchArgs): Promise<any> {
  const body: any = {
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: PUBLICATIONS_FIELDS,
            },
          },
          {
            exists: {
              field: "summary",
            },
          },
        ],
        filter: [{ range: { year: { gte: MIN_YEAR } } }, { term: { "authors.affiliations.detected_countries": "fr" } }],
      },
    },
    aggs: {
      year: {
        terms: { field: "year", size: MAX_YEAR - MIN_YEAR },
        aggs: {
          top_publications: {
            top_hits: {
              _source: { includes: ["summary.*"] },
              size: 5,
            },
          },
          top_authors: {
            terms: { field: "authors.id_name.keyword", size: 5 },
          },
          top_affiliations: {
            terms: { field: "affiliations.id_name.keyword", size: 5 },
          },
          open_access: {
            terms: { field: "isOa" },
          },
        },
      },
    },
  }
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }
  const response = await fetch(`${publicationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })
  const data = await response.json()
  const aggregations = data.aggregations
  console.log("publications_data", data)
  console.log("publications_aggregations", aggregations)

  return aggregations
}

export async function searchProjectsForTrends({ query }: SearchArgs): Promise<any> {
  const body: any = {
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: PROJECT_FIELDS,
            },
          },
          {
            exists: {
              field: "description",
            },
          },
        ],
        filter: [{ range: { year: { gte: MIN_YEAR } } }, { term: { "participants.structure.isFrench": true } }],
      },
    },
    aggs: {
      year: {
        terms: { field: "year", size: MAX_YEAR - MIN_YEAR },
        aggs: {
          top_projects: {
            top_hits: {
              _source: { includes: ["description.*"] },
              size: 5,
            },
          },
          top_types: {
            terms: { field: "type.keyword", size: 5 },
          },
          top_structures: {
            terms: { field: "participants.structure.label.default.keyword", size: 5 },
          },
        },
      },
    },
  }
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }
  const response = await fetch(`${projectsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })
  const data = await response.json()
  const aggregations = data.aggregations
  console.log("projects_data", data)
  console.log("projects_aggregations", aggregations)

  return aggregations
}
