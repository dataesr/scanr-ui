import { publicationsIndex, postHeaders } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { PublicationAggregations } from "../../../types/publication";
import { publicationTypeMapping } from "../../../utils/string";
import { fillWithMissingYears } from "../../utils/years";
import { FIELDS } from "../_utils/constants";


export async function aggregatePublications(
  { query, filters = [] }: AggregationArgs
  ): Promise<PublicationAggregations> {
  const body: any = {
    size: 0,
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
    aggs: {
      byYear: {
        terms: {
          field: "year",
          size: 40,
        }
      },
      byPublicationType: {
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
  }
  if (filters.length > 0) {
    body.query.bool.filter = filters
  }
  const res = await fetch(
    `${publicationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;
  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  const byType = data?.byPublicationType?.buckets?.map((element) => {
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