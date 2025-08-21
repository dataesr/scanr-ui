import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useUrl from "../../hooks/useUrl";
import { fetchOpenYearFilters } from "../../../../api/openalex/filters";


export default function useFilters() {
  const { currentQuery } = useUrl();

  const { data, isLoading, isError } = useQuery<any, unknown, any>({
    queryKey: ["analytics-openalex-openalex-filters", "filters", currentQuery],
    queryFn: () => fetchOpenYearFilters({ query: currentQuery }),
  })

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}
