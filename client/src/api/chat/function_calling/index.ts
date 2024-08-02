import { ChatMessages } from "../../../types/chat"
import chatCompletion from "../completion"
import { MISTRAL_URL, MISTRAL_HEADERS, MISTRAL_MODELS } from "../config"
import { TOOLS_MAPPING, TOOLS_CONFIG } from "./tools"

export default async function chatFunctionCalling(messages: ChatMessages): Promise<string> {
  const model = "small"
  const chatBody = {
    messages: messages,
    model: MISTRAL_MODELS[model],
    tool_choice: "auto",
    tools: TOOLS_CONFIG,
  }

  console.log("api_messages", messages)

  const response = await fetch(`${MISTRAL_URL}/chat/completions`, {
    method: "POST",
    headers: MISTRAL_HEADERS,
    body: JSON.stringify(chatBody),
  })
  const completion = await response.json()
  console.log("completion", completion)

  let answer: string = null

  if (completion && completion.choices) {
    const message = completion.choices[0].message
    const content = message.content
    const tool_calls = message.tool_calls

    if (tool_calls) {
      const tool_call = completion.choices[0].message.tool_calls[0]
      console.log("tool_call", tool_call)

      const result = await TOOLS_MAPPING[tool_call.function.name](JSON.parse(tool_call.function.arguments))
      console.log("result", result)

      if (result) {
        const tool_answer = { role: "tool", name: tool_call.function.name, content: JSON.stringify(result) }
        const tool_messages = [...messages, message, tool_answer]
        answer = await chatCompletion(tool_messages, "small")
      }
    }

    if (content) answer = content
  }

  console.log("answer", answer)
  return answer
}
