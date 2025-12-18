import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPublications } from "../../../../api/publications/search";

import {
  InfiniteResponse,
  InfiniteResult,
  ObjectModel,
} from "../../../../types/commons";
import useUrl from "../../hooks/useUrl";

export default function useList() {
  const { currentQuery, filters } = useUrl();
  const {
    data,
    error,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    InfiniteResponse<ObjectModel>,
    unknown,
    InfiniteResult<ObjectModel>
  >({
    queryKey: ["publications-analytics-tool", "list", currentQuery, filters],
    queryFn: ({ pageParam }) =>
      searchPublications({ cursor: pageParam, query: currentQuery, filters }),
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length === 10 ? lastPage.cursor : undefined,
    initialPageParam: undefined,
    select: (data) => ({
      total: data.pages[0]?.total || 0,
      results: data.pages.flatMap((page) => page.data),
    }),
  });

  const values = useMemo(() => {
    return {
      total: data?.total,
      search: {
        data: data?.results,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetching,
      },
    };
  }, [data, error, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching]);
  return values;
}
