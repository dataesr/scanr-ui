export type ChatRole = "user" | "assistant" | "tool"

export type ChatMessage = {
  role: ChatRole
  content: string
  name?: string
}
export type ChatMessages = Array<ChatMessage>

export type ChatOptions = {
  temperature?: number
  top_p?: number
  max_tokens?: number
  stream?: boolean
  safe_prompt?: boolean
  random_seed?: number
  json_format?: boolean
}

export type ChatCompletionArgs = {
  messages: ChatMessages
  model: "small" | "large"
  options?: ChatOptions
}
