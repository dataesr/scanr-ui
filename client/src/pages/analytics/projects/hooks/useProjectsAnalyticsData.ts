import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { aggregateProjectsForAnalyticsTool } from "../../../../api/projects/aggregate/anaytic-tool";
import type { ProjectAggregationsForAnalyticsTool } from "../../../../types/project";
import useUrl from "../../hooks/useUrl";




export default function useProjectsAnalyticsData() {
	const { currentQuery, filters } = useUrl();

	const { data, isLoading, isError } = useQuery<
		ProjectAggregationsForAnalyticsTool,
		unknown,
		ProjectAggregationsForAnalyticsTool
	>({
		queryKey: ["analytics-projects-data", currentQuery, filters],
		queryFn: () => aggregateProjectsForAnalyticsTool({ query: currentQuery, filters }),
	});

	const values = useMemo(() => {
		return { data, isLoading, isError };
	}, [data, isLoading, isError]);

	return values;
}
