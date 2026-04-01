import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import useUrl from "../../hooks/useUrl"
import { NetworkParameters } from "../../../../types/network"
import getNetwork from "../../../../api/networks"

const currentSource = "publications"

const PARAMS: NetworkParameters = {
  maxNodes: 300,
  maxComponents: 5,
  clusters: false,
  filterNode: "",
  sample: false,
  filterFocus: false,
}

export default function useNetworks(currentModel: "authors" | "structures") {
  const { currentQuery, filters } = useUrl()
  const parameters = currentModel === "authors" ? { ...PARAMS, clusters: true, maxComponents: 10, maxNodes: 1000 } : PARAMS

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", "search", currentModel, currentQuery, filters, parameters],
    queryFn: () =>
      getNetwork({
        source: currentSource,
        model: currentModel,
        query: currentQuery,
        parameters: parameters,
        lang: "fr",
        filters,
      }),
  })

  const values = useMemo(() => {
    return {
      currentQuery,
      filters,
      search: { data, isFetching, error },
    }
  }, [currentQuery, filters, data, isFetching, error])

  return values
}
