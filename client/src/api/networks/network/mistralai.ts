import { NetworkCommunities } from "../../../types/network"

const { VITE_MISTRAL_URL: MISTRAL_URL, VITE_MISTRAL_KEY: MISTRAL_KEY } = import.meta.env
const headers = MISTRAL_KEY ? { Authorization: `Bearer ${MISTRAL_KEY}` } : {}
const postHeaders = { ...headers, "Content-Type": "application/json" }

async function mistralLabelsFromDomains(domains: string): Promise<string> {
  const chatBody = {
    messages: [
      {
        role: "user",
        content: `
        You have been tasked with naming distinct fields of study for several communities of research publications.
        Below are lists of topics and their weights representing each community.
        Your goal is to provide a unique and descriptive name for each field of study that best encapsulates the essence of the topics within that community.
        Each name should be unique and as short as possible.
        Output as JSON object with the list number and the single generated name.

        ${domains}`,
      },
    ],
    model: "open-mistral-7b",
    temperature: 0.3,
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

export async function openAiLabeledClusters(clusters: NetworkCommunities): Promise<NetworkCommunities> {
  const prefix = "list"
  const domains = clusters?.reduce((acc, cluster, index) => {
    if (cluster?.domains) {
      const topDomains = Object.entries(cluster.domains)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, 10)
        .map(([domain, count]) => `${domain} (${count})`)
        .join(", ")

      acc = acc + `${prefix}${index + 1} = [${topDomains}], `
    }
    return acc
  }, "") as string

  if (!domains) return clusters

  const mistral_labels = await mistralLabelsFromDomains(domains).then(
    (response) => JSON.parse(response),
    (err) => console.error(err)
  )
  if (!mistral_labels || mistral_labels.constructor != Object) {
    return clusters
  }

  Object.entries(mistral_labels).forEach((entries, index) => {
    const value = entries[1]
    clusters[index].label = Array.isArray(value) ? value[0] : value
  })

  return clusters
}
