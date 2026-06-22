import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { getBooleanParam } from "../utils"
import { NetworkParameter, NetworkParameters } from "../../../types/network"
import { NETWORK_PARAMETERS } from "../config/parameters"
import { NETWORK_MODELS } from "../config/models"

export function parseStringURL(stringUrl: string | null | undefined) {
  if (!stringUrl) return []
  return JSON.parse(decodeURIComponent(stringUrl))
}

export function stringifyStringURL(obj): string {
  if (!obj) return ""
  if (!Object.keys(obj).length) return ""
  return encodeURIComponent(JSON.stringify(obj))
}

export default function useOptions() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSource: string = searchParams.get("source") || "publications"
  const currentModel: string = searchParams.get("model") || NETWORK_MODELS[currentSource][0].label

  const parameters: NetworkParameters = useMemo(
    () => ({
      maxNodes: Number(searchParams.get("maxNodes") || Number(NETWORK_PARAMETERS.maxNodes.default)),
      maxComponents: Number(searchParams.get("maxComponents") || Number(NETWORK_PARAMETERS.maxComponents.default)),
      clusters: getBooleanParam(searchParams.get("clusters"), Boolean(NETWORK_PARAMETERS.clusters.default)),
      filterNodes: parseStringURL(searchParams.get("filterNodes")) || NETWORK_PARAMETERS.filterNodes.default,
      filterNeighbors: getBooleanParam(searchParams.get("filterNeighbors"), Boolean(NETWORK_PARAMETERS.filterNeighbors.default)),
      sample: getBooleanParam(searchParams.get("sample"), Boolean(NETWORK_PARAMETERS.sample.default)),
    }),
    [searchParams],
  )

  const handleModelChange = useCallback(
    (model: string) => {
      searchParams.set("model", model)
      searchParams.delete("filterNodes")
      searchParams.delete("clusters")
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const handleSourceChange = useCallback(
    (source: string) => {
      searchParams.delete("model")
      searchParams.delete("filters")
      searchParams.delete("clusters")
      searchParams.delete("filterNodes")
      searchParams.set("source", source)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const handleParameterChange = useCallback(
    (parameter: string, value: NetworkParameter) => {
      if (parameter == "filterNodes") searchParams.set(parameter, encodeURIComponent(JSON.stringify(value)))
      else searchParams.set(parameter, String(value))
      if (parameter !== "clusters") searchParams.delete("clusters")
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const resetParameters = useCallback(() => {
    Object.keys(NETWORK_PARAMETERS).forEach((key) => searchParams.delete(key))
    searchParams.delete("clusters")
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  const values = useMemo(() => {
    return {
      currentModel,
      handleModelChange,
      currentSource,
      handleSourceChange,
      parameters,
      handleParameterChange,
      resetParameters,
    }
  }, [
    currentModel,
    handleModelChange,
    currentSource,
    handleSourceChange,
    parameters,
    handleParameterChange,
    resetParameters,
  ])
  return values
}
