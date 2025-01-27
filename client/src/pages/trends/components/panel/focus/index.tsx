import { Container } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../../context"
import LineChart from "../../line-chart"
import Wikidata from "../../wiki"

export default function TrendsFocus({ item }) {
  const { source } = useTrendsContext()

  return (
    <Container>
      <Wikidata item={item} />
      <LineChart data={item} source={source} />
    </Container>
  )
}
