import { useContext, createContext, useState, useMemo, useEffect, ReactNode } from "react"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import useSearchData from "../hooks/useSearchData"
import useOptions from "../hooks/useOptions"
import useIntegration from "../hooks/useIntegration"
import { Network, NetworkParameter, NetworkParameters, NetworksIntegrationOptions } from "../../../types/network"

type NetworkContextType = {
  key: string
  search: {
    data: Network
    isFetching: boolean
    error: Error
  }
  currentQuery: string
  filters: Record<string, unknown>[]
  options: {
    currentModel: string
    currentSource: string
    parameters: NetworkParameters
    handleModelChange: (model: string) => void
    handleSourceChange: (source: string) => void
    handleParameterChange: (parameter: string, value: NetworkParameter) => void
    resetParameters: () => void
    focusItem: string
    setFocusItem: (id: string) => void
  }
  integration: {
    integrationId: string
    integrationLang: string
    integrationOptions: NetworksIntegrationOptions
  }
}

const Context = createContext<NetworkContextType>(null)

export function useNetworkContext() {
  return useContext(Context)
}

export function NetworkContext({ children }: { children: ReactNode }) {
  const { search, currentQuery, filters } = useSearchData()
  const options = useOptions()
  const integration = useIntegration()
  const { locale: lang } = useDSFRConfig()
  const theme = document.documentElement.getAttribute("data-fr-theme")
  const [focusItem, setFocusItem] = useState("")
  const [key, setKey] = useState("")

  useEffect(() => {
    if (!search.isFetching && search.data) {
      setKey(
        JSON.stringify({
          currentQuery,
          filters,
          currentModel: options.currentModel,
          currentSource: options.currentSource,
          ...options.parameters,
          lang,
          theme,
          focusItem,
        }),
      )
    }
  }, [
    currentQuery,
    filters,
    search.isFetching,
    search.data,
    options.currentModel,
    options.currentSource,
    options.parameters,
    lang,
    theme,
    focusItem,
  ])

  const value = useMemo(
    () => ({
      key,
      search,
      currentQuery,
      filters,
      options: { ...options, focusItem, setFocusItem },
      integration,
    }),
    [search, key, currentQuery, filters, options, focusItem, integration],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
