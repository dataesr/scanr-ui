import { Button, Container, Row, Text } from "@dataesr/dsfr-plus"
import { useFormContext } from "./context"

export default function Step3({ onNext }) {
  return (
    <Container>
      <Row horizontalAlign="center">
        <Text size="lead">Any filters ?</Text>
      </Row>
      <Row horizontalAlign="center">
        <Button onClick={onNext}>Next</Button>
      </Row>
    </Container>
  )
}
