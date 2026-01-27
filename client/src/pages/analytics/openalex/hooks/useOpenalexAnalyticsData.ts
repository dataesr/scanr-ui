import { useQuery } from "@tanstack/react-query";
import { fetchOpenAlexAggregations } from "../../../../api/openalex/analytic-tool.ts";
import useUrl from "../../hooks/useUrl";


export default function useOpenalexAnalyticsData() {
	const { currentQuery, filters } = useUrl();

	return useQuery<
		any,
		unknown,
		any
	>({
		queryKey: ["analytics", "openalex", "data", currentQuery, filters],
		queryFn: () => fetchOpenAlexAggregations({ query: currentQuery, filters }),
	});
}
