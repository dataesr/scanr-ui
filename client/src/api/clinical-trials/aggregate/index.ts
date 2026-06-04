import { clinicalTrialsIndex, postHeaders } from "../../../config/api";
import type { AggregationArgs, ObjectAggregations } from "../../../types/commons";
import { FIELDS } from "../_utils/constants";

const AGGS = {
  byRor: {
    terms: {
      field: "ror.keyword",
      size: 50
    }
  }
}

type ClinicalTrialAggregations = ObjectAggregations<keyof typeof AGGS>;

export async function aggregateClinicalTrials(
  { query, filters = [] }: AggregationArgs
  ): Promise<ClinicalTrialAggregations> {
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
    `${clinicalTrialsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data } = result;

  const byRor = data?.byRor?.buckets?.map((element) => element.key).filter(el => el) ?? []

  return { byRor }
}
