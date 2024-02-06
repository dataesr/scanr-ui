import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"
import { useMemo } from "react"

export default function useTab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "authors"

  const handleTabChange = useCallback(
    (tab) => {
      searchParams.set("tab", tab)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  const values = useMemo(() => {
    return { currentTab, handleTabChange }
  }, [currentTab, handleTabChange])
  return values
}