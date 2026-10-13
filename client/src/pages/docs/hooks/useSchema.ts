import { useQuery } from "@tanstack/react-query"
import { getSchema } from "../../../api/schemas"
import { useMemo } from "react"

export default function useSchema(index: string) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["elastic", "get", "schema", index],
    queryFn: () => getSchema(index),
    enabled: !!index,
  })

  const value = useMemo(() => ({ data, isFetching, isError, error }), [data, isFetching, isError, error])
  return value
}
