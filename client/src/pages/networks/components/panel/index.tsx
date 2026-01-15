import { useState } from "react";
import "./styles.scss";
import cn from "classnames";
import { Button, Container } from "@dataesr/dsfr-plus";
import NetworkCard from "../graph/card";
import NetworkClusters from "../clusters";

function PanelButton({
  isOpen,
  onChange,
}: {
  isOpen: boolean;
  onChange: () => void;
}) {
  return (
    <Button
      onClick={onChange}
      className="panel-toggle-button"
      aria-label={isOpen ? "Close analytics panel" : "Open analytics panel"}
    >
      <span className="panel-toggle-button__icon">{isOpen ? "›" : "‹"}</span>
      {!isOpen && <span className="panel-toggle-button__label">Analytics</span>}
    </Button>
  );
}

export default function NetworkPanel() {
  const [openAnalytics, setOpenAnalytics] = useState(false);

  return (
    <Container fluid className="panel-container">
      <Container
        fluid
        className={cn(
          "panel-graph-wrapper",
          `panel-graph-wrapper--${openAnalytics ? "split" : "full"}`
        )}
      >
        <NetworkCard />
      </Container>

      <PanelButton
        isOpen={openAnalytics}
        onChange={() => setOpenAnalytics(!openAnalytics)}
      />

      <Container
        fluid
        className={cn(
          "panel-clusters-wrapper",
          `panel-clusters-wrapper--${openAnalytics ? "open" : "closed"}`
        )}
      >
        {openAnalytics && <NetworkClusters />}
      </Container>
    </Container>
  );
}
