import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchOpenAlexAggregations } from "../../../../api/openalex/analytic-tool.ts";
import useUrl from "../../hooks/useUrl";


export default function useOpenalexAnalyticsData() {
	const { currentQuery, filters } = useUrl();

	const { data, isLoading, isError } = useQuery<
		any,
		unknown,
		any
	>({
		queryKey: ["analytics-openalex-data", currentQuery, filters],
		queryFn: () => fetchOpenAlexAggregations({ query: currentQuery }),
	});

	const values = useMemo(() => {
		return { data, isLoading, isError };
	}, [data, isLoading, isError]);

	return values;
}
