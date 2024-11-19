import { Button, Container, Row, Text } from "@dataesr/dsfr-plus"

export default function Step0({ onNext }) {
  return (
    <Container>
      <Row horizontalAlign="center">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </Row>
      <Row horizontalAlign="center">
        <Button onClick={onNext}>Get Started</Button>
      </Row>
    </Container>
  )
}
