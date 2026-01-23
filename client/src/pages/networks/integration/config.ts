import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { NetworksIntegrationOptions } from "../../../types/network"

export const DEFAULT_INTEGRATION: NetworksIntegrationOptions = {
  showGraphOnly: false,
  showHeader: true,
  showBreadcrumb: true,
  showTitle: true,
  showOptionsBar: true,
  showSearchBar: true,
  showSelectModel: true,
  showSelectSource: true,
  showFilters: true,
  showParameters: true,
  showExports: true,
  showClustersAnalytics: true,
  graphHeight: "640px",
}

const url = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/locals.json"

export function getBsoLocals() {
  const { data } = useSuspenseQuery({
    queryKey: ["bso", "locals"],
    queryFn: () => fetch(url).then((response) => (response.ok ? response.json() : {})),
  })

  const values = useMemo(() => {
    return data
  }, [data])

  return values
}