import { Container } from "@dataesr/dsfr-plus"
import NavigateToSearch from "../navigate-to-search"
import ContributeButton from "../contribute/button"
import { useNetworkContext } from "../../context"

export default function NetworksOptionsFooter() {
  const { integration } = useNetworkContext()

  if (integration?.integrationId) return null

  return (
    <Container fluid className="fr-mt-2w" style={{ display: "flex", justifyContent: "space-between" }}>
      <NavigateToSearch />
      <ContributeButton />
    </Container>
  )
}
