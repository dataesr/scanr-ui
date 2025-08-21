import { AggregationArgs } from "../../types/commons";

const getUrl = (query: string, groupBy: string) =>
	`https://api.openalex.org/works?page=1&mailto=bso@recherche.gouv.fr&filter=title_and_abstract.search:${query}&group_by=${groupBy}`;

const groupBys = [
	"publication_year",
	"type",
	"authorships.countries",
	"authorships.author.id",
	// "authorships.author.id###authorships.countries:countries/fr",
	"authorships.institutions.lineage",
	"primary_topic.id",
	// "keywords.id",
	"primary_location.source.id",
	"grants.funder",
	"authorships.institutions.continent",
];

export async function fetchOpenAlexAggregations({ query, filters = [] }: AggregationArgs): Promise<any> {
  console.log(filters)
	const urls = groupBys.map((groupBy) => {
	// if (groupBy.split("###").length > 1) {
 //    return getUrl(`${query},${groupBy.split("###")[1]}`, groupBy.split("###")[0]);
	// }
	if (filters) {
		const [yearMin, yearMax] = [filters?.[0]?.range?.year?.gte, filters?.[0]?.range?.year?.lte]
		if (!yearMin || !yearMax) return getUrl(query, groupBy);
		return getUrl(`${query},publication_year:${yearMin}-${yearMax}`, groupBy);
	}
	return getUrl(query, groupBy);
	});

	const responses = await Promise.all(urls.map((url) => fetch(url)));
	const results = await Promise.all(responses.map((res) => res.json()));
	const [
		publicationYear,
		publicationType,
		authorshipsCountries,
		authorshipsAllAuthors,
		// authorshipsFrenchAuthors,
		authorshipsAuthorsInstitutions,
		primaryTopic,
		// keywords,
		primaryLocationUrl,
		grantsFunder,
		authorshipsAuthorsInstitutionsContinents,
	] = results.map((result) => {
		const agg = result.group_by;

		return agg.map((item) => ({
			value: item.key,
			label: item.key_display_name,
			count: item.count,
		}));
	});
	// const frenchies = authorshipsFrenchAuthors.map((item) => item.value);
	// const authorshipsAuthors = authorshipsAllAuthors.map((item) => {
 //    if (frenchies.includes(item.value)) {
	// 		return {...item, label: "🇫🇷 " + item.label};
	// 	}
 //    return item;
	// });
	return {
		publicationYear,
		publicationType,
		authorshipsCountries,
		authorshipsAuthors: authorshipsAllAuthors,
		// authorshipsFrenchAuthors,
		authorshipsAuthorsInstitutions,
		primaryTopic,
		// keywords,
		primaryLocationUrl,
		grantsFunder,
		authorshipsAuthorsInstitutionsContinents,
	};
}
