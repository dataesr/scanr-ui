import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { aggregateAuthors } from "../../../api/authors/aggregate";
import {
  aggregateOrganizations,
  aggregateOrganizationsForHe,
} from "../../../api/organizations/aggregate";
import { aggregatePatents } from "../../../api/patents/aggregate";
import { aggregateProjects } from "../../../api/projects/aggregate";
import { aggregatePublications } from "../../../api/publications/aggregate";
import { AuthorsAggregations } from "../../../types/author";
import { OrganizationAggregations } from "../../../types/organization";
import { PatentAggregations } from "../../../types/patent";
import { ProjectAggregations } from "../../../types/project";
import { PublicationAggregations } from "../../../types/publication";
import { aggregateClinicalTrials } from "../../../api/clinical-trials/aggregate";
import useUrl from "./useUrl";

const API_MAPPING = {
  authors: aggregateAuthors,
  'clinical-trials': aggregateClinicalTrials,
  he: aggregateOrganizationsForHe,
  organizations: aggregateOrganizations,
  patents: aggregatePatents,
  projects: aggregateProjects,
  publications: aggregatePublications,
  trends: aggregatePublications,
}

type AggregationsModel =
  | AuthorsAggregations
  | OrganizationAggregations
  | PatentAggregations
  | ProjectAggregations
  | PublicationAggregations

export default function useAggregateData(type: "analytics" | "filters") {
  const { api, currentQuery, filters } = useUrl()
  const [searchParam] = useSearchParams()
  const networkSource = searchParam.get("source") || "publications"

  const queryFn = api === "networks" ? API_MAPPING[networkSource] : API_MAPPING[api]
  const _api = api === "networks" ? networkSource : api
  const _filters = type === "analytics" ? filters : []

  const { data, isLoading, isError } = useQuery<AggregationsModel, unknown, AggregationsModel>({
    queryKey: [_api, "analytics", currentQuery, _filters],
    queryFn: () => queryFn({ query: currentQuery, filters: _filters }),
  })

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}
