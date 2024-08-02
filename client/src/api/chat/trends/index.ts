import { ChatMessages, ChatMessage } from "../../../types/chat"
import chatCompletion from "../completion"
import { searchForTrends } from "../search"
import aggregationsToJSON from "./aggregations"

const trendsPrompt = (query: string, context: string): ChatMessage => ({
  role: "user",
  content: `
  You have JSON data representing publications discussing ${query}.
  It contains the number of publications produced each year and number of publications per authors.
  Your task is to analyze this data and provide a general analysis of the publication rate trend.
  
  Determine whether the publication rate is increasing, decreasing, or stable over time.
  Identify the year with the highest number of publications (the peak year) and the top authors.
  Provide insights into any patterns or anomalies observed in the data.
  
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

  const prompt = trendsPrompt(query, JSON.stringify(json))
  const answer = await chatCompletion([prompt], "cheap")

  return answer
}
