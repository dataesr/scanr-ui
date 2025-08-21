import { fillWithMissingYears } from "../utils/years";

const getUrl = (query: string) =>
	`https://api.openalex.org/works?page=1&mailto=bso@recherche.gouv.fr&filter=title_and_abstract.search:${query}&group_by=publication_year`;

export async function fetchOpenYearFilters({
	query
}: {
	query: string;
}): Promise<any> {
	const url = getUrl(query);
	const response = await fetch(url);
	const json = await response.json();
	console.log("JSON", json)
	const data = json.group_by.map((item) => ({
		value: parseInt(item.key, 10),
		label: parseInt(item.key_display_name, 10),
		count: item.count,
	}))
	const _100Year = Math.max(...data.map((el) => el.count));
  const byYear = data.filter((element) => element.value > 1990).map((element) => {
    return {
      ...element,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  console.log("OPENALEX", byYear)

	return { byYear }
}
