import { Container } from "@dataesr/dsfr-plus"
import AuthorAwardsFilter from "../../../search/components/authors/filters/awards"

export default function NetworkFiltersPublicationsAuthors() {

  return (
    <Container fluid>
      <AuthorAwardsFilter filtersParam="nwFilters" />
      <hr className="fr-mt-3w" />
    </Container>
  )
}
