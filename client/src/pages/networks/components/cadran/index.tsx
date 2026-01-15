import { useState } from "react";
import getCadranChartsOptions from "../charts/cadran";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsGraph from "../../../../components/analytics-graph";
import { Container, Select, SelectOption } from "@dataesr/dsfr-plus";

export default function NetworkCentralityCadran() {
  const [selectedCentrality, setSelectedCentrality] = useState(
    "betweennessCentrality"
  );
  const [selectedDensity, setSelectedDensity] = useState("localDensity");
  const { search } = useSearchData();
  const data = search?.data?.network?.items?.map(({ label, metrics }) => ({
    label,
    ...metrics,
  }));
  const height = "300px";
  const centralities = [
    { value: "degreeCentrality", label: "Degree centrality" },
    { value: "betweennessCentrality", label: "Betweenness centrality" },
    { value: "closenessCentrality", label: "Closeness centrality" },
    { value: "eigenvectorCentrality", label: "Eigenvector centrality" },
    { value: "pagerank", label: "PageRank" },
  ];
  const densities = [
    { value: "localDensity", label: "Local density" },
    { value: "clusteringCoefficient", label: "Clustering coefficient" },
  ];

  console.log("c_data", data);

  const centralityOptions = (centrality: string, density: string) =>
    getCadranChartsOptions({
      data: data,
      y: density,
      x: centrality,
      title_yaxis: densities.find((d) => d.value === density)?.label,
      title_xaxis: centralities.find((c) => c.value === centrality)?.label,
      height: height,
    });

  return (
    <Container fluid className="fr-ml-2w" style={{ height: height }}>
      <Select
        buttonLabel="Centrality"
        onSelectionChange={(value) => setSelectedCentrality(String(value))}
        defaultSelectedKey={selectedCentrality}
      >
        {centralities.map((centrality) => (
          <SelectOption key={centrality.value}>{centrality.label}</SelectOption>
        ))}
      </Select>
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
  );
}
