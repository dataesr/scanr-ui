import useSearchData from "./hooks/useSearchData";
import {
  Breadcrumb,
  Col,
  Container,
  Link,
  Row,
  SearchBar,
  Text,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { FormattedMessage, createIntl, RawIntlProvider } from "react-intl";
import PublicationFilters from "./components/publications/filters";

import Error500 from "../../components/errors/error-500";
import useUrl from "./hooks/useUrl";
import CurrentFilters from "./components/commons/current-filters";
import ResultExports from "./components/commons/exports";
import PublicationAnalyticsTool from "./components/publications/publication-analytics-tool";

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

export default function PublicationsAnalyticsTool() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({ locale, messages: messages[locale] })
  const { currentQuery, handleQueryChange } = useUrl()
  const { search, total } = useSearchData()
  const { error } = search


  const AnalyticsComponent = PublicationAnalyticsTool
  const FilterComponent = PublicationFilters

  if (error) {
    return <Error500 error={error} />
  }
  return (
    <RawIntlProvider value={intl}>
      <Container className="bg-publications fluid">
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              <FormattedMessage id="search.top.breadcrumb.home" />
            </Link>
            <Link current>{intl.formatMessage({ id: `search.top.breadcrumb.publications` })}</Link>
          </Breadcrumb>
          <Row gutters className="fr-pb-4w fr-mb-2w">
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={currentQuery}
                isLarge
                buttonLabel={intl.formatMessage({
                  id: "search.top.main-search-bar",
                })}
                defaultValue={currentQuery || ""}
                placeholder={intl.formatMessage({
                  id: `search.top.main-search-bar-publications`,
                })}
                onSearch={(value) => handleQueryChange(value)}
              />
            </Col>
            <Col xs="12">
              <FilterComponent />
            </Col>
          </Row>
          <CurrentFilters />
        </Container>
      </Container>
      <Container className="fr-mt-3w">
        <Row gutters>
          <Col xs="12">
            <Container fluid>
              <p>
                <em>
                  {total && total === 10000 ? (
                    <Text as="span" size="xs" className="fr-text-mention--grey">
                      {intl.formatMessage({
                        id: "search.top.result-more-than",
                      })}
                    </Text>
                  ) : null}
                  {total && total > 0 && (
                    <Text as="span" size="xs" className="fr-text-mention--grey">
                      {intl.formatMessage({ id: `search.top.publications.result` }, { count: total })}
                      {currentQuery && intl.formatMessage({ id: "search.top.result-for-query" }, { query: currentQuery })}
                    </Text>
                  )}
                </em>
              </p>
              <hr />
              <ResultExports />
              <hr />
              <AnalyticsComponent />
            </Container>
          </Col>
        </Row>
      </Container>
    </RawIntlProvider>
  )
}
