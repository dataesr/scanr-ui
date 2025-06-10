import { patentsIndex, postHeaders } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { PatentsAggregationsForAnalyticTool } from "../../../types/patent";
import { FIELDS } from "../_utils/constants";


export async function aggregatePatentsForAnalyticTool(
  { query, filters = [] }: AggregationArgs
  ): Promise<PatentsAggregationsForAnalyticTool> {
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
      patentsCount: {
        value_count: { field: "id.keyword" },
      },
      byApplicants: {
        terms: {
          field: "applicants.id_name.keyword",
          size: 15,
          order: {
            _count: "desc"
          }
        }
      },
      byInventors: {
        terms: {
          field: "inventors.name.keyword",
          size: 15,
          // min_doc_count: 5,
          order: {
            _count: "desc"
          }
        }
      },
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = filters
  }
  const res = await fetch(
    `${patentsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;

  const byApplicants = data?.byApplicants?.buckets?.map((element) => {
    return {
      value: element.key?.split('###')?.[0] || element.key,
      label: element.key?.split('###')?.[1] || element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byInventors = data?.byInventors?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const patentsCount = data.patentsCount?.value;
  return {
    byInventors,
    byApplicants,
    patentsCount,
  };
}
