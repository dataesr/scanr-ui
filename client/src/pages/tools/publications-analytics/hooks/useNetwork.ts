import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../../api/networks/search/search"
import useUrl from "./useUrl"
import { NetworkParameters } from "../../../../types/network"

const currentSource = "publications"

const PARAMS: NetworkParameters = {
  maxNodes: 300,
  maxComponents: 5,
  clusters: false,
  filterNode: "",
  sample: false,
}

export default function useNetworks(currentModel: "authors" | "structures") {
  const { currentQuery, filters } = useUrl();
  const parameters = currentModel === "authors"
    ? { ...PARAMS, clusters: true, maxComponents: 10, maxNodes: 1000 }
    : PARAMS


  const { data, error, isFetching } = useQuery({
    queryKey: ["network", "search", currentModel, currentQuery, filters, parameters],
    queryFn: () =>
      networkSearch({
        source: currentSource,
        model: currentModel,
        query: currentQuery,
        parameters: parameters,
        lang: "fr",
        filters,
      }),
  })

  console.log(currentModel, data)


  const values = useMemo(() => {
    return {
      currentQuery,
      filters,
      search: { data, isFetching, error },
    }
  }, [currentQuery, filters, data, isFetching, error])

  return values
}
