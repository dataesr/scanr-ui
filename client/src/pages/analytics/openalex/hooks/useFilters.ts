import { useQuery } from "@tanstack/react-query";
import useUrl from "../../hooks/useUrl";
import { fetchOpenFilters } from "../../../../api/openalex/filters";


export default function useFilters() {
  const { currentQuery } = useUrl();

  return useQuery<any, unknown, any>({
    queryKey: ["analytics", "openalex", "filters", currentQuery],
    queryFn: () => fetchOpenFilters({ query: currentQuery }),
  })
}
