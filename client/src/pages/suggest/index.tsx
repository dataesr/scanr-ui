import SearchResultListSkeleton from "../../components/skeleton/search-result-list-skeleton";
import useData from "./useData";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Col,
  Container,
  Link,
  ModalContent,
  ModalTitle,
  Notice,
  Row,
  SearchBar,
  Text,
  TextInput,
  useDSFRConfig,
  Modal,
} from "@dataesr/dsfr-plus";
import { FormattedMessage, createIntl, RawIntlProvider } from "react-intl";
import Separator from "../../components/separator";
import { useEffect, useState } from "react";
import { MAX_RESULTS_BEFORE_USER_CLICK } from "../../config/app";
import { useInView } from "react-intersection-observer";
import BaseSkeleton from "../../components/skeleton/base-skeleton";

import Error500 from "../../components/errors/error-500";
import { SuggestionAddItem, SuggestionRemoveItem } from "./item";
import useSuggestionList from "./useList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "../../api/authors/[id]";
import { postHeadersTicketOffice } from "../../config/api";
import { useNavigate } from "react-router-dom";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

export default function Suggest() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { id } = useParams();
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  const { search, currentQuery, total, handleQueryChange } = useData(id);
  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = search;
  const { items, removeItem, addItem, deleteAllItems } = useSuggestionList(id);
  const [successfullSubmission, setSuccessfullSubmission] = useState(false);
  const [errorSubmission, setErrorSubmission] = useState(false);
  const [email, setEmail] = useState("");
  const [thanks, setThanks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: author } = useQuery({
    queryKey: ["author", id],
    queryFn: () => getAuthorById(id),
  });

  const submitSuggestions = async () => {
    const body = {
      objectId: id,
      email,
      name: author?.fullName,
      extra: {
        id: author.id,
      },
      productions: items.map((item) => ({ id: item.id })),
    };
    const resp = await fetch("/ticket/api/production", {
      // If you want to test locally, use this URL: "http://localhost:3000/api/production"
      // Run ticket-office (at the root of the project -> bun start)
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...postHeadersTicketOffice,
      },
    });
    const json = await resp.json();
    if (json?.status === "ERR") {
      setErrorSubmission(true);
    } else {
      setSuccessfullSubmission(true);
      setThanks(true);

      deleteAllItems();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const shouldClickToLoad = data?.length
    ? data.length >= MAX_RESULTS_BEFORE_USER_CLICK
    : false;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (error) {
    return <Error500 error={error} />;
  }

  if (thanks) {
    return (
      <RawIntlProvider value={intl}>
        <Notice className="fr-mb-2w" type="success" closeMode="disallow">
          <span>{intl.formatMessage({ id: "suggest.thanks.message" })}</span>
          <ButtonGroup className="fr-mt-5w" isInlineFrom="xs">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              {intl.formatMessage({ id: "suggest.thanks.return" })}
            </Button>
          </ButtonGroup>
        </Notice>
      </RawIntlProvider>
    );
  }
  return (
    <RawIntlProvider value={intl}>
      {successfullSubmission && (
        <Notice closeMode="disallow" type="success" className="fr-py-3w">
          {intl.formatMessage({ id: "suggest.list.success" })}
        </Notice>
      )}
      {errorSubmission && (
        <Notice closeMode="disallow" type="error" className="fr-py-3w">
          {intl.formatMessage({ id: "suggest.list.error" })}
        </Notice>
      )}
      <Container className={"bg-publications"} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">
              <FormattedMessage id="suggest.breadcrumb.home" />
            </Link>
            <Link current>
              {intl.formatMessage({ id: "suggest.breadcrumb.publications" })}
            </Link>
          </Breadcrumb>
          <Row gutters>
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={currentQuery}
                isLarge
                buttonLabel={intl.formatMessage({
                  id: "suggest.main-search-bar",
                })}
                defaultValue={currentQuery || ""}
                placeholder={intl.formatMessage({
                  id: "suggest.main-search-bar",
                })}
                onSearch={(value) => handleQueryChange(value)}
              />
            </Col>
            <Col xs="12" sm="4" lg="2" />
          </Row>
          <Container fluid className="fr-py-3w">
            {total && total === 10000 ? (
              <Text as="span" size="lg" bold className="fr-mb-1w">
                {intl.formatMessage({ id: "suggest.result-more-than" })}
              </Text>
            ) : null}
            {total && total > 0 ? (
              <Text as="span" size="lg" bold className="fr-mb-1w">
                {intl.formatMessage(
                  { id: "suggest.publications.result" },
                  { count: total, query: currentQuery }
                )}
              </Text>
            ) : isFetchingNextPage ? (
              <BaseSkeleton height="1.5rem" width="40%" />
            ) : null}
          </Container>
        </Container>
      </Container>
      <Container className="fr-mt-3w">
        <Row>
          <Col xs="12" lg="7">
            <Container fluid as="section">
              <div className="result-list">
                {data?.length
                  ? data.map(({ _source: data, highlight }) => (
                      <SuggestionAddItem
                        data={data}
                        highlight={highlight}
                        key={data.id}
                        addItem={addItem}
                        disabled={items.some((item) => item.id === data.id)}
                        isIdentified={
                          !!data?.authors
                            ?.map((a) => a.person)
                            ?.includes(author.id)
                        }
                      />
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
                <Button
                  icon="arrow-down-s-line"
                  variant="text"
                  onClick={() => fetchNextPage()}
                >
                  <FormattedMessage id="suggest.results.pagination.next" />
                </Button>
              </Separator>
            )}
            {!isFetchingNextPage && !hasNextPage ? (
              <>
                <Separator />
                <Text size="md" className="fr-my-4w">
                  {intl.formatMessage(
                    { id: "suggest.results.pagination.end" },
                    { query: currentQuery }
                  )}
                </Text>
              </>
            ) : null}
          </Col>
          <Col xs="12" lg="4" offsetLg="1">
            <Text bold size="lead" className="fr-mb-2w">
              {intl.formatMessage({ id: "suggest.list.title" })}
              <br />
              {author?.fullName}
            </Text>
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "1rem 0.5rem",
                    borderBottom: "1px solid grey",
                  }}
                >
                  <SuggestionRemoveItem data={item} removeItem={removeItem} />
                </div>
              ))}
            </div>
            <hr />
            {items.length > 0 && (
              <Button
                onClick={handleModalOpen}
                variant="primary"
                className="fr-mt-3w"
              >
                Valider
              </Button>
            )}
            <Modal isOpen={isModalOpen} hide={handleModalClose}>
              <ModalTitle>Soumettre la liste des publications</ModalTitle>
              <ModalContent>
                <Text size="sm">
                  Veuillez entrer votre adresse email pour soumettre la liste.
                </Text>
                <TextInput
                  type="text"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ButtonGroup isInlineFrom="xs">
                  <Button onClick={submitSuggestions}>Soumettre</Button>
                  <Button onClick={handleModalClose}>Annuler</Button>
                </ButtonGroup>
              </ModalContent>
            </Modal>
          </Col>
        </Row>
      </Container>
    </RawIntlProvider>
  );
}
