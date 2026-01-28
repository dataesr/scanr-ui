import { Container, Row } from "@dataesr/dsfr-plus"
import NetworkExportsButton from "../exports/button"
import NetworkSearchBarButton from "../search-bar/button"
import NetworkSelectModelButton from "../select-model/button"
import NetworkSelectSourceButton from "../select-source/button"
import NetworkFiltersButton from "../filters/button"
import NetworkParametersButton from "../parameters/button"
import { useNetworkContext } from "../../context"

export default function NetworksOptionsBar() {
  const {
    integration: { integrationOptions },
  } = useNetworkContext()

  if (integrationOptions.showOptionsBar === false) return null

  return (
    <Container className="fr-mb-2w">
      <Row style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
          <NetworkSearchBarButton />
          <NetworkSelectModelButton />
          <NetworkSelectSourceButton />
        </Container>
        <Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
          <NetworkFiltersButton />
          <NetworkParametersButton />
          <NetworkExportsButton />
        </Container>
      </Row>
    </Container>
  )
}
