import { ElasticBuckets } from "../../types/commons";
import { processYearAggregations } from "./years";

export function toAggregationModel(data: ElasticBuckets, isYears: boolean = false) {
  if (isYears) return processYearAggregations(data);
  return data.map((element) => ({
    value: element.key,
    label: element.key,
    count: element.doc_count,
  })) || [];
}
