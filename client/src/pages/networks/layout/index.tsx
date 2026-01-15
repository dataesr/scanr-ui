import { Col, Container, Row } from "@dataesr/dsfr-plus"
import NetworksHeader from "../components/header"
import NetworkCard from "../components/graph/card"
import NetworkClusters from "../components/clusters"
import useIntegration from "../hooks/useIntegration"
import NetworksOptionsBar from "../components/options-bar"
import NetworksOptionsModals from "../components/options-bar/modals"
import NetworkNotice from "../components/notice"
import NetworkCentralityCadran from "../components/cadran"

export default function NetworksLayout() {
  const { integrationOptions } = useIntegration()

  if (integrationOptions.showGraphOnly === true) return <NetworkCard />

  return (
    <Container fluid>
      <NetworksHeader />
      <NetworksOptionsBar />
      <NetworksOptionsModals />
      <Container>
        <NetworkNotice />
        <Row>
          <Col lg={8}>
            <NetworkCard />
          </Col>
          <Col lg={4}>
            <NetworkCentralityCadran />
          </Col>
        </Row>
        <NetworkClusters />
      </Container>
    </Container>
  )
}
