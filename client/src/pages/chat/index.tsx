import { FormattedMessage, useIntl, createIntl, RawIntlProvider } from "react-intl"
import { Container, Breadcrumb, Link, Row, Col, SearchBar, Button } from "@dataesr/dsfr-plus"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import Messages from "./components/messages"
import useMessages from "./hooks/useMessages"
import useChat from "./hooks/useChat"

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
  const { messages, addMessage, clearMessages } = useMessages()
  const { data, error, isFetching } = useChat(messages)

  if (error) console.log("chat error", error)

  if (data && messages.length && messages.slice(-1)[0].content != data) {
    addMessage(data, "assistant")
  }

  return (
    <>
      <Container className={"bg-chat"} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              <FormattedMessage id="chat.top.breadcrumb.home" />
            </Link>
            <Link current>{intl.formatMessage({ id: "chat.top.breadcrumb.chat" })}</Link>
          </Breadcrumb>
          <Row gutters className="fr-pb-4w fr-mb-2w">
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={0}
                isLarge
                buttonLabel={intl.formatMessage({ id: "chat.top.main-search-button" })}
                placeholder={intl.formatMessage({ id: "chat.top.main-search-bar" })}
                onSearch={(value) => addMessage(value, "user")}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Messages messages={messages} isFetching={isFetching} />
      <Container className="fr-mt-5w">
        <Button variant="secondary" onClick={() => clearMessages()}>
          {intl.formatMessage({ id: "chat.clear-chat-button" })}
        </Button>
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
