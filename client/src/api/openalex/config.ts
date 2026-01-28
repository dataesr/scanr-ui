const VITE_OPENALEX_URL = import.meta.env.VITE_OPENALEX_URL;

export const OPENALEX_URL = VITE_OPENALEX_URL || '/openalex';

export const getOpenalexUrl = (query: string, groupBy: string) =>
	`${OPENALEX_URL}/works?page=1&filter=title_and_abstract.search:${encodeURIComponent(query)}&group_by=${groupBy}`;
