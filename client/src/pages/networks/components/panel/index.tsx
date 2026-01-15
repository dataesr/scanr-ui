import { useState } from "react";
import "./styles.scss";
import cn from "classnames";
import { Button, Container } from "@dataesr/dsfr-plus"
import NetworkClusters from "../clusters"
import NetworkGraph from "../graph"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"

function PanelButton({ isOpen, onChange }: { isOpen: boolean; onChange: () => void }) {
  const intl = useIntl()

  return (
    <Button
      onClick={onChange}
      className="panel-toggle-button"
      aria-label={isOpen ? "Close analytics panel" : "Open analytics panel"}
    >
      <span className="panel-toggle-button__icon">{isOpen ? "›" : "‹"}</span>
      {!isOpen && <span className="panel-toggle-button__label">{intl.formatMessage({ id: "networks.panel.button" })}</span>}
    </Button>
  )
}

export default function NetworkPanel() {
  const [openAnalytics, setOpenAnalytics] = useState(false)
  const { integrationOptions } = useIntegration()

  return (
    <Container fluid className="panel-container">
      <Container fluid className={cn("panel-graph-wrapper", `panel-graph-wrapper--${openAnalytics ? "split" : "full"}`)}>
        <NetworkGraph />
      </Container>
      {integrationOptions.showClustersAnalytics && (
        <>
          <PanelButton isOpen={openAnalytics} onChange={() => setOpenAnalytics(!openAnalytics)} />
          <Container
            fluid
            className={cn("panel-clusters-wrapper", `panel-clusters-wrapper--${openAnalytics ? "split" : "closed"}`)}
          >
            {openAnalytics && <NetworkClusters />}
          </Container>
        </>
      )}
    </Container>
  )
}
