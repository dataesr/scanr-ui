import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PublicationAggregationsForAnalyticTool } from "../../../../types/publication";
import useUrl from "./useUrl";
import { aggregatePublicationsForAnalyticTool } from "../../../../api/publications/aggregate/analytic-tool";
import { aggregatePatentsForAnalyticTool } from "../../../../api/patents/aggregate/analytic-tool";
import { PatentsAggregationsForAnalyticTool } from "../../../../types/patent";
import { ProjectAggregationsForAnalyticsTool } from "../../../../types/project";
import { aggregateProjectsForAnalyticsTool } from "../../../../api/projects/aggregate/anaytic-tool";

export type AnalyticsData = {
  publications: PublicationAggregationsForAnalyticTool;
  patents: PatentsAggregationsForAnalyticTool;
  projects: ProjectAggregationsForAnalyticsTool;
};

async function fetchAnalytics({ query, filters }) {
  const publicationsQuery = aggregatePublicationsForAnalyticTool({ query, filters, minAuthorsPublications: 5 });
  const patentsQuery = aggregatePatentsForAnalyticTool({ query });
  const projectsQuery = aggregateProjectsForAnalyticsTool({ query });
  const [publications, patents, projects] = await Promise.all([publicationsQuery, patentsQuery, projectsQuery]);
  return { publications, patents, projects };
}



export default function useAnalytics() {
  const { currentQuery, filters } = useUrl()

  const { data, isLoading, isError } = useQuery<AnalyticsData, unknown, AnalyticsData>({
    queryKey: ["publications-analytics-analytics", currentQuery, filters],
    queryFn: () => fetchAnalytics({ query: currentQuery, filters }),
  })

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}
