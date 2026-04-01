const { VITE_MISTRAL_URL: MISTRAL_URL, VITE_MISTRAL_KEY: MISTRAL_KEY } = import.meta.env
const headers = MISTRAL_KEY ? { Authorization: `Bearer ${MISTRAL_KEY}` } : {}
const postHeaders = { ...headers, "Content-Type": "application/json" }

export async function mistralChatCompletion({
  query,
  model = "mistral-small-latest",
  temperature = 0.4,
}: {
  query: string
  model?: string
  temperature?: number
}) {
  const chatBody = {
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    model: model,
    temperature: temperature,
    response_format: { type: "json_object" },
    random_seed: 42,
  }

  const response = await fetch(`${MISTRAL_URL}/chat/completions`, {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify(chatBody),
  })
  const completion = await response.json()
  const answer: string = completion && completion.choices ? completion.choices[0].message.content : null

  return answer
}

export async function mistralAgentCompletion({ query, agentId }: { query: string; agentId: string }): Promise<unknown> {
  const chatBody = {
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    agent_id: agentId,
  }

  const response = await fetch(`${MISTRAL_URL}/agents/completions`, {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify(chatBody),
  })
  const completion = await response.json()
  const answer: string = completion?.choices?.[0]?.message?.content || null

  const json = answer ? JSON.parse(answer) : undefined

  return json
}
