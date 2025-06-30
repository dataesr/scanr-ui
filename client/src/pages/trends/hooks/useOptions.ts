import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { getBooleanParam } from "../../networks/utils"
import { useTrendsContext } from "../context"

export default function useOptions() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { setFocus } = useTrendsContext()
  const currentModel = searchParams.get("model") || "entity-fishing"
  const currentSource = searchParams.get("source") || "publications"
  const currentSort = searchParams.get("sort") || "volume-asc"
  const normalized = getBooleanParam(searchParams.get("normalized"), false)
  const currentPage = Number(searchParams.get("page")) || 1

  const handleModelChange = useCallback(
    (model: string) => {
      setFocus("")
      searchParams.set("model", model)
      setSearchParams(searchParams)
    },
    [setFocus, searchParams, setSearchParams]
  )

  const handleSourceChange = useCallback(
    (source: string) => {
      setFocus("")
      searchParams.set("source", source)
      setSearchParams(searchParams)
    },
    [setFocus, searchParams, setSearchParams]
  )

  const handleSortChange = useCallback(
    (sort: string) => {
      setFocus("")
      searchParams.set("page", "1")
      searchParams.set("sort", sort)
      setSearchParams(searchParams)
    },
    [setFocus, searchParams, setSearchParams]
  )

  const setNormalized = useCallback(
    (normalized: boolean) => {
      searchParams.set("normalized", normalized ? "true" : "false")
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setFocus("")
      searchParams.set("page", String(page))
      setSearchParams(searchParams)
    },
    [setFocus, searchParams, setSearchParams]
  )

  const values = useMemo(() => {
    return {
      currentModel,
      handleModelChange,
      currentSource,
      handleSourceChange,
      currentSort,
      handleSortChange,
      normalized,
      setNormalized,
      currentPage,
      handlePageChange,
    }
  }, [
    currentModel,
    handleModelChange,
    currentSource,
    handleSourceChange,
    currentSort,
    handleSortChange,
    normalized,
    setNormalized,
    currentPage,
    handlePageChange,
  ])
  return values
}
