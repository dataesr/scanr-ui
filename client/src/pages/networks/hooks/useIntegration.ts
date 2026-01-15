import { useLocation, useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { NetworksIntegrationOptions } from "../../../types/network"
import { getBooleanParam } from "../utils"
import { DEFAULT_INTEGRATION } from "../integration/config"

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const isIntegration = pathname.split("/").includes("integration") || pathname.split("/").includes("studio")
  const integrationId = isIntegration ? searchParams.get("local") : undefined
  const integrationLang = searchParams.get("lang") || "fr"

  const integrationOptions = useMemo(
    (): NetworksIntegrationOptions =>
      isIntegration
        ? {
            showGraphOnly: getBooleanParam(searchParams.get("showGraphOnly"), false),
            showHeader: getBooleanParam(searchParams.get("showHeader")),
            showBreadcrumb: false,
            showTitle: getBooleanParam(searchParams.get("showTitle")),
            showOptionsBar: getBooleanParam(searchParams.get("showOptionsBar")),
            showSearchBar: getBooleanParam(searchParams.get("showSearchBar")),
            showSelectModel: getBooleanParam(searchParams.get("showSelectModel")),
            showSelectSource: getBooleanParam(searchParams.get("showSelectSource")),
            showFilters: getBooleanParam(searchParams.get("showFilters")),
            showParameters: getBooleanParam(searchParams.get("showParameters")),
            showExports: getBooleanParam(searchParams.get("showExports")),
            showClustersAnalytics: getBooleanParam(searchParams.get("showClustersAnalytics")),
            graphHeight: searchParams.get("graphHeight") || DEFAULT_INTEGRATION.graphHeight,
          }
        : DEFAULT_INTEGRATION,
    [isIntegration, searchParams]
  )

  const values = useMemo(() => {
    return { integrationId, integrationLang, integrationOptions }
  }, [integrationId, integrationLang, integrationOptions])

  return values
}
