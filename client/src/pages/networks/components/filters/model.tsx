import { Container } from "@dataesr/dsfr-plus"
import NetworkAutocompleteNodes from "../autocomplete/nodes"

export default function ModelFilters() {
  return (
    <Container fluid>
      <NetworkAutocompleteNodes />
      <hr className="fr-mt-3w" />
    </Container>
  )
}
