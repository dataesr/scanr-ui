import {
  Breadcrumb,
  Col,
  Container,
  Link,
  Row,
  SearchBar,
} from "@dataesr/dsfr-plus";
import useUrl from "./hooks/useUrl.ts";
import Analytics from "./components/analytics.tsx";
import Filters from "./components/filters/index.tsx";
import CurrentFilters from "./components/current-filters.tsx";




export default function PublicationsAnalytics() {
  const { currentQuery, handleQueryChange } = useUrl()

  return (
    <>
      <Container className={`bg-publications`} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              Accueil
            </Link>
            <Link current>Outil d'analyse des publications</Link>
          </Breadcrumb>
          <Row gutters className="fr-pb-4w fr-mb-2w">
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={currentQuery}
                isLarge
                buttonLabel="Recherche"
                defaultValue={currentQuery || ""}
                placeholder="Entrez votre équation de recherche"
                onSearch={(value) => handleQueryChange(value)}
              />
            </Col>
            <Col xs="12" sm="4" lg="2">
              <Filters />
            </Col>
          </Row>
          <CurrentFilters />
        </Container>
      </Container>
      {currentQuery && <Container className="fr-mt-3w">
        <Analytics/>
      </Container>}
      {!currentQuery && <Container className="fr-my-15w">
        <i>Ajouter des termes de recherche pour obtenir des résultats.</i>
      </Container>}

      {/* <Container className="fr-mt-3w">
        <Row>
          <Col xs="12" lg="7">
            <Container fluid as="section">
              <p>
                <em>
                  {total && total === 10000 ? (
                    <Text as="span" size="xs" className="fr-text-mention--grey">
                      Plus de 10 000 résultats
                    </Text>
                  ) : null}
                  {total && total > 0 ? (
                    <Text as="span" size="xs" className="fr-text-mention--grey">
                      {total} résultats pour la recherche
                      {currentQuery && `résultats pour la recherche  ${currentQuery}` }
                    </Text>
                  ) : isFetchingNextPage ? (
                    <BaseSkeleton height="1.5rem" width="40%" />
                  ) : null}
                </em>
              </p>
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
              {["publications", "patents", "projects"].includes(api) && (
                <>
                  <hr />
                  <NavigateToNetwork />
                </>
              )}
              <hr />
              <ResultExports />
              <hr />
              <AnalyticsComponent />
            </Container>
          </Col>
        </Row>
      </Container> */}

      </>
  )
}
