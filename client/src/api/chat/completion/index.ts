import { ChatMessages, ChatOptions } from "../../../types/chat"
import { MISTRAL_URL, MISTRAL_HEADERS, MISTRAL_MODELS } from "../config"

export default async function chatCompletion(messages: ChatMessages, model: string, options?: ChatOptions): Promise<string> {
  const chatBody = {
    messages: messages,
    model: MISTRAL_MODELS[model],
    temperature: options?.temperature ?? 0.7,
    top_p: options?.top_p ?? 1,
    safe_prompt: options?.safe_prompt ?? false,
    ...(options?.max_tokens && { max_tokens: options.max_tokens }),
    ...(options?.stream && { stream: options.stream }),
    ...(options?.random_seed && { random_seed: options.random_seed }),
    ...(options?.json_format && { response_format: { type: "json_object" } }),
  }
  console.log("chatBody", chatBody)

  const response = await fetch(`${MISTRAL_URL}/chat/completions`, {
    method: "POST",
    headers: MISTRAL_HEADERS,
    body: JSON.stringify(chatBody),
  })
  console.log("chatResponse", response)

  const completion = await response.json()
  const answer: string = completion && completion.choices ? completion.choices[0].message.content : null

  return answer
}
