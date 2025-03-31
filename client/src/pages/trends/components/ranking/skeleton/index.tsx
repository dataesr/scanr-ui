import { Container } from "@dataesr/dsfr-plus"
import BaseSkeleton from "../../../../../components/skeleton/base-skeleton"
import TrendsTableHeader from "../header"

export default function TrendsTableSkeleton() {
  return (
    <Container>
      <Container className="fr-card">
        <table>
          <TrendsTableHeader />
        </table>
        <BaseSkeleton height="500px" />
      </Container>
    </Container>
  )
}
