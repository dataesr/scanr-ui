import type { Publication } from "../../../types/publication";

type DomainsDoc = {
  type: string,
  label: {
    default: string
  },
  count: number
}

export function getWikiDomains(domains: DomainsDoc[], slice: number = 30) {
	if (!domains) return [];

	const wikiData = domains
		.filter((el) => el.type === "wikidata")

	const counts = new Map();

  wikiData.forEach((item) => {
			const label = item.label?.default?.toLowerCase();
			if (label) if (label) counts.set(label, (counts.get(label) || 0) + 1);
		})

  return Array.from(counts.entries())
		.map(([title, count]) => ({ value: title, label: title, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, slice);
}

export function getReviewsBySource(publications: Publication[]) {
	const counts = new Map();

	publications.forEach((pub) => {
		const title = pub?.source?.title;
		if (title) counts.set(title, (counts.get(title) || 0) + 1);
	});

	return Array.from(counts.entries())
		.map(([title, count]) => ({ value: title, label: title, count }))
		.sort((a, b) => b.count - a.count);
}

export function getCoAuthors(publications: Publication[], authorId: string) {
	const authorData = new Map();

	publications
		.flatMap((pub) => pub.authors || [])
		.filter((author) => author.person && author.person !== authorId)
		.forEach((author) => {
			const count = authorData.get(author.person)?.count || 0;
			authorData.set(author.person, {
				value: author.person,
				label: author.fullName,
				count: count + 1,
			});
		});

	return Array.from(authorData.values()).sort((a, b) => b.count - a.count);
}
