import { postHeaders } from "../../../config/api"
import {
  Network,
  NetworkSearchBody,
  NetworkSearchArgs,
  ElasticHits,
  NetworkSearchHitsArgs,
  NetworkSearchAggsArgs,
} from "../../../types/network"
import { CONFIG } from "../network/config"
import networkCreate from "../network/network"
import configCreate from "../network/config"
import infoCreate from "../network/info"
import { ElasticAggregations } from "../../../types/commons"

const CURRENT_YEAR = new Date().getFullYear()
const DEFAULT_YEARS = Array.from({ length: (2010 - CURRENT_YEAR) / -1 + 1 }, (_, i) => CURRENT_YEAR + i * -1)

const DEFAULT_SIZE = 2000

const networkSearchBody = (source: string, model: string, query?: string | unknown): NetworkSearchBody => ({
  size: 0,
  query: {
    bool: {
      must: [
        {
          query_string: {
            query: query || "*",
            fields: CONFIG[source][model].search_fields,
          },
        },
      ],
    },
  },
  aggs: {
    [model]: {
      terms: { field: CONFIG[source][model].co_aggregation, size: DEFAULT_SIZE },
      aggs: { max_year: { max: { field: "year" } } },
    },
  },
})

export async function networkSearch({
  source,
  model,
  query,
  lang,
  parameters,
  filters,
  integration,
}: NetworkSearchArgs): Promise<Network> {
  const body = networkSearchBody(source, model, query)

  if (filters && filters.length > 0) body.query.bool.filter = filters
  if (!query) body.query = { function_score: { query: body.query, random_score: {} } }

  const res = await fetch(`${CONFIG[source][model].index}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })

  if (res.status !== 200) {
    console.error(`Elasticsearch error: ${res.status}`)
    return null
  }

  const json = await res.json()

  const aggregation = json.aggregations?.[model].buckets
  if (!aggregation?.length) {
    console.error(`Elasticsearch error: no co-${model} aggregation found for query ${query}`)
    return null
  }

  const network = await networkCreate(source, query, model, filters, aggregation, parameters, lang, integration)
  const config = configCreate(source, model)
  const info = infoCreate(query, model)

  if (network.items.length < 3) {
    console.error(`Network error: need at least three items to display the network (items=${network.items.length})`)
    return null
  }

  const data = {
    network: network,
    config: config,
    info: info,
  }

  return data
}

export async function networkSearchHits({
  source,
  model,
  query,
  filters,
  links,
}: NetworkSearchHitsArgs): Promise<ElasticHits> {
  const linksFilter = { terms: { [CONFIG[source][model].co_aggregation]: links } }
  const body = {
    size: DEFAULT_SIZE,
    _source: CONFIG[source][model].source_fields,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: CONFIG[source][model].search_fields,
            },
          },
        ],
        filter: filters.concat(linksFilter),
      },
    },
  }

  const res = await fetch(`${CONFIG[source][model].index}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((response) => response.json())

  return res?.hits?.hits?.map((hit) => hit._source)
}

export async function networkSearchAggs({
  source,
  model,
  query,
  filters,
  links,
}: NetworkSearchAggsArgs): Promise<ElasticAggregations> {
  const linksFilter = { terms: { [CONFIG[source][model].co_aggregation]: links } }
  const body = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: CONFIG[source][model].search_fields,
            },
          },
        ],
        filter: filters.concat(linksFilter),
      },
    },
    aggs: {
      documentsCount: {
        value_count: { field: "id.keyword" },
      },
      documentsByYear: {
        terms: { field: "year", include: DEFAULT_YEARS, size: DEFAULT_YEARS.length },
      },
      ...DEFAULT_YEARS.reduce(
        (acc, year) => (acc = { ...acc, [`citationsIn${year}`]: { sum: { field: `cited_by_counts_by_year.${year}` } } }),
        {}
      ),
      domains: {
        terms: { field: CONFIG[source][model].topics },
      },
      isOa: {
        terms: { field: "isOa" },
      },
    },
  }

  const res = await fetch(`${CONFIG[source][model].index}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((response) => response.json())

  return res?.aggregations
}
