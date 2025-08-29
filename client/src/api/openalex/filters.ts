import { fillWithMissingYears } from "../utils/years";
import { getOpenalexUrl } from "./config";

const groupBysFilters = [
	"publication_year",
	"type",
];

export async function fetchOpenFilters({
	query
}: {
	query: string;
}): Promise<any> {
  const urls = groupBysFilters.map((groupBy) => getOpenalexUrl(query, groupBy));

	const responses = await Promise.all(urls.map((url) => fetch(url)));
	const results = await Promise.all(responses.map((res) => res.json()));
	const years = results?.[0]?.group_by.map((item) => ({
		value: parseInt(item.key, 10),
		label: parseInt(item.key_display_name, 10),
		count: item.count,
	}))
	const _100Year = Math.max(...years.map((el) => el.count));
  const byYear = years.filter((element) => element.value > 1990).map((element) => {
    return {
      ...element,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  const byType = results?.[1]?.group_by.map((item) => ({
    value: item.key_display_name,
    label: item.key_display_name,
    count: item.count,
  }));
  console.log("byType", byType)

	return { byYear, byType }
}
