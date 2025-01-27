import { Container } from "@dataesr/dsfr-plus"
import TrendsRankingHeader from "../header"
import BaseSkeleton from "../../../../../components/skeleton/base-skeleton"

export default function TrendsRankingSkeleton() {
  return (
    <Container fluid>
      <TrendsRankingHeader />
      <hr />
      <BaseSkeleton height="500px" />
    </Container>
  )
}
