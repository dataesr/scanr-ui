import { useIntl } from "react-intl"
import Modal from "../../../../components/modal"
import { Button, Container } from "@dataesr/dsfr-plus"
import PublicationYearFilter from "../../../search/components/publications/filters/years"
import PublicationTypeFilter from "../../../search/components/publications/filters/types"
import PublicationAuthorFilter from "../../../search/components/publications/filters/authors"
import PublicationOrganizationsFilter from "../../../search/components/publications/filters/organizations"
import PublicationCountriesFilter from "../../../search/components/publications/filters/countries"
import PublicationAccessFilter from "../../../search/components/publications/filters/access"
import PublicationFunderFilter from "../../../search/components/publications/filters/funders"
import PublicationTagsFilter from "../../../search/components/publications/filters/tags"
import useUrl from "../../../search/hooks/useUrl"
import NetworksCoElementsFilters from "./networks"

export default function NetworkFiltersPublicationsModal() {
  const intl = useIntl()
  const { clearFilters } = useUrl()
  const id = "networks-options-filters-modal"

  return (
    <>
      <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.filters.modal.publications.title" })}>
        <Container fluid className="fr-my-2w">
          <PublicationYearFilter />
          <hr className="fr-mt-3w" />
          <PublicationTypeFilter />
          <hr className="fr-mt-3w" />
          <PublicationAuthorFilter />
          <hr className="fr-mt-3w" />
          <PublicationOrganizationsFilter />
          <hr className="fr-mt-3w" />
          <PublicationCountriesFilter />
          <hr className="fr-mt-3w" />
          <PublicationAccessFilter />
          <hr className="fr-mt-3w" />
          <PublicationFunderFilter />
          <hr className="fr-mt-3w" />
          <PublicationTagsFilter />
          <hr className="fr-mt-3w" />
          <NetworksCoElementsFilters />
          <hr className="fr-mt-3w" />
        </Container>
        <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            <Button variant="secondary" onClick={() => clearFilters()}>
              {intl.formatMessage({ id: "networks.filters.modal.clear" })}
            </Button>
          </div>
          <Button aria-controls={id}>{intl.formatMessage({ id: "networks.filters.modal.display" })}</Button>
        </div>
      </Modal>
    </>
  )
}
