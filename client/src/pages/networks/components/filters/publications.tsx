import { Container } from "@dataesr/dsfr-plus"
import PublicationYearFilter from "../../../search/components/publications/filters/years"
import PublicationTypeFilter from "../../../search/components/publications/filters/types"
import PublicationAuthorFilter from "../../../search/components/publications/filters/authors"
import PublicationOrganizationsFilter from "../../../search/components/publications/filters/organizations"
import PublicationCountriesFilter from "../../../search/components/publications/filters/countries"
import PublicationAccessFilter from "../../../search/components/publications/filters/access"
import PublicationFunderFilter from "../../../search/components/publications/filters/funders"
import PublicationTagsFilter from "../../../search/components/publications/filters/tags"
import PublicationAuthorsAwardsFilter from "../../../search/components/publications/filters/awards"
import PublicationVariationsFilter from "../../../search/components/publications/filters/variations"

export default function NetworkFiltersPublications() {
  return (
    <Container fluid>
      <PublicationYearFilter />
      <hr className="fr-mt-3w" />
      <PublicationTypeFilter />
      <hr className="fr-mt-3w" />
      <PublicationAuthorFilter />
      <hr className="fr-mt-3w" />
      <PublicationAuthorsAwardsFilter />
      <hr className="fr-mt-3w" />
      <PublicationOrganizationsFilter />
      <hr className="fr-mt-3w" />
      <PublicationCountriesFilter />
      <hr className="fr-mt-3w" />
      <PublicationAccessFilter />
      <hr className="fr-mt-3w" />
      <PublicationFunderFilter />
      <hr className="fr-mt-3w" />
      <PublicationVariationsFilter />
      <hr className="fr-mt-3w" />
      <PublicationTagsFilter />
      <hr className="fr-mt-3w" />
    </Container>
  )
}
