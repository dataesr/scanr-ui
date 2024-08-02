import { ChatMessages } from "../../../types/chat"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import chatRAG from "../../../api/chat/rag"

export default function useChat(messages: ChatMessages) {
  const lastUserMessage = messages.filter((message) => message.role === "user").slice(-1)[0]

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["chat", lastUserMessage],
    queryFn: () => chatRAG(lastUserMessage),
    enabled: messages.length > 0,
  })

  const values = useMemo(() => {
    return { data, isFetching, error, refetch }
  }, [data, isFetching, error, refetch])

  return values
}
