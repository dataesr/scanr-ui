import { useIntl } from "react-intl"
import { Container, Row, Text, Col, Title, Badge } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context/hook"

export default function Error204() {
  const intl = useIntl()
  const {
    search: { error },
    options: { currentModel },
  } = useNetworkContext()

  const notEnoughError = error?.cause?.["reason"] == "not_enough_nodes"
  const textId = notEnoughError ? "networks.search.error204.text-notenough" : "networks.search.error204.text"

  return (
    <Container
      fluid
      className="fr-pl-5w"
      style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Row>
        <Col md="8">
          <Title as="h1" look="h5">
            {intl.formatMessage({ id: "networks.search.error204.title" })}
          </Title>
          <Text>{intl.formatMessage({ id: textId })}</Text>
          {notEnoughError && (
            <Container fluid>
              <Text className="fr-mb-1w">
                {intl.formatMessage(
                  { id: "networks.search.error204.details-notenough" },
                  { element: intl.formatMessage({ id: `networks.model.${currentModel}` }) },
                )}
              </Text>
              {error?.cause?.["nodes"]?.map((node) => (
                <Badge className="link-no-icon" as="a" target="_blank" href={node.page} color="blue-cumulus">
                  {node.label}
                </Badge>
              ))}
            </Container>
          )}
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
