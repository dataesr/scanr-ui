import { useQueryClient } from "@tanstack/react-query"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import getNetwork from "../../../api/networks"
import useOptions from "./useOptions"

export default function useSearchDataPrefetch() {
  const queryClient = useQueryClient()
  const { parameters } = useOptions()
  const { locale } = useDSFRConfig()

  queryClient.prefetchQuery({
    queryKey: ["network", "search", "publications", "domains", "", [], locale, parameters],
    queryFn: () =>
      getNetwork({
        source: "publications",
        model: "domains",
        query: "",
        lang: locale,
        parameters: parameters,
        filters: [],
        integration: "",
      }),
  })
}
