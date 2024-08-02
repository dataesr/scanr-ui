import { ChatMessage } from "../../../types/chat"
import { NetworkCommunities } from "../../../types/network"
import chatCompletion from "../../chat/completion"

const domainsToMessage = (domains: string): ChatMessage => ({
  role: "user",
  content: `
  You have been tasked with naming distinct fields of study for several communities of research publications.
  Below are lists of topics representing each community.
  Your goal is to provide a unique and descriptive name for each field of study that best encapsulates the essence of the topics within that community.
  Each name should be unique and as short as possible.
  Output as JSON object with the list number and the single generated name.

  ${domains}`,
})

export async function aiLabeledClusters(clusters: NetworkCommunities): Promise<NetworkCommunities> {
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

  const mistralMessages = [domainsToMessage(domains)]
  const mistralOptions = { temperature: 0.3, random_seed: 42, json_format: true }
  const mistralLabels = await chatCompletion(mistralMessages, "small", mistralOptions).then(
    (response) => JSON.parse(response),
    (err) => console.error(err)
  )

  if (!mistralLabels || mistralLabels.constructor != Object) {
    return clusters
  }

  Object.entries(mistralLabels).forEach((entries, index) => {
    const value = entries[1]
    clusters[index].label = Array.isArray(value) ? value[0] : value
  })

  return clusters
}
