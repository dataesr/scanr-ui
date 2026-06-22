import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import useUrl from "../../search/hooks/useUrl"
import useIntegration from "./useIntegration"
import useOptions from "./useOptions"
import { getMultipleNetworks } from "../../../api/networks"
import { NetworkParameters } from "../../../types/network"

export default function useSearchData(forceClusters?: boolean) {
  const { currentQuery, filters } = useUrl()
  const { filters: nfilters } = useUrl("nfilters")
  const { integrationId, integrationLang } = useIntegration()
  const { currentModel, currentSource, parameters } = useOptions()
  const { locale } = useDSFRConfig()
  const lang = integrationId ? integrationLang : locale

  if (forceClusters !== undefined) parameters.clusters = forceClusters

  const currentKey = ["network", "search", currentSource, currentModel, currentQuery, lang, filters, nfilters, parameters]
  const { data, error, isFetching } = useQuery({
    queryKey: currentKey,
    queryFn: () =>
      getMultipleNetworks({
        source: currentSource,
        model: currentModel,
        query: currentQuery,
        lang: lang,
        parameters: parameters,
        integration: integrationId,
        filters,
        nfilters,
      }),
    placeholderData: (previousData, previousQuery) => {
      // return previous data if only clusters changed
      const currentParameters = currentKey[8] as NetworkParameters
      if (
        previousQuery?.queryKey &&
        previousQuery.queryKey.slice(0, 7).every((value, index) => value === currentKey[index]) &&
        previousQuery[8]?.clusters !== currentParameters?.clusters
      ) {
        return previousData
      }
      return undefined
    },
  })

  const values = useMemo(() => {
    return {
      currentQuery,
      filters,
      nfilters,
      search: { data, isFetching, error },
    }
  }, [currentQuery, filters, nfilters, data, isFetching, error])

  return values
}
