import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import { networkSearch } from "../../../api/networks/search/search"
import useUrl from "../../search/hooks/useUrl"
import useIntegration from "./useIntegration"
import useOptions from "./useOptions"

export default function useSearchData(forceClusters?: boolean) {
  const { currentQuery, filters } = useUrl()
  const { integrationId, integrationLang } = useIntegration()
  const { currentModel, currentSource, parameters } = useOptions()
  const { locale } = useDSFRConfig()
  const lang = integrationId ? integrationLang : locale

  if (forceClusters !== undefined) parameters.clusters = forceClusters

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", "search", currentSource, currentModel, currentQuery, filters, lang, parameters],
    queryFn: () =>
      networkSearch({
        source: currentSource,
        model: currentModel,
        query: currentQuery,
        lang: lang,
        parameters: parameters,
        integration: integrationId,
        filters,
      }),
    placeholderData: (previousData) => previousData,
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
