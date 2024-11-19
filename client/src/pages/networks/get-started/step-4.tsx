import { Container, Row, Text } from "@dataesr/dsfr-plus"
import { useFormContext } from "./context"

export default function Step4() {
  const { query, tab } = useFormContext()

  return (
    <Container>
      <Text size="lead">Networks page</Text>
      <Row horizontalAlign="center">
        <Text size="lead">query: {query}</Text>
      </Row>
      <Row horizontalAlign="center">
        <Text size="lead">tab: {tab}</Text>
      </Row>
    </Container>
  )
}
