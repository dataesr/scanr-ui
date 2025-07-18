import { useLocation, useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { TrendsIntegrationOptions } from "../../../types/trends"
import { DEFAULT_INTEGRATION } from "../integration/config"
import { getBooleanParam } from "../../networks/utils"

export default function useIntegration() {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const isIntegration = pathname.split("/").includes("integration") || pathname.split("/").includes("studio")
  const integrationId = isIntegration ? searchParams.get("local") : undefined
  const integrationLang = searchParams.get("lang") || "fr"

  const integrationOptions = useMemo(
    (): TrendsIntegrationOptions =>
      isIntegration
        ? {
            showTrendsOnly: getBooleanParam(searchParams.get("showTrendsOnly"), false),
            showHeader: getBooleanParam(searchParams.get("showHeader")),
            showBreadcrumb: false,
            showTitle: getBooleanParam(searchParams.get("showTitle")),
            showOptionsBar: getBooleanParam(searchParams.get("showOptionsBar")),
            showSearchBar: getBooleanParam(searchParams.get("showSearch")),
            showSelectModel: getBooleanParam(searchParams.get("showSelectModel")),
            showSelectSource: getBooleanParam(searchParams.get("showSelectSource")),
            showSelectSort: getBooleanParam(searchParams.get("showSelectSort")),
            showFilters: getBooleanParam(searchParams.get("showFilters")),
            showParameters: getBooleanParam(searchParams.get("showParameters")),
            showExports: getBooleanParam(searchParams.get("showExports")),
          }
        : DEFAULT_INTEGRATION,
    [isIntegration, searchParams]
  )

  const values = useMemo(() => {
    return { integrationId, integrationLang, integrationOptions }
  }, [integrationId, integrationLang, integrationOptions])
  return values
}
