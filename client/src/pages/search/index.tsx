import PublicationItem from "./components/publications/publication-item";
import AuthorItem from "./components/authors/author-item";
import SearchResultListSkeleton from "../../components/skeleton/search-result-list-skeleton";
import useSearchData from "./hooks/useSearchData";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Link,
  Row,
  SearchBar,
  Text,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { FormattedMessage, createIntl, RawIntlProvider } from "react-intl";
import Separator from "../../components/separator";
import { useEffect } from "react";
import { MAX_RESULTS_BEFORE_USER_CLICK } from "../../config/app";
import { useInView } from "react-intersection-observer";
import PublicationAnalytics from "./components/publications/publication-analytics";
import OrganizationItem from "./components/organizations/organization-item";
import ProjectItem from "./components/projects/project-item";
import BaseSkeleton from "../../components/skeleton/base-skeleton";
import PublicationFilters from "./components/publications/filters";

import OrganizationFilters from "./components/organizations/filters";
import Error500 from "../../components/errors/error-500";
import ProjectFilters from "./components/projects/filters";
import AuthorFilters from "./components/authors/filters";
import useUrl from "./hooks/useUrl";
import OrganizationsAnalytics from "./components/organizations/organization-analytics";
import CurrentFilters from "./components/commons/current-filters";
import ResultExports from "./components/commons/exports";
import useScreenSize from "../../hooks/useScreenSize";
import ProjectAnalytics from "./components/projects/projects-analytics";
import AuthorAnalytics from "./components/authors/author-analytics";
import PatentItem from "./components/patents/patent-item/index.tsx";
import { ObjectModel } from "../../types/commons";
import { ItemProps } from "./types";
import PatentFilters from "./components/patents/filters";
import PatentAnalytics from "./components/patents/patent-analytics";
import NavigateToNetwork from "./components/commons/navigate-to-network.tsx"

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

const API_MAPPING = {
  publications: {
    item: PublicationItem,
    analytics: PublicationAnalytics,
    filters: PublicationFilters,
  },
  authors: {
    item: AuthorItem,
    analytics: AuthorAnalytics,
    filters: AuthorFilters,
  },
  organizations: {
    item: OrganizationItem,
    analytics: OrganizationsAnalytics,
    filters: OrganizationFilters,
  },
  projects: {
    item: ProjectItem,
    analytics: ProjectAnalytics,
    filters: ProjectFilters,
  },
  patents: {
    item: PatentItem,
    analytics: PatentAnalytics,
    filters: PatentFilters,
  },
}

export default function Search() {
  const { locale } = useDSFRConfig()
  const { screen } = useScreenSize()
  const intl = createIntl({ locale, messages: messages[locale] })
  const [ref, inView] = useInView()
  const { api, currentQuery, handleQueryChange } = useUrl()
  const { search, total } = useSearchData()
  const { data, error, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = search

  console.log("data", data)

  const isMobile = screen === "sm" || screen === "xs"

  const AnalyticsComponent = API_MAPPING[api]?.analytics
  const FilterComponent = API_MAPPING[api]?.filters
  const ItemComponent: React.FC<ItemProps<ObjectModel>> = API_MAPPING[api]?.item

  const shouldClickToLoad = data?.length ? data.length >= MAX_RESULTS_BEFORE_USER_CLICK : false

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])
  if (error) {
    return <Error500 error={error} />
  }
  return (
    <RawIntlProvider value={intl}>
      <Container className={`bg-${api}`} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              <FormattedMessage id="search.top.breadcrumb.home" />
            </Link>
            <Link current>{intl.formatMessage({ id: `search.top.breadcrumb.${api}` })}</Link>
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
                  id: `search.top.main-search-bar-${api}`,
                })}
                onSearch={(value) => handleQueryChange(value)}
              />
            </Col>
            <Col xs="12" sm="4" lg="2">
              <FilterComponent />
            </Col>
          </Row>
          {isMobile && <CurrentFilters />}
        </Container>
      </Container>
      <Container className="fr-mt-3w">
        <Row>
          <Col xs="12" lg="7">
            <Container fluid as="section">
              <p>
                <em>
                  {total && total === 10000 ? (
                    <Text as="span" size="xs" className="fr-text-mention--grey">
                      {intl.formatMessage({
                        id: "search.top.result-more-than",
                      })}
                    </Text>
                  ) : null}
                  {total && total > 0 ? (
                    <Text as="span" size="xs" className="fr-text-mention--grey">
                      {intl.formatMessage({ id: `search.top.${api}.result` }, { count: total })}
                      {currentQuery && intl.formatMessage({ id: "search.top.result-for-query" }, { query: currentQuery })}
                    </Text>
                  ) : isFetchingNextPage ? (
                    <BaseSkeleton height="1.5rem" width="40%" />
                  ) : null}
                </em>
              </p>
              <div className="result-list">
                {data?.length
                  ? data.map(({ _source: data, highlight }) => (
                      <ItemComponent data={data} highlight={highlight} key={data.id} />
                    ))
                  : null}
              </div>
            </Container>
            {(isFetching || isFetchingNextPage) && (
              <>
                <hr />
                <div className="result-list">
                  <SearchResultListSkeleton />
                </div>
              </>
            )}
            {hasNextPage && !shouldClickToLoad && (
              <>
                <div ref={ref} />
                <hr />
              </>
            )}
            {hasNextPage && shouldClickToLoad && (
              <Separator className="fr-my-2w">
                <Button icon="arrow-down-s-line" variant="text" onClick={() => fetchNextPage()}>
                  <FormattedMessage id="search.results.pagination.next" />
                </Button>
              </Separator>
            )}
            {!isFetchingNextPage && !hasNextPage ? (
              <>
                <Separator />
                <Text size="md" className="fr-my-4w">
                  {intl.formatMessage({ id: "search.results.pagination.end" }, { query: currentQuery })}
                </Text>
              </>
            ) : null}
          </Col>
          <Col xs="12" lg="4" offsetLg="1">
            <Container fluid>
              {!isMobile && <CurrentFilters />}
              {["publications", "patents", "projects", "authors"].includes(api) && (
                <>
                  <hr />
                  <NavigateToNetwork currentList={data?.map(({ _source: data }) => data) || []} />
                </>
              )}
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
