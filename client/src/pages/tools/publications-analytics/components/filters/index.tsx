import { Button, Container } from "@dataesr/dsfr-plus";
import Modal from "../../../../../components/modal";
import PublicationFunderFilter from "./funders";
import PublicationTypeFilter from "./types";
import PublicationYearFilter from "./years";
import useFilters from "../../hooks/useFilters";

export default function Filters() {
  const { isLoading } = useFilters()

  return (
    <>
      <Modal id="analytics-filters" size="lg" title="Filtrer les publications">
        <Container fluid className="fr-my-2w">
          <PublicationYearFilter />
          <hr className="fr-mt-3w" />
          <PublicationTypeFilter />
          <hr className="fr-mt-3w" />
          <PublicationFunderFilter />
          <hr className="fr-mt-3w" />
        </Container>
        <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <Button aria-controls="analytics-filters" disabled={isLoading}>
            Afficher les résultats
          </Button>
        </div>
      </Modal>
    </>
  )
}
