import {
	authorsIndex,
	postHeaders,
	publicationsIndex,
} from "../../../config/api";
import type { Author, AuthorsPublications } from "../../../types/author";
import { processYearAggregations } from "../../utils/years";
import { AUTHOR_SOURCE, PUBLICATION_LIGHT_SOURCE } from "../_utils/constants";
import { getCoAuthors, getReviewsBySource, getWikiDomains } from "../_utils/transformers";

async function getAuthorsPublicationsById(
	id: string,
): Promise<AuthorsPublications> {
	const body = {
		_source: PUBLICATION_LIGHT_SOURCE,
		query: { bool: { filter: [{ term: { "authors.person.keyword": id } }] } },
		sort: [{ year: { order: "desc" } }],
		aggs: {
			byYear: {
				terms: {
					field: "year",
					size: 100,
					order: { _key: "asc" },
				},
			},
		},
		size: 2000,
	};
	const res = await fetch(`${publicationsIndex}/_search`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: postHeaders,
	});
	const data = await res.json();
	const publications = data?.hits?.hits?.map(({ _source }) => _source) || [];
	const aggregations = data?.aggregations || {};
	const publicationsCount = data?.hits?.total?.value || 0;
	const reviews = getReviewsBySource(publications);
	const coAuthors = getCoAuthors(publications, id);
	const byYear = processYearAggregations(aggregations?.byYear.buckets);

	return { publications, publicationsCount, coAuthors, reviews, byYear };
}

export async function getAuthorById(id: string): Promise<Author> {
	const queryBody = {
		_source: AUTHOR_SOURCE,
		query: { bool: { filter: [{ term: { "id.keyword": id } }] } },
	};


	const authorQuery = fetch(`${authorsIndex}/_search`, {
		method: "POST",
		body: JSON.stringify(queryBody),
		headers: postHeaders,
	}).then((r) => r.json());

	const publicationsQuery = getAuthorsPublicationsById(id);

	const [author, publications] = await Promise.all([authorQuery, publicationsQuery ]);

	// Handle NOT FOUND error
	if (author?.hits?.hits?.length !== 1) throw new Error("404");

	const { _source, _id } = author.hits.hits[0];
	const wikis = getWikiDomains(_source?.domains)

	return { ..._source, wikis, _id, publications };
}
