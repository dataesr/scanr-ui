import { useState } from "react"
import getQuadrantChartsOptions from "../charts/quadran"
import useSearchData from "../../hooks/useSearchData"
import AnalyticsGraph from "../../../../components/analytics-graph"
import { Container, Select, SelectOption, Text, Link } from "@dataesr/dsfr-plus"
import { NetworkCommunities, NetworkItems } from "../../../../types/network"
import { isInProduction } from "../../../../utils/helpers"
import useOptions from "../../hooks/useOptions"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"

function NetworkNodesQuadrants({ nodes }: { nodes: NetworkItems }) {
  const [selectedCentrality, setSelectedCentrality] = useState("degreeCentrality")
  const [selectedDensity, setSelectedDensity] = useState("localDensity")
  if (!nodes) return null
  const data = nodes.map(({ label, metrics }) => ({
    label,
    ...metrics,
  }))
  const centralities = [
    { value: "degreeCentrality", label: "Degree centrality" },
    { value: "betweennessCentrality", label: "Betweenness centrality" },
    { value: "closenessCentrality", label: "Closeness centrality" },
    { value: "eigenvectorCentrality", label: "Eigenvector centrality" },
    { value: "pagerank", label: "PageRank" },
  ]
  const densities = [
    { value: "localDensity", label: "Local density" },
    { value: "clusteringCoefficient", label: "Clustering coefficient" },
  ]

  const centralityOptions = (centrality: string, density: string) =>
    getQuadrantChartsOptions({
      data: data,
      y: density,
      x: centrality,
      title_yaxis: densities.find((d) => d.value === density)?.label,
      title_xaxis: centralities.find((c) => c.value === centrality)?.label,
    })

  return (
    <Container fluid>
      <Text size="lead">Nodes quadrants</Text>
      <Text size="sm" className="fr-mb-1w">
        Centrality
      </Text>
      <Select onSelectionChange={(value) => setSelectedCentrality(String(value))} defaultSelectedKey={selectedCentrality}>
        {centralities.map((centrality) => (
          <SelectOption key={centrality.value}>{centrality.label}</SelectOption>
        ))}
      </Select>
      <Text size="sm" className="fr-mb-1w">
        Density
      </Text>
      <Select
        buttonLabel="Density"
        onSelectionChange={(value) => setSelectedDensity(String(value))}
        defaultSelectedKey={selectedDensity}
      >
        {densities.map((density) => (
          <SelectOption key={density.value}>{density.label}</SelectOption>
        ))}
      </Select>
      {data && (
        <AnalyticsGraph
          title="Nodes importance"
          description="Nodes degree vs centrality"
          options={centralityOptions(selectedCentrality, selectedDensity)}
        />
      )}
    </Container>
  )
}

function NetworkClustersQuadrants({ clusters }: { clusters: NetworkCommunities }) {
  const { currentModel } = useOptions()

  if (!clusters) return null
  const data = clusters?.map(({ label, color, metrics }) => ({
    label,
    color,
    ...metrics,
  }))
  const quadrantOptions = getQuadrantChartsOptions({
    data: data,
    y: "density",
    x: "centrality",
    title_yaxis: "Density",
    title_xaxis: "Centrality",
    themesName: currentModel.toLowerCase(),
    useColorFromData: true,
  })

  return (
    <Container fluid>
      {data && (
        <AnalyticsGraph
          title="Communities quadrants"
          description="Quadrants of the communities strategic diagram"
          options={quadrantOptions}
        />
      )}
    </Container>
  )
}
export default function NetworkQuadrants() {
  const { search } = useSearchData()

  if (!search?.data && search?.isFetching) return <BaseSkeleton width="100%" height="30rem" className="fr-my-1v" />

  return (
    <Container fluid style={{ width: "100%" }}>
      <NetworkClustersQuadrants clusters={search?.data?.network?.clusters} />
      {!isInProduction() && <NetworkNodesQuadrants nodes={search?.data?.network?.items} />}
      <Text className="fr-mt-1w fr-mb-3w fr-message fr-message--info" size="xs">
        {`For more information about the strategic quadrants see the `}&nbsp;
        <Link href="/about/FAQ?question=q63">{"FAQ"}</Link>
      </Text>
    </Container>
  )
}
