import { Container } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context"
import NetworksBreadcrumb from "./breadcrumb"
import NetworkTitle from "../title"

export default function NetworksHeader() {
  const {
    integration: { integrationOptions },
  } = useNetworkContext()

  if (integrationOptions?.showHeader === false) return null

  return (
    <Container className="bg-network fr-mb-1w" fluid>
      <Container className="fr-pt-4w fr-pb-1v">
        <NetworksBreadcrumb />
        <NetworkTitle />
      </Container>
    </Container>
  )
}
