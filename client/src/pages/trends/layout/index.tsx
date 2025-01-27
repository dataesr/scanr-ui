import { Container } from "@dataesr/dsfr-plus"
import TrendsHeader from "../components/header"
import TrendsRanking from "../components/ranking"
import TrendsOptionsBar from "../components/options-bar"
import TrendsOptionsModals from "../components/options-bar/modals"
import TrendsInfo from "../components/info"
import useIntegration from "../hooks/useIntegration"

export default function TrendsLayout() {
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showTrendsOnly) return <TrendsRanking />

  return (
    <Container fluid>
      <TrendsHeader />
      <TrendsOptionsBar />
      <TrendsOptionsModals />
      <TrendsInfo />
      <TrendsRanking />
    </Container>
  )
}
