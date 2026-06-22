import { useCallback, useMemo, useState } from "react"
import { useNetworkContext } from "../context/hook"
import { getDefined } from "../utils"
import * as XLSX from "xlsx"
import { NetworkData } from "../../../types/network"
import useSearchData from "./useSearchData"

function stringToArrayBuffer(string: string) {
  const buffer = new ArrayBuffer(string.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < string.length; i++) view[i] = string.charCodeAt(i) & 0xff
  return buffer
}

const indexToPeriod = (index: number): string => {
  switch (index) {
    case 0:
      return "all_time"
    case 1:
      return "2017_2023"
    case 2:
      return "2020_2026"
    default:
      return String(index)
  }
}

const XSLXFormatter = (clustersGroup: Array<any>) => {
  const workbook = XLSX.utils.book_new()

  const clustersList = clustersGroup.flatMap((clusters, index) =>
    clusters.map((cluster) => {
      const { metadata, similarity, metrics, ..._cluster } = cluster
      const { documents, domains, documentsByYear, citationsByYear, ..._metadata } = metadata || {}
      return { period: indexToPeriod(index), ..._cluster, ...getDefined(_metadata) }
    }),
  )

  const documentsList = clustersGroup.flatMap((clusters, index) =>
    clusters.reduce((acc, cluster) => {
      cluster?.metadata?.documents?.forEach((document) => {
        acc = [
          ...acc,
          {
            period: indexToPeriod(index),
            cluster: cluster.id,
            clusterLabel: cluster.label,
            ...document,
          },
        ]
      })
      return acc
    }, []),
  )

  const domainsList = clustersGroup.flatMap((clusters, index) =>
    clusters.reduce((acc, cluster) => {
      Object.entries(cluster?.metadata?.domains || {}).forEach(([domain, count]) => {
        acc = [...acc, { period: indexToPeriod(index), cluster: cluster.id, clusterLabel: cluster.label, domain, count }]
      })
      return acc
    }, []),
  )

  const similarityMatchesList = clustersGroup.flatMap((clusters, index) =>
    clusters.reduce((acc, cluster) => {
      cluster?.similarity?.matches?.forEach((match) => {
        const { source, ..._match } = match
        const sourceData = clustersGroup[index - 1].find((c) => c.id === source.cluster)
        acc = [
          ...acc,
          {
            type: "match",
            period: indexToPeriod(index),
            cluster: cluster.id,
            clusterLabel: cluster.label,
            clusterSize: cluster.size,
            ClusterDocs: cluster.metadata.documentsCount,
            clusterCore: cluster.core,
            clusterCentrality: cluster.metrics.centrality,
            clusterDensity: cluster.metrics.density,
            sourcePeriod: indexToPeriod(index - 1),
            sourceCluster: source.cluster,
            sourceLabel: source.label,
            sourceSize: sourceData.size,
            sourceDocs: sourceData.metadata.documentsCount,
            sourceCore: sourceData.core,
            sourceCentrality: sourceData.metrics.centrality,
            sourceDensity: sourceData.metrics.density,
            ..._match,
          },
        ]
      })
      return acc
    }, []),
  )
  const similarityCandidatesList = clustersGroup.flatMap((clusters, index) =>
    clusters.reduce((acc, cluster) => {
      cluster?.similarity?.candidates?.forEach((candidate) => {
        const { source, ..._candidate } = candidate
        const sourceData = clustersGroup[index - 1].find((c) => c.id === source.cluster)
        acc = [
          ...acc,
          {
            type: "candidate",
            period: indexToPeriod(index),
            cluster: cluster.id,
            clusterLabel: cluster.label,
            clusterSize: cluster.size,
            ClusterDocs: cluster.metadata.documentsCount,
            clusterCore: cluster.core,
            clusterCentrality: cluster.metrics.centrality,
            clusterDensity: cluster.metrics.density,
            sourcePeriod: indexToPeriod(index - 1),
            sourceCluster: source.cluster,
            sourceLabel: source.label,
            sourceSize: sourceData.size,
            sourceDocs: sourceData.metadata.documentsCount,
            sourceCore: sourceData.core,
            sourceCentrality: sourceData.metrics.centrality,
            sourceDensity: sourceData.metrics.density,
            ..._candidate,
          },
        ]
      })
      return acc
    }, []),
  )
  const similarityList = [...(similarityMatchesList || []), ...(similarityCandidatesList || [])]

  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(clustersList), `Clusters`)
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(documentsList), "Documents")
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(domainsList), "Domains")
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(similarityList), "Similarity")

  const workbookOutput = XLSX.write(workbook, { type: "binary", bookType: "xlsx" })
  return new Blob([stringToArrayBuffer(workbookOutput)], { type: "application/octet-stream" })
}

const JSONFormatter = (network: any) => {
  return new Blob([JSON.stringify(network, null, 2)], { type: "application/json" })
}

const exporter = (format: string) => (format === "xlsx" ? XSLXFormatter : JSONFormatter)

const exportNetwork = (networks: NetworkData[]) =>
  networks.map((network) =>
    network.clusters.map((cluster) => ({
      id: cluster.cluster,
      label: cluster.label,
      size: cluster.size,
      core: cluster.nodes
        .slice(0, 10)
        .map((n) => n.label)
        .join(", "),
      ...(cluster?.metrics && {
        metrics: getDefined(cluster.metrics),
      }),
      ...(cluster?.metadata && {
        metadata: {
          ...getDefined(cluster.metadata),
          ...(cluster.metadata?.documents?.length && {
            documents: cluster.metadata.documents.map((document) => getDefined(document)),
          }),
        },
      }),
      ...(cluster?.similarity && { similarity: getDefined(cluster.similarity) }),
    })),
  )

export function useExportQuadrants() {
  const {
    options: { currentSource, currentModel },
  } = useNetworkContext()
  const {
    search: { data },
  } = useSearchData()

  const [isLoading, setIsLoading] = useState(false)

  const exportFile = useCallback(
    async (format: "json" | "xlsx") => {
      setIsLoading(true)
      const network = exportNetwork(data?.map(({ network }) => network))
      const blob = exporter(format)(network)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `quadrants.${currentSource}.${currentModel}.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      setIsLoading(false)
    },
    [currentModel, data],
  )

  const values = useMemo(() => {
    return { isExporting: isLoading, exportFile }
  }, [isLoading, exportFile])
  return values
}
