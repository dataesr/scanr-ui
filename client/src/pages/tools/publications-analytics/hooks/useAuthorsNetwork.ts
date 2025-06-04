import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { networkSearch } from "../../../../api/networks/search/search"
import useUrl from "./useUrl"
import { NetworkParameters } from "../../../../types/network"

const currentModel = "authors"
const currentSource = "publications"

const parameters: NetworkParameters = {
  maxNodes: 300,
  maxComponents: 5,
  clusters: false,
  filterNode: "",
  sample: true,
}

export default function useAuthorsNetworks() {
  const { currentQuery, filters } = useUrl();
  console.log(currentQuery, filters)


  const { data, error, isFetching } = useQuery({
    queryKey: ["network", "search", currentQuery, filters, parameters],
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


  const values = useMemo(() => {
    return {
      currentQuery,
      filters,
      search: { data, isFetching, error },
    }
  }, [currentQuery, filters, data, isFetching, error])

  return values
}
