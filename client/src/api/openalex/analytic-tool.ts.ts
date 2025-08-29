import { AggregationArgs } from "../../types/commons";

import { getOpenalexUrl } from "./config";

const groupBys = [
	"publication_year",
	"type",
	"authorships.countries",
	"authorships.author.id",
	"authorships.institutions.lineage",
	"primary_topic.id",
	// "keywords.id",
	"primary_location.source.id",
	"grants.funder",
	// "authorships.institutions.continent",
];

export async function fetchOpenAlexAggregations({ query, filters = [] }: AggregationArgs): Promise<any> {
  console.log("fetchOpenAlexAggregations", query, filters)
	const urls = groupBys.map((groupBy) => {
	if (filters.length) {
    /* @ts-expect-error unknown */
    const yearRange: any = filters.find((el: any) => el?.range?.year)?.range?.year
		const [yearMin, yearMax] = [yearRange?.gte, yearRange?.lte]
		const types = filters
      ?.find((el) => el?.terms?.["type.keyword"])
			?.terms["type.keyword"]
			?.map((type: string) => `types/${type}`);

		const typesFilter = types?.length > 0 ? `type:${types.join("|")}` : "";
		const yearsFilter = (yearMin && yearMax) ? `publication_year:${parseInt(yearMin)}-${parseInt(yearMax)}` : "";
		const finalQuery= [query, typesFilter, yearsFilter].filter(Boolean).join(",")
		console.log("finalQuery", finalQuery)
		return getOpenalexUrl(finalQuery, groupBy);
	}
	return getOpenalexUrl(query, groupBy);
	});

	const responses = await Promise.all(urls.map((url) => fetch(url)));
	const results = await Promise.all(responses.map((res) => res.json()));
	const [
		publicationYear,
		publicationType,
		authorshipsCountries,
		authorshipsAllAuthors,
		authorshipsAuthorsInstitutions,
		primaryTopic,
		// keywords,
		primaryLocationUrl,
		grantsFunder,
		// authorshipsAuthorsInstitutionsContinents,
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
	const total = results?.[0]?.meta?.count;
	return {
		total,
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
		// authorshipsAuthorsInstitutionsContinents,
	};
}
