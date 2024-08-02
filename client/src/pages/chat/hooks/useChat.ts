import { ChatMessages } from "../../../types/chat"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import chatRAG from "../../../api/chat/rag"
import chatFunctionCalling from "../../../api/chat/function_calling"
import chatTrends from "../../../api/chat/trends"
import chatTrendsKeywords from "../../../api/chat/trends_keywords"

const CHAT_FUNCTIONS = {
  trends: chatTrends,
  trends_keywords: chatTrendsKeywords,
  rag: chatRAG,
  function_calling: chatFunctionCalling,
}

export default function useChat(messages: ChatMessages, chatType: string) {
  const userMessages = messages.filter((message) => message.role === "user")
  const queryFn = CHAT_FUNCTIONS?.[chatType]

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["chat", chatType, userMessages],
    queryFn: () => queryFn(messages),
    enabled: userMessages.length > 0,
  })

  const values = useMemo(() => {
    return { data, isFetching, error, refetch }
  }, [data, isFetching, error, refetch])

  return values
}
