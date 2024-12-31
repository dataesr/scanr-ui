import { Breadcrumb, Container, Link, Title } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

function StudioBreadcrumb() {
  const intl = useIntl()

  return (
    <Breadcrumb className="fr-mt-0 fr-mb-2w">
      <Link href="/">{intl.formatMessage({ id: "studio.header.breadcrumb.home" })}</Link>
      <Link current>{intl.formatMessage({ id: "studio.header.breadcrumb.current" })}</Link>
    </Breadcrumb>
  )
}

function StudioTitle() {
  const intl = useIntl()

  return (
    <Container fluid className="fr-mb-2w">
      <Title as="h4" className="fr-mb-1w">
        {intl.formatMessage({ id: "studio.header.title" })}
      </Title>
    </Container>
  )
}

export default function StudioHeader() {
  return (
    <Container className="bg-studio fr-mb-1w" fluid>
      <Container className="fr-pt-4w fr-pb-1v">
        <StudioBreadcrumb />
        <StudioTitle />
      </Container>
    </Container>
  )
}
