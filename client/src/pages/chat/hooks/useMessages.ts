import { useState, useCallback, useMemo } from "react"
import { ChatMessage, ChatRole } from "../../../types/chat"

export default function useMessages() {
  const [messages, setMessages] = useState([])

  const addMessage = useCallback(
    (message: string, role: ChatRole) => {
      const newMessage: ChatMessage = { role: role, content: message }
      setMessages([...messages, newMessage])
    },
    [messages]
  )

  const clearMessages = useCallback(() => setMessages([]), [])

  const values = useMemo(() => {
    return {
      messages,
      addMessage,
      clearMessages,
    }
  }, [messages, addMessage, clearMessages])

  return values
}
