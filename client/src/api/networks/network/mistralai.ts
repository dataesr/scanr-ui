import { NetworkCommunities } from "../../../types/network"

const { VITE_MISTRAL_URL: MISTRAL_URL, VITE_MISTRAL_KEY: MISTRAL_KEY } = import.meta.env
const headers = MISTRAL_KEY ? { Authorization: `Bearer ${MISTRAL_KEY}` } : {}
const postHeaders = { ...headers, "Content-Type": "application/json" }

function cleanMistralLabels(mistralLabels: any): Array<string> {
  if (!mistralLabels) return mistralLabels

  const cleanLabel = (label: any): string => (Array.isArray(label) ? label[0] : label)
  const cleanLabels = Object.values(mistralLabels).map((label) => cleanLabel(label))

  let counts = {}
  const deduplicateLabels = cleanLabels.reduce((acc, label: string) => {
    if (!label) return acc
    if (!counts[label]) {
      counts[label] = 1
      acc.push(label)
    } else {
      counts[label]++
      acc.push(label + " (" + counts[label] + ")")
    }

    return acc
  }, [])

  return deduplicateLabels
}

async function mistralLabelsFromDomains(domains: string): Promise<string> {
  const chatBody = {
    messages: [
      {
        role: "user",
        content: `
        You have been tasked with naming distinct fields of study for several communities of research publications.
        Below are lists of topics and their weights representing each community.
        Your goal is to provide a unique and descriptive name for each field of study that best encapsulates the essence of the topics within that community.
        Each should be unique and as short as possible.
        If the list of topic is empty, output a empty string.
        Output as JSON object with the list number and the single unique generated name.

        ${domains}`,
      },
    ],
    model: "mistral-small-latest",
    temperature: 0.4,
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

export async function mistralAssignClustersLabels(clusters: NetworkCommunities) {
  const prefix = "list"
  const domains = clusters?.reduce((acc, cluster, index) => {
    if (cluster?.metadata?.domains) {
      const topDomains = Object.entries(cluster.metadata.domains)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, 10)
        .map(([domain, count]) => `${domain} (${count})`)
        .join(", ")

      acc = acc + `${prefix}${index + 1} = [${topDomains}], `
    }
    return acc
  }, "") as string

  if (!domains) return clusters

  const mistralLabels = await mistralLabelsFromDomains(domains).then(
    (response) => JSON.parse(response),
    (err) => console.error(err)
  )

  if (mistralLabels && mistralLabels.constructor == Object) {
    const cleanLabels = cleanMistralLabels(mistralLabels)
    clusters.forEach((cluster, index) => {
      cluster.label = cleanLabels[index] ? cleanLabels[index] : cluster.label + " (Unlabelled)"
    })
  }
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