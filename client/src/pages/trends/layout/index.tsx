import { Container } from "@dataesr/dsfr-plus"
import TrendsHeader from "../components/header"
import TrendsOptionsBar from "../components/options-bar"
import TrendsOptionsModals from "../components/options-bar/modals"
import TrendsInfo from "../components/info"
import useIntegration from "../hooks/useIntegration"
import TrendsTable from "../components/ranking"

export default function TrendsLayout() {
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showTrendsOnly) return <TrendsTable />

  return (
    <Container fluid>
      <TrendsHeader />
      <TrendsOptionsBar />
      <TrendsOptionsModals />
      <TrendsInfo />
      <TrendsTable />
    </Container>
  )
}
