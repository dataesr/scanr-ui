import { Container } from "@dataesr/dsfr-plus"
import StudioHeader from "../components/header"
import StudioTabs from "../components/tabs"

export default function StudioLayout() {
  return (
    <Container fluid>
      <StudioHeader />
      <StudioTabs />
    </Container>
  )
}
