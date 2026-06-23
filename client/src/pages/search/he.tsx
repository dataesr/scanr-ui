import { Breadcrumb, Button, ButtonGroup, Col, Container, Link, Row, Tag, TagGroup, Text, TextInput, Title, useDSFRConfig } from "@dataesr/dsfr-plus";
import useHeData from "./hooks/useHeData";
import { MAX_RESULTS_BEFORE_USER_CLICK } from "../../config/app";
import { createIntl, RawIntlProvider, FormattedMessage } from "react-intl";
import OrganizationItem from "./components/organizations/organization-item";
import Separator from "../../components/separator";
import SearchResultListSkeleton from "../../components/skeleton/search-result-list-skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Error500 from "../../components/errors/error-500";
import Modal from "../../components/modal";
import ResultExports from "./components/commons/exports";
import CurrentFilters from "./components/commons/current-filters";
import OrganizationsAnalytics from "./components/organizations/organization-analytics";
import useSearchData from "./hooks/useSearchData";
import useUrl from "./hooks/useUrl";
import OrganizationFilters from "./components/organizations/filters/index-for-he";
import { LightOrganization } from "../../types/organization";


const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


function KeywordsManager({ tags = [], suggestedTags = [] }: { tags: string[], suggestedTags: string[] }) {
  const { handleQueryChange } = useUrl();
  const [keywords, setKeywords] = useState<string[]>(tags)
  if (!keywords?.length) return null;
  return (
    <Modal id="add-keywords" title="Ajouter des mot-clés">
      <TextInput
        type="text"
        disableAutoValidation
        placeholder="Ajouter des mots-clés"
        className="fr-mb-1w"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setKeywords([...new Set([...keywords, e.currentTarget.value])])
            e.currentTarget.value = ''
          }
        }}
      />
      <TagGroup>
        {keywords?.map((keyword) => (
          <Tag
            as="button"
            icon="delete-bin-line"
            iconPosition="right"
            onClick={() => setKeywords(keywords.filter((k) => k !== keyword))}
            key={keyword}
          >
            {keyword}
          </Tag>
        ))}
      </TagGroup>
      {(!!suggestedTags.length) && (
        <>
          <Text bold className="fr-mb-1w">
            Mot clés suggérés
          </Text>
          <Text size="sm" className="fr-card__detail fr-mb-1w">
            Sélectionnez les mots-clés qui vous intéressent pour les ajouter à votre recherche
          </Text>
          <TagGroup>
            {suggestedTags.map((flag) => (
              <Tag size="sm" as="button" onClick={() => setKeywords([...new Set([...keywords, flag])])} key={flag}>{flag}</Tag>
            ))}
          </TagGroup>
        </>
      )}
      <div className="fr-modal__footer fr-px-0">
        <ButtonGroup>
          <Button
            aria-controls="add-keywords"
            onClick={() => {
              handleQueryChange(keywords?.join('|'))
            }}
            variant="primary"
          >
            Relancer la recherche
          </Button>
        </ButtonGroup>
      </div>
    </Modal>
  )
}



export default function HEPartners() {
  const { locale } = useDSFRConfig();
  const [ref, inView] = useInView();
  const intl = createIntl({ locale, messages: messages[locale] })
  const { data: heData, isFetching, isError, error } = useHeData();
  const { currentQuery } = useUrl();
  const { search } = useSearchData();
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingData,
    error: dataError
  } = search;
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])
  const shouldClickToLoad = data?.length
    ? data.length >= MAX_RESULTS_BEFORE_USER_CLICK
    : false;

  const keywords = currentQuery?.split('|')?.filter((k) => k);

  if (!keywords?.length) return null;
  if (isError || dataError) return <Error500 error={error} />
  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            <FormattedMessage id="search.top.breadcrumb.home" />
          </Link>
          <Link href="/search/organizations">
            <FormattedMessage id="search.top.breadcrumb.find-partners" />
          </Link>
          <Link>
            {heData?.title}
          </Link>
        </Breadcrumb>
        <Container fluid>
          <Container fluid className="fr-mt-3w">
            <Row>
              <Col xs="12" sm="8" lg="7">
                <Title className="fr-mb-0" as="h1" look="h4">
                  <Text as="span" size="sm">{heData?.identifier}</Text>
                  <br />
                  {heData?.title}
                </Title>
                <Text className="fr-card__detail fr-mb-2w" size="sm">
                  <i>
                    {heData?.callTitle}
                    <br />
                    {heData?.callIdentifier}
                  </i>
                </Text>
                <Text bold className="fr-mb-1w">
                  Mots-clés
                </Text>
                <div className="fr-mb-6w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    <TagGroup>
                      {keywords?.map((keyword) => (
                        <Tag key={keyword} color="green-emeraude">{keyword}</Tag>
                      ))}
                      <Tag
                        as="button"
                        data-fr-opened="false"
                        aria-controls="add-keywords"
                        icon="add-circle-line"
                        iconPosition="right"
                      >
                        Gérer les mot-clés
                      </Tag>
                    </TagGroup>
                  </div>
                </div>
                <KeywordsManager tags={keywords} suggestedTags={heData?.tags} />
                <OrganizationFilters />
                <Text bold size="lg" className="fr-mb-1w">
                  Résultats
                </Text>
                <Container fluid>
                  <div className="result-list">
                    {data?.length
                      ? data.map(({ _source: data, highlight }) => (
                        <OrganizationItem data={data as LightOrganization} highlight={highlight} key={data.id} />))
                      : null
                    }
                  </div>
                  {(isFetching || isFetchingData || isFetchingNextPage) && (
                    <>
                      <hr />
                      <div className="result-list">
                        <SearchResultListSkeleton />
                      </div>
                    </>
                  )}
                  {(hasNextPage && !shouldClickToLoad) && (
                    <>
                      <div ref={ref} />
                      <hr />
                    </>
                  )}
                  {(hasNextPage && shouldClickToLoad) && (
                    <Separator className="fr-my-2w">
                      <Button icon="arrow-down-s-line" variant="text" onClick={() => fetchNextPage()}>
                        <FormattedMessage id="search.results.pagination.next" />
                      </Button>
                    </Separator>
                  )}
                  {
                    (!isFetchingNextPage && !hasNextPage)
                      ? (<>
                        <Separator />
                        <Text size="md" className="fr-my-4w">
                          {intl.formatMessage(
                            { id: "search.results.pagination.end" },
                            { query: currentQuery }
                          )}
                        </Text>
                      </>)
                      : null
                  }

                </Container>
              </Col>
              <Col xs="12" lg="4" offsetLg="1">
                <Container fluid>
                  <CurrentFilters />
                  <hr />
                  <ResultExports />
                  <hr />
                  <OrganizationsAnalytics />
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </RawIntlProvider>
  );
}
