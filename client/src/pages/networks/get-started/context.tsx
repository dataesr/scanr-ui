import { useContext, createContext, useState } from "react"

const Context = createContext(null)

export function useFormContext() {
  return useContext(Context)
}

export function FormContext({ children }) {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("")

  return <Context.Provider value={{ query, setQuery, tab, setTab }}>{children}</Context.Provider>
}
