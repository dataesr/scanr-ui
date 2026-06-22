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
import { FilterProps } from "../types"

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

export default function useAggregateData(type: "analytics" | "filters", filterProps: FilterProps = {}) {
  const { filterParam, filterIds = [], forceApi, ignoreQuery = false } = filterProps
  const { api, currentQuery, filters } = useUrl(filterParam)
  const [searchParam] = useSearchParams()
  const networkSource = searchParam.get("source") || "publications"
  const filterIdsElastic = { terms: { id: filterIds } }
  if (filterIds.length > 0) {
    filters.push(filterIdsElastic)
  }

  const queryFn = forceApi ? API_MAPPING[forceApi] : api === "networks" ? API_MAPPING[networkSource] : API_MAPPING[api]
  const _api = forceApi ? forceApi : api === "networks" ? networkSource : api
  const _query = ignoreQuery ? "" : currentQuery
  const _filters = type === "analytics" ? filters : filterIds.length > 0 ? [filterIdsElastic] : []

  const { data, isLoading, isError } = useQuery<AggregationsModel, unknown, AggregationsModel>({
    queryKey: [_api, "analytics", _query, _filters],
    queryFn: () => queryFn({ query: _query, filters: _filters }),
  })

  const values = useMemo(() => {
    return { data, isLoading, isError }
  }, [data, isLoading, isError])

  return values
}
