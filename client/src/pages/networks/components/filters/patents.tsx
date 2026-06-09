import { Container } from "@dataesr/dsfr-plus"
import PatentYearFilter from "../../../search/components/patents/filters/years"
import PatentRegionFilter from "../../../search/components/patents/filters/region-switch"
import PatentOrganizationsFilter from "../../../search/components/patents/filters/organizations"

export default function NetworkFiltersPatents() {
  return (
    <Container fluid>
      <Container fluid className="fr-my-2w">
        <PatentYearFilter />
        <hr className="fr-mt-3w" />
        <PatentOrganizationsFilter />
      </Container>
      <Container fluid className="fr-my-2w">
        <hr className="fr-mt-3w" />
        <PatentRegionFilter />
      </Container>
      <hr className="fr-mt-3w" />
    </Container>
  )
}
