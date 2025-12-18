import { postHeaders, patentsIndex } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { PatentAggregations } from "../../../types/patent";
import { processYearAggregations } from "../../utils/years";
import { FIELDS } from "../_utils/constants";

export async function aggregatePatents({
  query,
  filters = [],
}: AggregationArgs): Promise<PatentAggregations> {
  const body: any = {
    size: 0,
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
    aggs: {
      byYear: {
        terms: {
          field: "year",
          size: 25,
        },
      },
    },
  };
  if (filters.length > 0) {
    body.query.bool.filter = filters;
  }
  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
  const result = await res.json();

  const byYear = processYearAggregations(result?.aggregations?.byYear?.buckets);

  return { byYear };
}
