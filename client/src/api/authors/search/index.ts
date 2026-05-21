import { authorsIndex, postHeaders } from "../../../config/api";
import { LightAuthor } from "../../../types/author";
import { SearchArgs, SearchResponse, ElasticResult } from "../../../types/commons";
import { FIELDS, LIGHT_SOURCE } from "../_utils/constants";


const SORTER = [
  // requires a second field to sort on for elastic to return a cursor
  { _score: { order: "desc" } },
  { "id.keyword": { order: "desc" } }
]
const HIGHLIGHT = {
  number_of_fragments: 3,
  fragment_size: 125,
  pre_tags: ["<strong>"],
  post_tags: ["</strong>"],
  fields: {
    "publications.title.default": {},
    "publications.summary.default": {},
    "domains.label.default": {},
  }
}

const forbiddenQueries = [
  ["film", "pornographique"],
];

function matchWords(query, words) {
  const regexMetachars = /[(){[*+?.\\^$|]/g;
  const normalizedQuery = query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(regexMetachars, "\\$&");
  }

  const regex = new RegExp("\\b(?:" + words.join("|") + ")\\b", "gi");

  return normalizedQuery.match(regex) || [];
}

export async function searchAuthors({ cursor, query, filters, size }: SearchArgs): Promise<SearchResponse<LightAuthor>> {
  for (let index = 0; index < forbiddenQueries.length; index++) {
    const element = forbiddenQueries[index];
    const matchedWords = matchWords(query, element);

    if (
      element.filter((el) => matchedWords.includes(el)).length ===
      element.length
    ) {
      return { data: [], cursor: "", total: 0 };
    }
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
              query: query || '*',
              fields: FIELDS,
            },
          }
        ]
      }
    },
  }
  if (filters) body.query.bool.filter = filters
  if (size) body.size = size;
  if (cursor) body.search_after = cursor;
  if (!query) body.query = { function_score: { query: body.query, random_score: {} }}
  const res = await fetch(
    `${authorsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const nextCursor: string = data?.hits?.hits[data.hits.hits.length - 1]?.sort || ""
  const totalCount: number = data?.hits?.total?.value || 0;
  const authors: ElasticResult<LightAuthor>[] = data?.hits?.hits || []  
  
  return { data: authors, cursor: nextCursor as string, total: totalCount }
}