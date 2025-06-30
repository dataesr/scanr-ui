import { Container, Row } from "@dataesr/dsfr-plus"
import TrendsSearchBarButton from "../search-bar/button"
import TrendsSelectModelButton from "../select-model/button"
import TrendsSelectSourceButton from "../select-source/button"
import TrendsFiltersButton from "../filters/button"
import TrendsParametersButton from "../parameters/button"
import useIntegration from "../../hooks/useIntegration"
import TrendsSelectSortButton from "../select-sort/button"

export default function TrendsOptionsBar() {
  const { integrationOptions } = useIntegration()

  if (integrationOptions.showOptionsBar === false) return null

  return (
    <Container className="fr-mb-2w">
      <Row style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
          <TrendsSearchBarButton />
          <TrendsSelectModelButton />
          <TrendsSelectSourceButton />
        </Container>
        <Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
          <TrendsSelectSortButton />
          <TrendsFiltersButton />
          <TrendsParametersButton />
        </Container>
      </Row>
    </Container>
  )
}
