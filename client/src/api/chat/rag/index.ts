import { ChatMessage, ChatOptions } from "../../../types/chat"
import chatCompletion from "../completion"
import { searchForRAG } from "../search"

const findKeywordsPrompt = (message: ChatMessage): ChatMessage => ({
  role: message.role,
  content: `
  ### Instructions:
  Generate search keywords to retrieve research papers based on a user query.
  Output as JSON object without explanation.

  ### User query:
  ${message.content}`,
})

const ragPrompt = (query: string, content: string): ChatMessage => ({
  role: "user",
  content: `
  ### Instructions:
  Given the context information and not prior knowledge, answer the query.

  ### Query:
  ${query} 
  
  ### Context:
  ${content}`,
})

async function chatFindKeywords(message: ChatMessage, model: string, options?: ChatOptions): Promise<Array<string>> {
  const prompt = findKeywordsPrompt(message)
  const answer = await chatCompletion([prompt], model, options).then((response) => JSON.parse(response))
  const keywords = Array.isArray(answer) ? answer : (answer?.keywords as Array<string>)

  console.log("answer", answer)
  console.log("keywords", keywords)

  return keywords
}

export default async function chatRAG(message: ChatMessage): Promise<string> {
  const keywords = await chatFindKeywords(message, "cheap", { json_format: true })
  const publications = await searchForRAG({
    query: `("${keywords.join('") OR ("')}")`,
    filters: null,
    size: 10,
  })
  const summaries = publications.map((publication) => publication.summary.default)
  const prompt = ragPrompt(message.content, summaries.join("\n"))
  const answer = await chatCompletion([prompt], "cheap")

  console.log("keywords", keywords)
  console.log("publications", publications)
  console.log("summaries", summaries)
  console.log("prompt", prompt)

  return answer
}
