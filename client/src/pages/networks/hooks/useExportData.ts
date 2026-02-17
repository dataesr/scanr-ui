import { useCallback, useMemo, useState } from "react"
import { NetworkData } from "../../../types/network"
import * as XLSX from "xlsx"
import useOptions from "./useOptions"
import { useNetworkContext } from "../context"
import { getDefined } from "../utils"

function stringToArrayBuffer(string: string) {
  const buffer = new ArrayBuffer(string.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < string.length; i++) view[i] = string.charCodeAt(i) & 0xff
  return buffer
}

const XSLXFormatter = (network: any) => {
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      network.items.map((item) => {
        const { metadata, ..._item } = item
        return { ..._item, ...getDefined(metadata || {}) }
      }),
    ),
    "Items",
  )
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(network.links), "Links")
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      network.clusters.map((cluster) => {
        const { metadata, ..._cluster } = cluster
        const { documents, domains, documentsByYear, citationsByYear, similarity, metrics, ..._metadata } = metadata || {}
        return { ..._cluster, ...getDefined(_metadata) }
      }),
    ),
    "Clusters",
  )

  const documentsList = network.clusters?.reduce((acc, cluster) => {
    cluster?.metadata?.documents?.forEach((document) => {
      acc = [
        ...acc,
        {
          ...document,
          cluster: cluster.id,
          clusterLabel: cluster.label,
        },
      ]
    })
    return acc
  }, [])
  const domainsList = network.clusters?.reduce((acc, cluster) => {
    Object.entries(cluster?.metadata?.domains || {}).forEach(([domain, count]) => {
      acc = [...acc, { domain, count, cluster: cluster.id, clusterLabel: cluster.label }]
    })
    return acc
  }, [])
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(documentsList), "Documents")
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(domainsList), "Domains")

  const workbookOutput = XLSX.write(workbook, { type: "binary", bookType: "xlsx" })
  return new Blob([stringToArrayBuffer(workbookOutput)], { type: "application/octet-stream" })
}

const JSONFormatter = (network: any) => {
  return new Blob([JSON.stringify(network, null, 2)], { type: "application/json" })
}

const exporter = (format: string) => (format === "xlsx" ? XSLXFormatter : JSONFormatter)

const exportNetwork = (network: NetworkData) => ({
  items: network.items.map((item) => ({
    id: item.id,
    label: item.label || "",
    cluster: item.cluster,
    ...(network.clusters.length && {
      clusterLabel: network.clusters.find((cluster) => cluster.cluster === item.cluster).label,
    }),
    ...(item?.metadata && { metadata: getDefined(item.metadata) }),
    degree: item?.weights?.Degree,
    weight: item?.weights?.Weight,
  })),
  links: network.links,
  clusters: network.clusters.map((cluster) => ({
    id: cluster.cluster,
    label: cluster.label,
    size: cluster.size,
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
})

export default function useExportData() {
  const { currentSource, currentModel } = useOptions()
  const {
    search: { data },
  } = useNetworkContext()
  const [isLoading, setIsLoading] = useState(false)

  const exportFile = useCallback(
    async (format: "json" | "xlsx") => {
      setIsLoading(true)
      const network = exportNetwork(data?.network)
      const blob = exporter(format)(network)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `network.${currentSource}.${currentModel}.${format}`)
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
