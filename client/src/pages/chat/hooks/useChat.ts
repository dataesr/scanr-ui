import { ChatMessages } from "../../../types/chat"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import chatRAG from "../../../api/chat/rag"

export default function useChat(messages: ChatMessages) {
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["chat", messages[0]],
    queryFn: () => chatRAG(messages[0]),
    enabled: messages.length > 0,
  })

  const values = useMemo(() => {
    return { data, isFetching, error, refetch }
  }, [data, isFetching, error, refetch])

  return values
}
