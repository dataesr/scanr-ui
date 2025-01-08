import { Container, Row, Col } from "@dataesr/dsfr-plus"
import NetworksHeader from "../components/header"
import NetworkCard from "../components/graph/card"
import ClustersButton from "../components/clusters/button"
import NetworkClusters from "../components/clusters"
import NetworkAnalytics from "../components/clusters/analytics"
import useIntegration from "../hooks/useIntegration"
import NetworksOptionsBar from "../components/options-bar"
import NetworksOptionsModals from "../components/options-bar/modals"
import ContributeButton from "../components/contribute/button"

export default function NetworksLayout() {
  const { integrationOptions } = useIntegration()
  const { showGraphOnly } = integrationOptions

  if (showGraphOnly === true) return <NetworkCard />

  console.log(window.location)

  return (
    <Container fluid>
      <NetworksHeader />
      <NetworksOptionsBar />
      <NetworksOptionsModals />
      <Container>
        <NetworkCard />
        <Container fluid style={{ display: "flex", justifyContent: "space-between" }}>
          <ClustersButton />
          <ContributeButton />
        </Container>
        <Row gutters>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <NetworkClusters />
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <NetworkAnalytics />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
