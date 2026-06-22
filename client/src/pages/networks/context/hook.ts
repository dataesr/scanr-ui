import { useContext } from "react"
import { Context } from "./index"

export function useNetworkContext() {
  return useContext(Context)
}
