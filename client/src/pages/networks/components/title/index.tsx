import { Container, Title } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useNetworkContext } from "../../context"
import { GetBsoLocals } from "../../hooks/getBsoLocals"

export default function NetworkTitle() {
  const intl = useIntl()
  const {
    options: { currentSource },
    integration: { integrationId, integrationOptions },
  } = useNetworkContext()
  const { showTitle } = integrationOptions

  if (showTitle === false) return null

  const locals = integrationId ? GetBsoLocals() : {}
  const commentNameField = intl.locale === 'en' ? 'commentsNameEN' : 'commentsName'
  const comment: string = integrationId ? integrationId.trim().toLowerCase().split(/[ ,]+/)
    .map((item) => locals?.[item.trim()]?.[commentNameField] ?? `${intl.formatMessage({ id: "networks.header.title.perimeter" })} ${item}`)
    .join(` ${intl.formatMessage({ id: "networks.and" })} `) : ''

  return (
    <Container fluid className="fr-mb-2w">
      {showTitle && (
        <Title as="h4" className="fr-mb-1w">
          {intl.formatMessage(
            { id: "networks.header.title" },
            { source: intl.formatMessage({ id: `networks.source.${currentSource}` }).toLowerCase() },
          )}{" "}
          {comment}
        </Title>
      )}
    </Container>
  )
}
