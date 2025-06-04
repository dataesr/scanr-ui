import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../../api/networks/search/search"
import useUrl from "./useUrl"
import { NetworkParameters } from "../../../../types/network"

const currentSource = "publications"

const parameters: NetworkParameters = {
  maxNodes: 100,
  maxComponents: 5,
  clusters: false,
  filterNode: "",
  sample: true,
}

export default function useNetworks(currentModel: "authors" | "structures") {
  const { currentQuery, filters } = useUrl();


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
