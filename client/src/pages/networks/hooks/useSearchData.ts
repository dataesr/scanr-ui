import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import useUrl from "../../search/hooks/useUrl"
import useIntegration from "./useIntegration"
import useOptions from "./useOptions"
import { NetworkParameters } from "../../../types/network"
import getNetwork from "../../../api/networks"

export default function useSearchData(forceClusters?: boolean) {
  const { currentQuery, filters } = useUrl()
  const { integrationId, integrationLang } = useIntegration()
  const { currentModel, currentSource, parameters } = useOptions()
  const { locale } = useDSFRConfig()
  const lang = integrationId ? integrationLang : locale

  if (forceClusters !== undefined) parameters.clusters = forceClusters

  const currentKey = ["network", "search", currentSource, currentModel, currentQuery, lang, filters, parameters]
  const { data, error, isFetching } = useQuery({
    queryKey: currentKey,
    queryFn: () =>
      getNetwork({
        source: currentSource,
        model: currentModel,
        query: currentQuery,
        lang: lang,
        parameters: parameters,
        integration: integrationId,
        filters,
      }),
    placeholderData: (previousData, previousQuery) => {
      // return previous data if only clusters parameter changed
      const previousKey = previousQuery?.queryKey
      if (previousKey && previousKey.slice(0, 6).every((value, index) => value === currentKey[index])) {
        const previousParameters = previousQuery?.queryKey[7] as NetworkParameters
        if (previousParameters?.clusters !== parameters.clusters) {
          return previousData
        }
      }
      return undefined
    },
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
