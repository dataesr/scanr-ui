import { useState } from "react";
import {
  useDSFRConfig,
  Breadcrumb,
  Link,
  Col,
  Container,
  Row,
  SideMenu,
  SideMenuItem,
  Title,
  Text,
} from "@dataesr/dsfr-plus"
import { useSearchParams } from "react-router-dom"

import { RawIntlProvider, createIntl } from "react-intl"
import { questions } from "./questions"

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
})
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1]
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc
}, {})

export default function FAQ() {
  const { locale } = useDSFRConfig()
  const [searchParams, setSearchParams] = useSearchParams()
  const questionIdFromParams = searchParams.get("question")
  const [selectedQuestion, setSelectedQuestion] = useState(questionIdFromParams)

  const intl = createIntl({ locale, messages: messages[locale] })
  if (!messages) return null

  const groupedQuestions = questions.reduce((grouped, question) => {
    const groupKey = question.groupkey
    if (!grouped[groupKey]) {
      grouped[groupKey] = []
    }
    grouped[groupKey].push(question)
    return grouped
  }, {})

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId)
    setSearchParams({ question: questionId })
    window.scrollTo({ top: 200, behavior: "smooth" })
  }

  const formating = {
    b: (chunks: any) => <b>{chunks}</b>,
    h2: (chunks: any) => (
      <Title as="h2" look="h5">
        {chunks}
      </Title>
    ),
    h3: (chunks: any) => (
      <Title as="h3" look="h6">
        {chunks}
      </Title>
    ),
    br: () => <br />,
    ol: (chunks: any) => <ol>{chunks}</ol>,
    ul: (chunks: any) => <ul>{chunks}</ul>,
    li: (chunks: any) => <li>{chunks}</li>,

    aES: (chunks) => (
      <a href="https://www.elastic.co/" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aC: (chunks) => (
      <a href="contact" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aGit: (chunks) => (
      <a href="https://github.com/dataesr/affiliation-matcher" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aHal: (chunks) => (
      <a href="https://hal.science/hal-03365806/" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aB: (chunks) => (
      <a href="https://bit.ly/2LKOWW6" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aWipo: (chunks) => (
      <a href="https://www.wipo.int/pct/en/faqs/faqs.html" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aEpo: (chunks) => (
      <a
        href="https://www.epo.org/searching-for-patents/helpful-resources/first-time-here/patent-families_fr.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    ),
    aWp: (chunks) => (
      <a href="https://bit.ly/38qctFD" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aVos: (chunks) => (
      <a href="https://www.vosviewer.com" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aCWTS: (chunks) => (
      <a href="https://www.cwts.nl" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aLeiden: (chunks) => (
      <a href="https://www.universiteitleiden.nl/en" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aWikiLouvainFr: (chunks) => (
      <a href="https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Louvain" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aWikiLouvainEn: (chunks) => (
      <a href="https://en.wikipedia.org/wiki/Louvain_method" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aWikiGraphFr: (chunks) => (
      <a href="https://fr.wikipedia.org/wiki/Th%C3%A9orie_des_graphes" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aWikiGraphEn: (chunks) => (
      <a href="https://en.wikipedia.org/wiki/Graph_theory" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aMistral: (chunks) => (
      <a href="https://mistral.ai" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aOpendata: (chunks) => (
      <a href="/" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ7: (chunks) => (
      <a href="FAQ?question=q7" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ10: (chunks) => (
      <a href="FAQ?question=q10" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ11: (chunks) => (
      <a href="FAQ?question=q11" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ18: (chunks) => (
      <a href="FAQ?question=q18" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ27: (chunks) => (
      <a href="FAQ?question=q27" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ31: (chunks) => (
      <a href="FAQ?question=q31" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ45: (chunks) => (
      <a href="FAQ?question=q45" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ64: (chunks) => (
      <a href="FAQ?question=q64" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    aQ65: (chunks) => (
      <a href="FAQ?question=q65" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    link: (chunks) => (
      <a href={String(chunks).split(":::")[0]} target="_blank" rel="noopener noreferrer">
        {String(chunks).split(":::")[1]}
      </a>
    ),
    linkQuestion: (chunks) => (
      <Text
        className="fr-link"
        style={{ cursor: "pointer" }}
        onClick={() => handleQuestionClick(String(chunks).split(":::")[0])}
      >
        {String(chunks).split(":::")[1]}
      </Text>
    ),
    imgInsert: (chunks) => (
      <figure>
        <img src={String(chunks).split(":::")[0]} alt={String(chunks).split(":::")[1]} width="50%" height="50%" />
        <figcaption className="fr-text--xs fr-text--legend">{String(chunks).split(":::")[1]}</figcaption>
      </figure>
    ),
  }
  let isGroupExpanded = false

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Row>
          <Col xs="12" md="6" lg="5">
            <SideMenu title="">
              {Object.entries(groupedQuestions).map(([groupKey, groupQuestions]: [string, any[]]) => {
                isGroupExpanded = false
                for (const question of groupQuestions) {
                  if (question.key === selectedQuestion) {
                    isGroupExpanded = true
                    break
                  }
                }
                return (
                  <SideMenuItem
                    key={groupKey}
                    title={intl.formatMessage({
                      id: `app.faq.${groupKey}.title`,
                    })}
                    defaultExpanded={isGroupExpanded}
                  >
                    {groupQuestions &&
                      groupQuestions.map((question) => (
                        <Link
                          key={question.key}
                          href={`?question=${question.key}`}
                          className={question.key === selectedQuestion ? "current" : ""}
                          onClick={() => handleQuestionClick(question.key)}
                          current={question.key === selectedQuestion}
                        >
                          {intl.formatMessage({
                            id: question.label[locale],
                          })}
                        </Link>
                      ))}
                  </SideMenuItem>
                )
              })}
            </SideMenu>
          </Col>
          <Col>
            <Row className="flex--space-between flex--wrap stick">
              <Breadcrumb>
                <Link href="/">{intl.formatMessage({ id: "app.faq.home" })}</Link>
                <Link>{intl.formatMessage({ id: "app.faq.breadcrumb.current" })}</Link>
              </Breadcrumb>
              {!selectedQuestion && (
                <div>
                  <svg className="fr-artwork" aria-hidden="true" viewBox="0 0 80 80" width="300px" height="300px">
                    <use
                      className="fr-artwork-decorative"
                      href="/artwork/pictograms/system/information.svg#artwork-decorative"
                    />
                    <use className="fr-artwork-minor" href="/artwork/pictograms/system/information.svg#artwork-minor" />
                    <use className="fr-artwork-major" href="/artwork/pictograms/system/information.svg#artwork-major" />
                  </svg>
                </div>
              )}
              {selectedQuestion && (
                <div>
                  <Title as="h1">{intl.formatMessage({ id: "app.faq.title" })}</Title>
                  <Title as="h2" className="fr-callout__title">
                    {intl.formatMessage({
                      id: questions.find((q) => q.key === selectedQuestion)?.label[locale],
                    })}
                  </Title>
                  <p className="fr-callout__text">
                    {intl.formatMessage(
                      {
                        id: selectedQuestion,
                        defaultMessage: questions.find((q) => q.key === selectedQuestion)?.definition[locale],
                      },
                      {
                        ...formating,
                        ...questions.find((q) => q.key === selectedQuestion)?.formating,
                      }
                    )}
                  </p>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </RawIntlProvider>
  )
}
