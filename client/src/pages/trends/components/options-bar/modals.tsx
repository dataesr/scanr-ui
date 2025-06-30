import { Container } from "@dataesr/dsfr-plus"
import TrendsParametersModal from "../parameters/modal"
import TrendsSearchBarModal from "../search-bar/modal"
import TrendsSelectSourceModal from "../select-source/modal"
import TrendsSelectModelModal from "../select-model/modal"
import TrendsFiltersModal from "../filters/modal"
import TrendsSelectSortModal from "../select-sort/modal"

export default function TrendsOptionsModals() {
  return (
    <Container fluid>
      <TrendsSearchBarModal />
      <TrendsSelectModelModal />
      <TrendsSelectSourceModal />
      <TrendsSelectSortModal />
      <TrendsFiltersModal />
      <TrendsParametersModal />
    </Container>
  )
}
