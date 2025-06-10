import { projectsIndex, postHeaders } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { ProjectAggregationsForAnalyticsTool } from "../../../types/project";
import { toAggregationModel } from "../../utils/helpers";
import { fillWithMissingYears } from "../../utils/years";
import { FIELDS } from "../_utils/constants";

export async function aggregateProjectsForAnalyticsTool(
  { query }: AggregationArgs
  ): Promise<ProjectAggregationsForAnalyticsTool> {
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
      projectsCount: {
        value_count: { field: "id.keyword" },
      },
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
      byInstitution: {
        terms: {
          field: "participants.structure.id_name.keyword",
          size: 500,
        }
      }
    }
  }
  const res = await fetch(
    `${projectsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data } = result;
  const byInstitution = data?.byInstitution?.buckets
    ?.filter((element) => element.key.split('###')?.[0].match(/^[0-9]{9}[A-Z]{1}$/))
    .map((element) => {
      return {
        value: element.key.split('###')?.[0],
        label: element.key.split('###')?.[1]?.split('_')?.[1]?.split('|||')?.[0],
        count: element.doc_count,
      }
    })
    .filter(el => el) || [];

  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  const byType = data?.byType?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const projectsCount = data?.projectsCount?.value || 0;
  return { byInstitution, byYear, byType, projectsCount};

}
