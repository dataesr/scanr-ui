import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { aggregatePublications } from "../../../../api/publications/aggregate";
import { PublicationAggregations } from "../../../../types/publication";
import useUrl from "../../hooks/useUrl";


export default function useFilters() {
  const { currentQuery, filters } = useUrl()

  const { data, isLoading, isError } = useQuery<PublicationAggregations, unknown, PublicationAggregations>({
    queryKey: ["analytics-french-publications-filters", "filters", currentQuery],
    queryFn: () => aggregatePublications({ query: currentQuery, filters }),
  })

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}
