import { NetworkCommunities } from "../../../types/network"

const OVERLAP_THRESHOLD = 0.6
const JACCARD_THRESHOLD = 0.4

function computeSimilarity(sourceGroup: NetworkCommunities, targetGroup: NetworkCommunities): any {
  const results = []
  console.log("group1", sourceGroup)
  console.log("group2", targetGroup)

  sourceGroup.forEach((sourceCluster) => {
    const nodes1 = new Set(sourceCluster.nodes.map((n) => n.id))
    targetGroup.forEach((targetCluster) => {
      const nodes2 = new Set(targetCluster.nodes.map((n) => n.id))
      const intersection = new Set([...nodes1].filter((x) => nodes2.has(x)))
      const union = new Set([...nodes1, ...nodes2])

      // Jaccard similarity
      const similarity = intersection.size / union.size
      // Overlap coefficient
      const coefficient = intersection.size / Math.min(nodes1.size, nodes2.size)

      // TODO: add number of top nodes

      if (similarity > JACCARD_THRESHOLD && coefficient > OVERLAP_THRESHOLD) {
        results.push({
          source_id: sourceCluster.cluster,
          source: sourceCluster,
          target_id: targetCluster.cluster,
          target: targetCluster,
          similarity,
          coefficient,
          intersection: intersection.size,
          union: union.size,
        })
      }
    })
  })
  return results
}

export default function clustersAssignSimilarity(clustersGroups: NetworkCommunities[]) {
  clustersGroups.forEach((clusters, index) => {
    if (index > 0) {
      const sourceGroup = clustersGroups[index - 1]
      const targetGroup = clustersGroups[index]
      const similarities = computeSimilarity(sourceGroup, targetGroup)
      console.log("similarities", similarities)
      clusters.forEach((cluster) => {
        const matchingSimilarity = similarities.find((similarity) => similarity.target_id === cluster.cluster)

        if (matchingSimilarity) {
          console.log("changing colors")
          cluster.similarity = {
            sourceColor: matchingSimilarity.source.color,
            sourceCluster: matchingSimilarity.source.cluster,
            sourceCentrality: matchingSimilarity.source.metrics.centrality,
            sourceDensity: matchingSimilarity.source.metrics.density,
          }
        }
      })
    }
  })
}
