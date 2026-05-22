import { clinicalTrialsIndex, postHeadersBso } from "../../../config/api";
import { LightClinicalTrial } from "../../../types/clinical-trial";
import { ElasticResult, SearchArgs, SearchResponse } from "../../../types/commons";
import { FIELDS, LIGHT_SOURCE } from "../_utils/constants";

const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { "title.keyword": { order: "desc" } }
]
const HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "title": {},
    "summary": {},
    "lead_sponsor_normalized": {},
  }
}

export async function searchClinicalTrials({ cursor, filters, query, size }: SearchArgs): Promise<SearchResponse<LightClinicalTrial>> {
  const body: any = {
    _source: LIGHT_SOURCE,
    sort: SORTER,
    highlight: HIGHLIGHT,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              fields: FIELDS,
            },
          }
        ]
      }
    },
  }
  if (filters) body.query.bool.filter = filters
  if (size) body.size = size
  if (cursor) body.search_after = cursor
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }
  const res = await fetch(
    `${clinicalTrialsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeadersBso })
  const data = await res.json()
  const nextCursor: string = data?.hits?.hits[data.hits.hits.length - 1]?.sort || ""
  const totalCount: number = data?.hits?.total?.value || 0
  const clinicalTrials: ElasticResult<LightClinicalTrial>[] = data?.hits?.hits || []

  clinicalTrials.map((clinicalTrial) => ({
    id: clinicalTrial?.NCTId ?? clinicalTrial?.CTIS ?? clinicalTrial?.eudraCT,
    ...clinicalTrial,
  }))

  return { cursor: nextCursor as string, data: clinicalTrials, total: totalCount }
}