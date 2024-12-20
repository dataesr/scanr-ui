import { useContext, createContext, useState } from "react"

const Context = createContext(null)

export function useStudioContext() {
  return useContext(Context)
}

export function StudioContext({ children }) {
  const [view, setView] = useState<string>("")

  return <Context.Provider value={{ view, setView }}>{children}</Context.Provider>
}
