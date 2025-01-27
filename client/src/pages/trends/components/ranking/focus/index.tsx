import { Container } from "@dataesr/dsfr-plus"
import LineChart from "../../line-chart"
import Wikidata from "../../wiki"

export default function TrendsRankingFocus({ item }) {
  const source = "publications"

  return (
    <Container>
      <Wikidata item={item} />
      <LineChart data={item} source={source} />
    </Container>
  )
}
