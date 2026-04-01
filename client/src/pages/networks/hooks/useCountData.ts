import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkCount } from "../../../api/networks/search"
import useUrl from "../../search/hooks/useUrl"
import useOptions from "./useOptions"

export default function useCountData() {
  const { currentQuery, filters } = useUrl()
  const { currentModel, currentSource } = useOptions()

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", "count", currentSource, currentModel, currentQuery, filters],
    queryFn: () =>
      networkCount({
        source: currentSource,
        model: currentModel,
        query: currentQuery,
        filters,
      }),
  })

  const values = useMemo(
    () => ({
      count: data,
      isFetching,
      error,
    }),
    [data, isFetching, error]
  )

  return values
}
