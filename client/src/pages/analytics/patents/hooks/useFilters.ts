import { useQuery } from "@tanstack/react-query";
import { PatentAggregations } from "../../../../types/patent";
import useUrl from "../../hooks/useUrl";
import { aggregatePatents } from "../../../../api/patents/aggregate";


export default function useFilters() {
  const { currentQuery, filters } = useUrl()

  return useQuery<PatentAggregations, unknown, PatentAggregations>({
    queryKey: ["analytics-french-patents-filters", "filters", currentQuery],
    queryFn: () => aggregatePatents({ query: currentQuery, filters }),
  })
}
