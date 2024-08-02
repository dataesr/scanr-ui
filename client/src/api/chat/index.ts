import { ChatMessages, ChatOptions } from "../../types/chat"

const { VITE_MISTRAL_URL: MISTRAL_URL, VITE_MISTRAL_KEY: MISTRAL_KEY } = import.meta.env
const headers = MISTRAL_KEY ? { Authorization: `Bearer ${MISTRAL_KEY}` } : {}
const postHeaders = { ...headers, "Content-Type": "application/json" }

const models = { small: "mistral-small-latest", large: "mistral-large-latest" }

export default async function chatCompletion(messages: ChatMessages, model: string, options?: ChatOptions): Promise<string> {
  const chatBody = {
    messages: messages,
    model: models[model],
    temperature: options?.temperature ?? 0.7,
    top_p: options?.top_p ?? 1,
    safe_prompt: options?.safe_prompt ?? false,
    ...(options?.max_tokens && { max_tokens: options.max_tokens }),
    ...(options?.stream && { max_tokens: options.stream }),
    ...(options?.random_seed && { max_tokens: options.random_seed }),
  }

  console.log("chatBody", chatBody)

  const response = await fetch(`${MISTRAL_URL}/chat/completions`, {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify(chatBody),
  })
  const completion = await response.json()
  const answer: string = completion && completion.choices ? completion.choices[0].message.content : null

  return answer
}
