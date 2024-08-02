import { FormattedMessage, useIntl, createIntl, RawIntlProvider } from "react-intl"
import { Container, Breadcrumb, Link, Row, Col, SearchBar } from "@dataesr/dsfr-plus"
import { useDSFRConfig } from "@dataesr/dsfr-plus"

const modules = import.meta.glob("./locales/*.json", { eager: true, import: "default" })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1]
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc
}, {})

function ChatPage() {
  const intl = useIntl()

  return (
    <>
      <Container className={"bg-chat"} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              <FormattedMessage id="chat.top.breadcrumb.home" />
            </Link>
            <Link current>{intl.formatMessage({ id: "chat.top.breadcrumb.explore" })}</Link>
          </Breadcrumb>
          <Row gutters className="fr-pb-4w fr-mb-2w">
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={0}
                isLarge
                buttonLabel={intl.formatMessage({ id: "chat.top.main-search-bar" })}
                defaultValue={""}
                placeholder={intl.formatMessage({ id: "chat.top.main-search-bar" })}
                onSearch={() => {}}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default function Networks() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })
  return (
    <RawIntlProvider value={intl}>
      <ChatPage />
    </RawIntlProvider>
  )
}
