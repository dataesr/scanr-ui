import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { aggregatePublicationsForAnalyticTool } from "../../../../api/publications/aggregate/analytic-tool";
import type { PublicationAggregationsForAnalyticTool } from "../../../../types/publication";
import useUrl from "../../hooks/useUrl";

export default function usePublicationsAnalyticsData() {
	const { currentQuery, filters } = useUrl();

	const { data, isLoading, isError } = useQuery<
		PublicationAggregationsForAnalyticTool,
		unknown,
		PublicationAggregationsForAnalyticTool
	>({
		queryKey: ["analytics-publications-data", currentQuery, filters],
		queryFn: () => aggregatePublicationsForAnalyticTool({ query: currentQuery, filters }),
	});

	const values = useMemo(() => {
		return { data, isLoading, isError };
	}, [data, isLoading, isError]);

	return values;
}
