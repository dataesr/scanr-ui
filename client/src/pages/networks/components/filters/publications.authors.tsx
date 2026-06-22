import { Container } from "@dataesr/dsfr-plus"
import AuthorAwardsFilter from "../../../search/components/authors/filters/awards"
import AuthorsAffiliationsFilter from "../../../search/components/authors/filters/affiliations"

export default function NetworkFiltersPublicationsAuthors() {
  return (
    <Container fluid>
      <AuthorsAffiliationsFilter filtersParam="nwFilters" />
      <hr className="fr-mt-3w" />
      <AuthorAwardsFilter filtersParam="nwFilters" />
      <hr className="fr-mt-3w" />
    </Container>
  )
}
