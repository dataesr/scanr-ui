import { organizationsIndex, postHeaders } from "../../../config/api";
import {
  ElasticResult,
  SearchArgs,
  SearchResponse,
} from "../../../types/commons";
import { LightOrganization } from "../../../types/organization";
import { DEFAULT_FILTERS, FIELDS, LIGHT_SOURCE } from "../_utils/constants";
import { getMatchPhrases } from "../_utils/get-match-phrases";

const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { "id.keyword": { order: "desc" } },
];
const HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "label.default": {},
    "acronym.default": {},
    "publications.title.default": {},
    "publications.summary.default": {},
  },
};

const forbiddenQueries = [
  "zrr",
  "ZZR",
  "Protection du potentiel scientifique et technique",
  "PPST",
  "ppst",
  "zone à régime restrictif",
  "zones à régime restrictif",
  "opérateur d'importance vitale",
  "opérateurs d'importance vitale",
  "OIV",
  "oiv",
];

export async function searchOrganizations({
  cursor,
  query,
  filters,
  size,
}: SearchArgs): Promise<SearchResponse<LightOrganization>> {
  if (forbiddenQueries.includes(query)) {
    return Promise.resolve({ data: [], cursor: "", total: 0 });
  }

  const body: any = {
    _source: LIGHT_SOURCE,
    sort: SORTER,
    highlight: HIGHLIGHT,
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
      },
    },
  };
  if (filters) body.query.bool.filter = [...filters, ...DEFAULT_FILTERS];
  if (size) body.size = size;
  if (cursor) body.search_after = cursor;
  if (!query)
    body.query = { function_score: { query: body.query, random_score: {} } };
  const res = await fetch(`${organizationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`);
  }
  const json = await res.json();
  const nextCursor: string =
    json?.hits?.hits[json.hits.hits.length - 1]?.sort || "";
  const totalCount: number = json?.hits?.total?.value || 0;
  const data: ElasticResult<LightOrganization>[] = json?.hits?.hits || [];
  return { data, cursor: nextCursor as string, total: totalCount };
}

export async function searchOrganizationsForHe({
  cursor,
  query,
  filters,
}: SearchArgs): Promise<SearchResponse<LightOrganization>> {
  const body: any = {
    _source: LIGHT_SOURCE,
    sort: SORTER,
    highlight: HIGHLIGHT,
    query: {
      bool: {
        minimum_should_match: 1,
        should: getMatchPhrases(query?.split("|")),
        filter: [...(filters || []), { term: { status: "active" } }],
      },
    },
  };
  if (cursor) body.search_after = cursor;
  const res = await fetch(`${organizationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`);
  }
  const json = await res.json();
  const nextCursor: string =
    json?.hits?.hits[json.hits.hits.length - 1]?.sort || "";
  const totalCount: number = json?.hits?.total?.value || 0;
  const data: ElasticResult<LightOrganization>[] = json?.hits?.hits || [];
  return { data, cursor: nextCursor as string, total: totalCount };
}
