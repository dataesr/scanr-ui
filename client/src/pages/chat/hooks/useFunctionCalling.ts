import { ChatMessages } from "../../../types/chat"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import chatFunctionCalling from "../../../api/chat/function_calling"

export default function useChat(messages: ChatMessages) {
  const { data, error, isFetching } = useQuery({
    queryKey: ["chat", messages],
    queryFn: () => chatFunctionCalling(messages, "small"),
    enabled: Boolean(messages.length && messages?.slice(-1)[0]?.role === "user"),
  })

  const values = useMemo(() => {
    return { data, isFetching, error }
  }, [data, isFetching, error])

  return values
}
