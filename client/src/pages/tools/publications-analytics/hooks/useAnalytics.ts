import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PublicationAggregationsForAnalyticTool } from "../../../../types/publication";
import useUrl from "./useUrl";
import { aggregatePublicationsForAnalyticTool } from "../../../../api/publications/aggregate/analytic-tool";


export default function useAnalytics() {
  const { currentQuery, filters } = useUrl()

  const { data, isLoading, isError } = useQuery<PublicationAggregationsForAnalyticTool, unknown, PublicationAggregationsForAnalyticTool>({
    queryKey: ["publications-analytics-analytics", currentQuery, filters],
    queryFn: () => aggregatePublicationsForAnalyticTool({ query: currentQuery, filters }),
  })

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}
