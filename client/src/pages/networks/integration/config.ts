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

const urlBsoLocals = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/locals.json"
const urlOpenAlex = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/openalex.json"

export function getBsoLocals() {
  const { data: dataBsoLocals } = useSuspenseQuery({
    queryKey: ["bso", "locals"],
    queryFn: () => fetch(urlBsoLocals).then((response) => (response.ok ? response.json() : {})),
  })

  const { data: dataOpenAlex } = useSuspenseQuery({
    queryKey: ["bso", "openalex"],
    queryFn: () => fetch(urlOpenAlex).then((response) => (response.ok ? response.json() : {})),
  })

  const values = useMemo(() => {
    return { ...dataOpenAlex, ...dataBsoLocals }
  }, [dataBsoLocals, dataOpenAlex])

  return values
}