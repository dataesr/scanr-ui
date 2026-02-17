import { Container } from "@dataesr/dsfr-plus";
import NetworksHeader from "../components/header";
import NetworkCard from "../components/graph/card"
import NetworksOptionsBar from "../components/options-bar"
import NetworksOptionsModals from "../components/options-bar/modals"
import NetworkNotice from "../components/notice"
import NetworkPanel from "../components/panel"
import NetworksOptionsFooter from "../components/options-bar/footer"
import { useNetworkContext } from "../context"

export default function NetworksLayout() {
  const {
    integration: { integrationOptions },
  } = useNetworkContext()

  if (integrationOptions.showGraphOnly === true) return <NetworkCard />

  return (
    <Container fluid>
      <NetworksHeader />
      <NetworksOptionsBar />
      <NetworksOptionsModals />
      <Container>
        <NetworkNotice />
        <NetworkPanel />
        <NetworksOptionsFooter />
      </Container>
    </Container>
  )
}
