import { Container, Row, Text, Col, Title } from "@dataesr/dsfr-plus"

export default function Error204() {
  return (
    <Container>
      <Row>
        <Col offsetMd="2">
          <Title as="h1" look="h5">
            No data
          </Title>
          <Text>Cette recherche ne retourne aucune donnée.</Text>
        </Col>
        <Col>
          <svg className="fr-artwork" aria-hidden="true" viewBox="0 0 80 80" width="100px" height="auto">
            <use className="fr-artwork-decorative" href="/artwork/pictograms/system/warning.svg#artwork-decorative" />
            <use className="fr-artwork-minor" href="/artwork/pictograms/system/warning.svg#artwork-minor" />
            <use className="fr-artwork-major" href="/artwork/pictograms/system/warning.svg#artwork-major" />
          </svg>
        </Col>
      </Row>
    </Container>
  )
}
