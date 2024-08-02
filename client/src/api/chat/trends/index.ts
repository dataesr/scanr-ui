import { ChatMessages, ChatMessage } from "../../../types/chat"
import chatCompletion from "../completion"
import { searchForTrends } from "../search"
import aggregationsToJSON from "./aggregations"

const trendsPrompt = (query: string, context: string): ChatMessage => ({
  role: "user",
  content: `
  You have JSON data representing publications discussing ${query}.
  For each year the data contains the five most relevant publications abstract.
  Give a general analysis of the scientific trends emerging from the abstracts.
  The analysis should not exceed 200 words.

  JSON data:
  ${context}
  `,
})

export default async function chatTrends(messages: ChatMessages): Promise<string> {
  const message = messages.filter((message) => message.role === "user").slice(-1)[0]
  const query = message.content

  const aggregations = await searchForTrends({ query: query })
  if (!aggregations) return "no data"

  const json = aggregationsToJSON(aggregations)

  console.log("aggregations", aggregations)
  console.log("data", json)

  const prompt = trendsPrompt(query, JSON.stringify(json.summaries))
  const answer = await chatCompletion([prompt], "cheap")

  return answer
}
