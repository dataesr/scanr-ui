import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { getBsoLocals } from "../../../api/bso"

export function GetBsoLocals() {
  const { data } = useSuspenseQuery({
    queryKey: ["bso", "locals"],
    queryFn: () => getBsoLocals(),
  })

  const values = useMemo(() => {
    return data
  }, [data])

  return values
}
