import { projectsIndex, postHeaders } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { ProjectAggregations } from "../../../types/project";
import { toAggregationModel } from "../../utils/helpers";
import { FIELDS } from "../_utils/constants";

export async function aggregateProjects(
  {query, filters = []}: AggregationArgs
  ): Promise<ProjectAggregations> {
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
      byType: {
        terms: {
          field: "type.keyword",
          size: 500,
        }
      },
      byYear: {
        terms: {
          field: "year",
          size: 25,
        }
      },
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = filters
  }
  const res = await fetch(
    `${projectsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations } = result;
  const data = Object.entries(aggregations)
    .reduce((acc, [key, aggreg]: [string, any]) => ({...acc, [key]: toAggregationModel(aggreg.buckets, (key === 'byYear'))}) , {});
  return data as ProjectAggregations;

}
