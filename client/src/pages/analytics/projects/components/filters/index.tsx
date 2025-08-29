import { Button, Container } from "@dataesr/dsfr-plus";
import Modal from "../../../../../components/modal";
import useFilters from "../../hooks/useFilters";
import ProjectYearFilter from "./years";
import ProjectTypeFilter from "./types";

export default function Filters({ id }: { id: string }) {
  const { isLoading } = useFilters()

  return (
    <>
      <Modal id={id} size="lg" title="Filtrer les publications">
        <Container fluid className="fr-my-2w">
          <ProjectYearFilter />
          <hr className="fr-mt-3w" />
          <ProjectTypeFilter />
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
