import { ChatMessages, ChatMessage } from "../../../types/chat"
import chatCompletion from "../completion"
import { searchProjectsForTrends, searchPublicationsForTrends } from "../search"
import aggregationsToJSON from "./aggregations"

const trendsPrompt = (query: string, context: string): ChatMessage => ({
  role: "user",
  content: `
  You have JSON data representing french publications discussing ${query}.
  Based on the provided data, answer the question: "Which trends or patterns are emerging ?"

  JSON data:
  ${context}
  `,
})

export default async function chatTrends(messages: ChatMessages): Promise<string> {
  const message = messages.filter((message) => message.role === "user").slice(-1)[0]
  const query = message.content

  const publicationsAggs = await searchPublicationsForTrends({ query: query })
  const projectAggs = await searchProjectsForTrends({ query: query })

  if (!publicationsAggs && !projectAggs) return "no data"

  const json = aggregationsToJSON(publicationsAggs, projectAggs)

  console.log("json", json)

  const prompt = trendsPrompt(query, JSON.stringify(json))
  const answer = await chatCompletion([prompt], "nemo")

  return answer
}
