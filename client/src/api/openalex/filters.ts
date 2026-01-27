import { processYearAggregations } from "../utils/years";
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
	const results = await Promise.all(
    responses.map(async (res) => {
      if (!res.ok) {
        throw new Error(`Error ${res.status} while fetching OpenAlex filters${res?.statusText ? `: ${res.statusText}` : ''}`)
      }
      return res.json()
    })
  )
	const years = results?.[0]?.group_by.map((item) => ({
		key: parseInt(item.key, 10),
		doc_count: item.count,
	}))
  const byYear = processYearAggregations(years)
  const byType = results?.[1]?.group_by.map((item) => ({
    value: item.key_display_name,
    label: item.key_display_name,
    count: item.count,
  }));

	return { byYear, byType }
}
