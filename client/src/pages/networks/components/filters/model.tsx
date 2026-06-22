import { Container } from "@dataesr/dsfr-plus"
import AutocompleteFilterNodes from "../parameters/autocomplete-filter-nodes"

export default function ModelFilters() {
  return (
    <Container fluid>
      <AutocompleteFilterNodes />
      <hr className="fr-mt-3w" />
    </Container>
  )
}
