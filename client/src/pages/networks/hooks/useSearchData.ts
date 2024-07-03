import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import useUrl from "../../search/hooks/useUrl"
import useTab from "./useTab"
import { networkSearch } from "../../../api/networks/search/search"
import useIntegration from "./useIntegration"

export default function useSearchData(networkTab: string, computeClusters: boolean) {
  const { currentQuery, filters } = useUrl()
  const { integrationId, integrationLang } = useIntegration()
  const { currentTab } = useTab()
  const { locale } = useDSFRConfig()

  const lang = integrationId ? integrationLang : locale

  const { data, error, isFetching } = useQuery({
    queryKey: ["network", networkTab, currentQuery, filters, computeClusters, lang],
    queryFn: () =>
      networkSearch({
        model: networkTab,
        query: currentQuery,
        options: { computeClusters: computeClusters, lang: lang },
        filters,
      }),
    enabled: Boolean(currentQuery && networkTab === currentTab),
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
