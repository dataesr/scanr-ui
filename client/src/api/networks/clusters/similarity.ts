import { NetworkCommunities, NetworkCommunitySimilarity } from "../../../types/network"

function matchSimilarity(overlap: number, jaccard: number, core: number): boolean {
  // Strong continuation
  if (overlap >= 0.6 && jaccard >= 0.4) return true
  // Expension (growth / shrink with low jaccard)
  if (overlap >= 0.7) return true
  // Core persistence
  if (overlap >= 0.4 && core >= 0.5) return true
  return false
}

function computeSimilarity(
  sourceGroup: NetworkCommunities,
  targetGroup: NetworkCommunities,
): {
  matches: Record<number, Array<NetworkCommunitySimilarity>>
  candidates: Record<number, Array<NetworkCommunitySimilarity>>
} {
  const matches = {}
  const candidates = {}

  targetGroup.forEach((targetCluster) => {
    const nodes2 = new Set(targetCluster.nodes.map((n) => n.id))
    const nodes2top10 = new Set(targetCluster.nodes.slice(0, 10).map((n) => n.id))
    sourceGroup.forEach((sourceCluster) => {
      const nodes1 = new Set(sourceCluster.nodes.map((n) => n.id))
      const nodes1top10 = new Set(sourceCluster.nodes.slice(0, 10).map((n) => n.id))

      const intersection = new Set([...nodes1].filter((x) => nodes2.has(x)))
      const union = new Set([...nodes1, ...nodes2])

      if (intersection.size === 0) return

      // Jaccard similarity
      const jaccard = intersection.size / union.size
      // Overlap coefficient
      const overlap = intersection.size / Math.min(nodes1.size, nodes2.size)
      // Core overlap between top nodes
      const core = new Set([...nodes1top10].filter((x) => nodes2top10.has(x))).size / 10

      if (matchSimilarity(overlap, jaccard, core)) {
        matches[targetCluster.cluster] = [
          ...(matches?.[targetCluster.cluster] || []),
          {
            source: sourceCluster,
            jaccard,
            overlap,
            core,
            intersection: intersection.size,
            union: union.size,
          },
        ]
      } else if (overlap >= 0.3) {
        candidates[targetCluster.cluster] = [
          ...(candidates?.[targetCluster.cluster] || []),
          {
            source: sourceCluster,
            jaccard,
            overlap,
            core,
            intersection: intersection.size,
            union: union.size,
          },
        ]
      }
    })
  })
  console.log("targetClusters", targetGroup)
  console.log("matches", matches)
  console.log("candidates", candidates)
  return { matches, candidates }
}

export default function clustersAssignSimilarity(clustersGroups: NetworkCommunities[]) {
  clustersGroups.forEach((clusters, index) => {
    if (index > 1) {
      // skip first group (general) and second (first time range)
      const sourceGroup = clustersGroups[index - 1]
      const targetGroup = clustersGroups[index]
      const { matches, candidates } = computeSimilarity(sourceGroup, targetGroup)
      clusters.forEach((cluster) => {
        const clusterMatches = matches?.[cluster.cluster]
        const clusterCandidates = candidates?.[cluster.cluster]

        cluster.similarity = {
          matches: clusterMatches,
          candidates: clusterCandidates,
        }
      })
    }
  })
}
