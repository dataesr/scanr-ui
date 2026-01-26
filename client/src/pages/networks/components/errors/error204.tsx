import { useIntl } from "react-intl"
import { Container, Row, Text, Col, Title } from "@dataesr/dsfr-plus"

export default function Error204() {
  const intl = useIntl()

  return (
    <Container
      fluid
      style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Row>
        <Col md="8">
          <Title as="h1" look="h5">
            {intl.formatMessage({ id: "networks.search.error204.title" })}
          </Title>
          <Text>{intl.formatMessage({ id: "networks.search.error204.text" })}</Text>
        </Col>
        <Col md="4">
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
