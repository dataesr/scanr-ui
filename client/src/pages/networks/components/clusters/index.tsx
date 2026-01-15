import { useState } from "react";
import { Button, Container } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import cn from "classnames";
import ClustersButton from "./button";
import ContributeButton from "../contribute/button";
import NavigateToSearch from "../navigate-to-search";
import NetworkClustersItems from "./items";
import NetworkAnalytics from "./analytics";
import useIntegration from "../../hooks/useIntegration";
import "./styles.scss";
import NetworkCentralityCadran from "../cadran";

type ClustersTab = "items" | "analytics" | "quadrants";
const clustersTabs: ClustersTab[] = ["items", "analytics", "quadrants"];

export default function NetworkClusters() {
  const intl = useIntl();
  const { integrationId } = useIntegration();
  const [clustersTab, setClustersTab] = useState<ClustersTab>("items");

  const tabCss = (active: boolean) =>
    cn("clusters-tabs__tab", active ? "clusters-tabs__tab--active" : "");

  return (
    <Container
      fluid
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {!integrationId ? (
        <Container
          fluid
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <NavigateToSearch />
          <ClustersButton />
          <ContributeButton />
        </Container>
      ) : (
        <ClustersButton />
      )}

      <Container fluid className="clusters-tabs">
        <Container fluid className="clusters-tabs__nav">
          {clustersTabs.map((tab) => (
            <Button
              size="sm"
              className={tabCss(clustersTab === tab)}
              onClick={() => setClustersTab(tab)}
            >
              {intl.formatMessage({ id: `networks.clusters.tabs.${tab}` })}
            </Button>
          ))}
        </Container>
        <Container className="clusters-tabs__content">
          {clustersTab === "items" && <NetworkClustersItems />}
          {clustersTab === "analytics" && <NetworkAnalytics />}
          {clustersTab === "quadrants" && <NetworkCentralityCadran />}
        </Container>
      </Container>
    </Container>
  );
}
