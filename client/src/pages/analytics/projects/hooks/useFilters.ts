import { useQuery } from "@tanstack/react-query";
import { ProjectAggregations } from "../../../../types/project";
import useUrl from "../../hooks/useUrl";
import { aggregateProjects } from "../../../../api/projects/aggregate";


export default function useFilters() {
  const { currentQuery, filters } = useUrl()

  return useQuery<ProjectAggregations, unknown, ProjectAggregations>({
    queryKey: ["analytics-french-projects-filters", "filters", currentQuery],
    queryFn: () => aggregateProjects({ query: currentQuery, filters }),
  })
}
