import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { aggregatePublications } from "../../../api/publications/aggregate";
import { aggregateAuthors } from "../../../api/authors/aggregate";
import {
  aggregateOrganizations,
  aggregateOrganizationsForHe,
} from "../../../api/organizations/aggregate";
import { aggregateProjects } from "../../../api/projects/aggregate";
import { ProjectAggregations } from "../../../types/project";
import { AuthorsAggregations } from "../../../types/author";
import { PublicationAggregations } from "../../../types/publication";
import { OrganizationAggregations } from "../../../types/organization";
import useUrl from "./useUrl";
import { aggregatePatents } from "../../../api/patents/aggregate";
import { PatentAggregations } from "../../../types/patent";
import { useSearchParams } from "react-router-dom"
import { aggregatePublicationsForAnalyticTool } from "../../../api/publications/aggregate/analytic-tool";

const API_MAPPING = {
  publications: aggregatePublications,
  authors: aggregateAuthors,
  projects: aggregateProjects,
  organizations: aggregateOrganizations,
  he: aggregateOrganizationsForHe,
  publicationsanalytictool: aggregatePublicationsForAnalyticTool,
  patents: aggregatePatents,
  trends: aggregatePublications,
}

type AggregationsModel =
  | PublicationAggregations
  | OrganizationAggregations
  | ProjectAggregations
  | AuthorsAggregations
  | PatentAggregations

export default function useAggregateData(type: "analytics" | "filters") {
  const { api, currentQuery, filters } = useUrl()
  const [searchParam] = useSearchParams()
  const networkSource = searchParam.get("source") || "publications"

  const queryFn = api === "networks" ? API_MAPPING[networkSource] : API_MAPPING[api]

  const _filters = type === "analytics" ? filters : []

  const { data, isLoading, isError } = useQuery<AggregationsModel, unknown, AggregationsModel>({
    queryKey: [api, "analytics", currentQuery, _filters],
    queryFn: () => queryFn({ query: currentQuery, filters: _filters }),
  })

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}
