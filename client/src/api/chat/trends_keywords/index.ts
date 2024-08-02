import { ChatMessages, ChatMessage } from "../../../types/chat"
import chatCompletion from "../completion"
import { searchPublicationsForKeywords } from "../search"

const aggregationsToJSON = (aggs) =>
  aggs.years.buckets.map((year) => {
    const domains = year.domains.buckets.reduce((acc, domain) => {
      const key = domain.key.split("###").map((s) => s.toLowerCase())
      const label = key[1]
      if (key[0][0] === "q") {
        acc[label] = (acc?.[label] || 0) + domain.doc_count
      }
      return acc
    }, {})
    return { year: year.key, topics: domains }
  })

const trendsPrompt = (query: string, context: string): ChatMessage => ({
  role: "user",
  content: `
  ### Instructions:
  You have JSON data representing the main topics and their occurence from french publications discussing ${query}.
  Generate a abstractive analysis of the trends or patterns within the french publications based on the topics.
  Provide interpretations or justifications drawing from your own knowledge.

  ### JSON data:
  ${context}
  `,
})

export default async function chatTrendsKeywords(messages: ChatMessages): Promise<string> {
  const message = messages.filter((message) => message.role === "user").slice(-1)[0]
  const query = message.content

  const aggs = await searchPublicationsForKeywords({ query: query })
  const json = aggregationsToJSON(aggs)

  const prompt = trendsPrompt(query, JSON.stringify(json))
  const answer = await chatCompletion([prompt], "cheap", { top_p: 0.1 })

  return answer
}
