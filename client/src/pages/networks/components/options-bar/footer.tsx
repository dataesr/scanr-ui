import { Container } from "@dataesr/dsfr-plus"
import NavigateToSearch from "../navigate-to-search"
import ContributeButton from "../contribute/button"
import useIntegration from "../../hooks/useIntegration"

export default function NetworksOptionsFooter() {
  const { integrationId } = useIntegration()

  if (integrationId) return null

  return (
    <Container fluid className="fr-mt-2w" style={{ display: "flex", justifyContent: "space-between" }}>
      <NavigateToSearch />
      <ContributeButton />
    </Container>
  )
}
