import { useContext, createContext, useState } from "react"
import { TRENDS_RANKING_SORTS_MAPPING } from "../config/rankingSorts"

const Context = createContext(null)

export function useTrendsRankingContext() {
  return useContext(Context)
}

export function TrendsRankingContext({ children }) {
  const [sort, setSort] = useState<string>(TRENDS_RANKING_SORTS_MAPPING[0].id)
  const [focus, setFocus] = useState<string>("")

  return <Context.Provider value={{ sort, setSort, focus, setFocus }}>{children}</Context.Provider>
}
