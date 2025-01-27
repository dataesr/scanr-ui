import { useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getCitationsTrends, getPublicationsTrends } from "../../../api/trends/publications"
import useUrl from "../../search/hooks/useUrl"
import { MAX_YEAR, MIN_YEAR } from "../config/years"
import { rangeArray } from "../../../utils/helpers"
import useOptions from "./useOptions"
import { TrendsRanking } from "../../../types/trends"

const API_MAPPING = {
  publications: getPublicationsTrends,
  citations: getCitationsTrends,
}

export default function useTrends() {
  const { currentQuery, currentFilters, filters } = useUrl()
  const { currentModel, currentSource, normalized, currentPage } = useOptions()

  const trendsYears = {
    min: Number(currentFilters?.year?.values?.[0]?.value || MIN_YEAR),
    max: Number(currentFilters?.year?.values?.[1]?.value || MAX_YEAR),
  }

  const { data, error, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<TrendsRanking>({
    queryKey: ["trends", currentSource, currentModel, currentQuery, currentPage, filters, normalized],
    queryFn: ({ pageParam }) =>
      API_MAPPING[currentSource]({
        cursor: Number(pageParam) + (currentPage - 1) * 3,
        model: currentModel,
        query: currentQuery,
        years: rangeArray(trendsYears.min, trendsYears.max),
        filters: filters,
        normalized: normalized,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  })

  const values = useMemo(() => {
    return {
      trends: data,
      trendsYears: trendsYears,
      error: error,
      hasNextPage: hasNextPage,
      fetchNextPage: fetchNextPage,
      isFetching: isFetching,
      isFetchingNextPage: isFetchingNextPage,
    }
  }, [data, trendsYears, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, error])

  return values
}
