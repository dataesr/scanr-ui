import { Container } from "@dataesr/dsfr-plus";
import NetworksHeader from "../components/header";
import NetworkCard from "../components/graph/card";
import useIntegration from "../hooks/useIntegration";
import NetworksOptionsBar from "../components/options-bar";
import NetworksOptionsModals from "../components/options-bar/modals";
import NetworkNotice from "../components/notice";
import NetworkPanel from "../components/panel";

export default function NetworksLayout() {
  const { integrationOptions } = useIntegration();

  if (integrationOptions.showGraphOnly === true) return <NetworkCard />;

  return (
    <Container fluid>
      <NetworksHeader />
      <NetworksOptionsBar />
      <NetworksOptionsModals />
      <Container>
        <NetworkNotice />
        <NetworkPanel />
      </Container>
    </Container>
  );
}
