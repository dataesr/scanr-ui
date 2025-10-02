import type { ObjectAggregations, AggregationArgs } from "../../../types/commons";
import { publicationsIndex, postHeaders } from "../../../config/api";
import { publicationTypeMapping } from "../../../utils/string";
import { processYearAggregations } from "../../utils/years";
import { FIELDS } from "../_utils/constants";

const AGGS = {
  byYear: {
    terms: {
      field: "year",
      size: 40,
    }
  },
  byType: {
    terms: {
      field: "type.keyword",
    }
  },
  byAuthors: {
    terms: {
      field: "authors.id_name.keyword",
      size: 10,
    },
  },
  byIsOa: {
    terms: {
      field: "isOa",
    }
  },
  byFunder: {
    terms: {
      field: "projects.type.keyword",
    }
  },
  byReview: {
    terms: {
      field: "source.title.keyword",
      size: 10,
    }
  }
}

type PublicationAggregations = ObjectAggregations<keyof typeof AGGS>;

export async function aggregatePublications(
  { query, filters = [] }: AggregationArgs
  ): Promise<PublicationAggregations> {
  const body = {
    size: 0,
    query: {
      bool: {
        must: [{
          query_string: {
            query: query || '*',
            fields: FIELDS,
          },
        }],
        ...(filters.length > 0 ? { filter: filters } : {})
      }
    },
    aggs: AGGS,
  }
  const res = await fetch(
    `${publicationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;

  const byYear = processYearAggregations(data?.byYear?.buckets);

  const byType = data?.byType?.buckets?.map((element) => {
    if (!publicationTypeMapping[element?.key]) return null;
    return {
      value: element.key,
      label: publicationTypeMapping[element.key],
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const byFunder = data?.byFunder?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byAuthors = data?.byAuthors?.buckets?.map((element) => {
    return {
      value: element.key.split('###')?.[0],
      label: element.key.split('###')?.[1],
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byReview = data?.byReview?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const _100IsOa = data?.byIsOa?.buckets && Math.max(...data.byIsOa.buckets.map((el) => el.doc_count));
  const byIsOa = data?.byIsOa?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count * 100 / _100IsOa,
    }
  }
  ).filter(el => el) || [];
  return { byYear, byType, byAuthors, byFunder, byIsOa, byReview }
}
