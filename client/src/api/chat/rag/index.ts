import { ChatMessages, ChatMessage, ChatOptions } from "../../../types/chat"
import chatCompletion from "../completion"
import { searchForRAG } from "../search"

const findKeywordsPrompt = (message: ChatMessage): ChatMessage => ({
  role: message.role,
  content: `
  ### Instructions:
  Generate concise search keywords to retrieve research papers based on a user query.
  Add synonyms and related fields of study that could help answer the question.
  Output as JSON object with a 'keywords' list without explanation.

  ### User query:
  ${message.content}`,
})

const ragPrompt = (query: string, context: string): ChatMessage => ({
  role: "user",
  content: `
  Context information is below.
  ---------------------
  ${context}
  ---------------------
  Given the context information and not prior knowledge, answer the query.
  Query: ${query}
  Answer: `,
})

async function chatFindKeywords(message: ChatMessage, model: string, options?: ChatOptions): Promise<Array<string>> {
  const prompt = findKeywordsPrompt(message)
  const answer = await chatCompletion([prompt], model, options).then((response) => JSON.parse(response))
  const keywords = Array.isArray(answer) ? answer : (answer?.keywords as Array<string>)

  console.log("answer", answer)
  console.log("keywords", keywords)

  return keywords
}

export default async function chatRAG(messages: ChatMessages): Promise<string> {
  const message = messages.filter((message) => message.role === "user").slice(-1)[0]
  const keywords = await chatFindKeywords(message, "cheap", { json_format: true })
  const publications = await searchForRAG({
    query: `("${keywords.join('") OR ("')}")`,
    filters: null,
    size: 5,
  })
  const summaries = publications.map((publication) => publication?.summary?.default)
  const prompt = ragPrompt(message.content, summaries.join("\n"))
  const answer = await chatCompletion([prompt], "cheap")

  console.log("publications", publications)
  console.log("summaries", summaries)

  return answer
}
