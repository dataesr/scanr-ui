import { Button, Container } from "@dataesr/dsfr-plus";
import Modal from "../../../../../components/modal";
import PatentYearFilter from "./years";
import PatentRegionFilter from "./region-switch";
import useFilters from "../../hooks/useFilters";

export default function PatentFilters({ id }: { id: string }) {
  const { isLoading } = useFilters()

  return (
    <>
      <Modal id={id} size="lg" title="Filtrer les résultats">
        <Container fluid className="fr-my-2w">
          <PatentYearFilter />
          <hr className="fr-mt-3w" />
          <PatentRegionFilter />
          <hr className="fr-mt-3w" />
        </Container>
        <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <Button aria-controls={id} disabled={isLoading}>
            Afficher les résultats
          </Button>
        </div>
      </Modal>
    </>
  )
}
