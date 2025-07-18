import { useContext, createContext, useState } from "react"

const Context = createContext(null)

export function useTrendsContext() {
  return useContext(Context)
}

export function TrendsContext({ children }) {
  const [focus, setFocus] = useState<string>("")
  const [includes, setIncludes] = useState<string>("")
  return <Context.Provider value={{ focus, setFocus, includes, setIncludes }}>{children}</Context.Provider>
}
