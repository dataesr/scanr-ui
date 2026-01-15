import { Container } from "@dataesr/dsfr-plus"
import NavigateToSearch from "../navigate-to-search"
import ContributeButton from "../contribute/button"

export default function NetworksOptionsFooter() {
  return (
    <Container fluid className="fr-mt-2w" style={{ display: "flex", justifyContent: "space-between" }}>
      <NavigateToSearch />
      <ContributeButton />
    </Container>
  )
}
