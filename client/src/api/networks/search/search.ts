import { postHeaders } from "../../../config/api"
import {
  Network,
  NetworkSearchBody,
  NetworkSearchArgs,
  ElasticHits,
  NetworkSearchHitsArgs,
  NetworkSearchAggsArgs,
  NetworkCountBody,
  NetworkCountArgs,
} from "../../../types/network"
import { CONFIG } from "../network/config"
import networkCreate from "../network/network"
import configCreate from "../network/config"
import infoCreate from "../network/info"
import { ElasticAggregations } from "../../../types/commons"

const CURRENT_YEAR = new Date().getFullYear()
const DEFAULT_YEARS = Array.from({ length: (2010 - CURRENT_YEAR) / -1 + 1 }, (_, i) => CURRENT_YEAR + i * -1)

const DEFAULT_SIZE = 2000
const MAX_SIZE = 10000

export async function networkCount({ source, model, query, filters }: NetworkCountArgs): Promise<number> {
  const body: NetworkCountBody = {
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
  }
  if (filters && filters.length > 0) body.query.bool.filter = filters

  const res = await fetch(`${CONFIG[source][model].index}/_count`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })

  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const count: number = json?.count || null

  return count
}

export async function networkSearch({
  source,
  model,
  query,
  lang,
  parameters,
  filters,
  integration,
}: NetworkSearchArgs): Promise<Network> {
  const modelAggregation = {
    [model]: {
      terms: { field: CONFIG[source][model].co_aggregation, size: DEFAULT_SIZE },
    },
  }
  // if filters: use standard sampler (top MAX_SIZE documents that match the query)
  // if no filters: use random_sampler (random 10% of all documents)
  const isFilters = Boolean(filters && filters.length > 0)
  const isQuery = Boolean(query && query.length > 1)
  const sampler =
    isFilters || isQuery ? { sampler: { shard_size: MAX_SIZE } } : { random_sampler: { probability: 0.1, seed: 42 } }
  const aggs = parameters.sample ? { sample: { ...sampler, aggs: modelAggregation } } : modelAggregation
  const body: NetworkSearchBody = {
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
    aggs: aggs,
  }

  if (filters && filters.length > 0) body.query.bool.filter = filters
  if (parameters.sample && isFilters && !isQuery)
    body.query = { function_score: { query: body.query, random_score: { seed: 42, field: "_seq_no" } } }

  const res = await fetch(`${CONFIG[source][model].index}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  })

  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }

  const json = await res.json()

  const aggregation = parameters.sample ? json.aggregations?.sample?.[model].buckets : json.aggregations?.[model].buckets
  if (!aggregation?.length) {
    throw new Error(`Elasticsearch error: no co-${model} aggregation found for query ${query}`)
  }

  const network = await networkCreate(source, query, model, filters, aggregation, parameters, lang, integration).catch(
    (error) => {
      console.error(error)
      return null
    }
  )
  const config = configCreate(source, model)
  const info = infoCreate(source, query, model)

  if (network.items.length < 3) {
    throw new Error(`Network error: need at least three items to display the network (items=${network.items.length})`)
  }

  const data = {
    network: network,
    config: config,
    info: info,
    ...(parameters.sample && { count: json.aggregations?.sample?.doc_count }),
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
      documentsMaxYear: { max: { field: "year" } },
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
