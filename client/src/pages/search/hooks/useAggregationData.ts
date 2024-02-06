import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { aggregatePublications } from "../../../api/publications/aggregate";
import { aggregateAuthors } from "../../../api/authors/aggregate";
import { aggregateOrganizations } from "../../../api/organizations/aggregate";
import { aggregateProjects } from "../../../api/projects/aggregate";
import { ProjectAggregations } from "../../../types/project";
import { AuthorsAggregations } from "../../../types/author";
import { PublicationAggregations } from "../../../types/publication";
import { OrganizationAggregations } from "../../../types/organization";
import useUrl from "./useUrl";


const API_MAPPING = {
  publications: aggregatePublications,
  authors: aggregateAuthors,
  projects: aggregateProjects,
  organizations: aggregateOrganizations,
}

type AggregationsModel = PublicationAggregations | OrganizationAggregations | ProjectAggregations | AuthorsAggregations;

export default function useAggregateData(type: "analytics" | "filters") {
  const { api, currentQuery, filters } = useUrl();
  const queryFn = API_MAPPING[api]

  const _filters = (type === 'analytics') ? filters : []

  const { data, isLoading, isError } = useQuery<AggregationsModel, unknown, AggregationsModel>({
    queryKey: [api, "analytics", currentQuery, _filters],
    queryFn: () => queryFn({ query: currentQuery, filters: _filters }),
  });

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}