import { NetworkCommunities } from "../../../types/network"
import { mistralChatCompletion } from "../_utils/mistralai"

function cleanAILabels(mistralLabels: any): Array<string> {
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

export default async function clustersAssignAILabels(clusters: NetworkCommunities) {
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

  const query = `
        You have been tasked with naming distinct fields of study for several communities of research publications.
        Below are lists of topics and their weights representing each community.
        Your goal is to provide a unique and descriptive name for each field of study that best encapsulates the essence of the topics within that community.
        Each should be unique and as short as possible.
        If the list of topic is empty, output a empty string.
        Output as JSON object with the list number and the single unique generated name.

        ${domains}`

  const mistralLabels = await mistralChatCompletion({ query }).then(
    (response) => JSON.parse(response),
    (err) => console.error(err),
  )

  if (mistralLabels && mistralLabels.constructor == Object) {
    const cleanLabels = cleanAILabels(mistralLabels)
    clusters.forEach((cluster, index) => {
      cluster.label = cleanLabels[index] ? cleanLabels[index] : cluster.label + " (Unlabelled)"
    })
  }
}
