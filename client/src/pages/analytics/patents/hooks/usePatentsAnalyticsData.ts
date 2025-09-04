import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { aggregatePatentsForAnalyticTool } from "../../../../api/patents/aggregate/analytic-tool";
import type { PatentsAggregationsForAnalyticTool } from "../../../../types/patent";
import useUrl from "../../hooks/useUrl";


export default function usePatentsAnalyticsData() {
	const { currentQuery, filters } = useUrl();

	const { data, isLoading, isError } = useQuery<
		PatentsAggregationsForAnalyticTool,
		unknown,
		PatentsAggregationsForAnalyticTool
	>({
		queryKey: ["analytics-patents-data", currentQuery, filters],
		queryFn: () => aggregatePatentsForAnalyticTool({ query: currentQuery, filters }),
	});

	const values = useMemo(() => {
		return { data, isLoading, isError };
	}, [data, isLoading, isError]);

	return values;
}
