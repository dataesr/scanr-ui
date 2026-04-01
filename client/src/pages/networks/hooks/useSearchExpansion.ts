import { useQuery } from "@tanstack/react-query"
import useUrl from "../../search/hooks/useUrl"
import { useMemo } from "react"
import { mistralAgentCompletion } from "../../../api/networks/_utils/mistralai"

export default function useSearchExpansion(forcedQuery?: string) {
  const { currentQuery } = useUrl()
  const query = forcedQuery || currentQuery

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", "expansion", query],
    queryFn: () =>
      mistralAgentCompletion({
        query: query,
        agentId: "ag:03ee88d7:20241211:extend-search:042576a9",
      }),
    enabled: query?.length > 3,
  })

  const values = useMemo(() => {
    return { expansions: data as Array<string>, isFetching, error }
  }, [data, isFetching, error])

  return values
}
