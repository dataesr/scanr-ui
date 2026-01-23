import { projectsIndex, postHeaders } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { ProjectAggregationsForAnalyticsTool } from "../../../types/project";
import { processYearAggregations } from "../../utils/years";
import { FIELDS } from "../_utils/constants";

export async function aggregateProjectsForAnalyticsTool(
  { query, filters = [] }: AggregationArgs
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
          field: "participants_id_name_search.keyword",
          size: 500,
        }
      },
      byKeywordsFr: {
        terms: {
          field: "keywords.fr.keyword",
          size: 50,
        },
      },
      byKeywordsEn: {
        terms: {
          field: "keywords.en.keyword",
          size: 50,
        },
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

  const byYear = processYearAggregations(data?.byYear?.buckets);
  const byType = data?.byType?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const projectsCount = data?.projectsCount?.value || 0;
  const keywordsBuckets = [...data?.byKeywordsFr?.buckets || [], ...data?.byKeywordsEn?.buckets || []];

  const byKeywords = keywordsBuckets.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el).sort((a, b) => a.count - b.count).slice(0, 30) || [];
  return { byInstitution, byYear, byType, byKeywords, projectsCount};

}
