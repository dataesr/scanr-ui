import { Breadcrumb, Container, Link, Title } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import { GetBsoLocals } from "../../../networks/hooks/getBsoLocals"

function TrendsBreadcrumb() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()

  if (integrationOptions.showBreadcrumb === false) return null

  return (
    <Breadcrumb className="fr-mt-0 fr-mb-2w">
      <Link href="/">{intl.formatMessage({ id: "trends.header.breadcrumb.home" })}</Link>
      <Link current>{intl.formatMessage({ id: "trends.header.breadcrumb.analyze" })}</Link>
    </Breadcrumb>
  )
}

function TrendsTitle() {
  const intl = useIntl()
  const { integrationId, integrationOptions } = useIntegration()

  if (integrationOptions.showTitle === false) return null

  const locals = integrationId ? GetBsoLocals() : {}
  const comment: string =
    (intl.locale === "en" ? locals?.[integrationId]?.commentsNameEN : locals?.[integrationId]?.commentsName) ||
    (integrationId ? `${intl.formatMessage({ id: "trends.header.title.perimeter" })} ${integrationId}` : "")

  return (
    <Container fluid className="fr-mb-2w">
      <Title as="h4" className="fr-mb-1w">
        {intl.formatMessage({ id: "trends.header.title" })} {comment}
      </Title>
    </Container>
  )
}

export default function TrendsHeader() {
  const { integrationOptions } = useIntegration()

  if (integrationOptions.showHeader === false) return null

  return (
    <Container className="bg-trends fr-mb-1w" fluid>
      <Container className="fr-pt-4w fr-pb-1v">
        <TrendsBreadcrumb />
        <TrendsTitle />
      </Container>
    </Container>
  )
}
