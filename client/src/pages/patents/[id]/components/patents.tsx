import {
  Badge,
  BadgeGroup,
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Text,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

import MoreLikeThis from "../../../../components/more-like-this"
import { PageContent, PageSection } from "../../../../components/page-content"
import Share from "../../../../components/share"
import Truncate from "../../../../components/truncate"
import Websites from "../../../../components/websites"
import useScreenSize from "../../../../hooks/useScreenSize"
import { Patent } from "../../../../types/patent"
import { isInProduction } from "../../../../utils/helpers"
import getLangFieldValue from "../../../../utils/lang"
import PatentActors from "./actors"
import PatentMap from "./coverage-map"
import PatentCPC from "./cpc"
import PatentTimeline from "./timeline"
import PublicationItem from "../../../search/components/publications/publication-item"

export default function PatentPage({ data }: { data: Patent }) {
  const { locale } = useDSFRConfig()
  const intl = useIntl()
  const { screen } = useScreenSize()
  const priority = data.patents.find((patent) => patent.isPriority)
  const espaceNetUrl = priority
    ? priority.links?.[0]?.url
    : data.patents.sort(
      (a, b) =>
        new Date(b.applicationDate).getTime() -
        new Date(a.applicationDate).getTime()
    )?.[0]?.links?.[0]?.url
  const inpiId = data.patents
    .find((patent) => patent.office === "FR")
    ?.publicationNumber?.split("A")[0]
  const inpiUrl = inpiId && `https://data.inpi.fr/brevets/FR${inpiId}`

  const publications = (data?.publications ?? []).map((publication) => ({
    ...publication,
    authors: (publication?.authors ?? []).map((author) => ({ ...author, fullName: author.name })),
    id: publication?.id || `doi${publication?.doi}`,
    title: { default: publication?.title },
    type: publication?.type === "article" ? "journal-article" : publication?.type,
    source: { volume: publication.journals[0]?.name },
    year: Number(publication.publicationYear),
  }))

  return (
    <Container fluid>
      <Row gutters={!["sm", "xs"].includes(screen)}>
        <Col xs="12" md="8">
          <Container fluid className="fr-mb-6w">
            <BadgeGroup>
              <Badge color="purple-glycine" style={{ marginRight: "10px" }}>
                {intl.formatMessage({
                  id: "patents.section.badge",
                })}
              </Badge>
              {data.isInternational && (
                <Badge
                  size="sm"
                  color="blue-ecume"
                  style={{ marginRight: "10px" }}
                >
                  {intl.formatMessage({
                    id: "patents.section.badge.international",
                  })}
                </Badge>
              )}
              {data.isOeb && (
                <Badge
                  size="sm"
                  color="blue-ecume"
                  style={{ marginRight: "10px" }}
                >
                  {intl.formatMessage({
                    id: "patents.section.badge.isOeb",
                  })}
                </Badge>
              )}
              <Badge
                size="sm"
                color="green-bourgeon"
                style={{ marginRight: "10px" }}
              >
                {`${intl.formatMessage(
                  {
                    id: "patents.detail.badge.count",
                  },
                  { count: data.patents.length }
                )}`}
              </Badge>
            </BadgeGroup>
            <Title className="fr-mb-3w" as="h1" look="h5">
              {getLangFieldValue(locale)(data.title)}
            </Title>
            <Truncate lines={10}>
              <Text className="fr-m-0" size="sm">
                {getLangFieldValue(locale)(data.summary)}
              </Text>
            </Truncate>
          </Container>
          <Container fluid>
            <PageContent>
              <PageSection
                show={
                  !!data.applicants.filter(
                    (app) =>
                      app.type === "organisation" || app.type === "person"
                  ).length
                }
                size="lead"
                title={intl.formatMessage({
                  id: "patents.section.dep",
                })}
              >
                <PatentActors actors={data.applicants} />
              </PageSection>
              <PageSection
                show={
                  !!data.inventors.filter((author) => author.type === "person")
                    .length
                }
                size="lead"
                title={intl.formatMessage({
                  id: "patents.section.inv",
                })}
              >
                <PatentActors actors={data.inventors} />
              </PageSection>
              <PageSection
                show
                size="lead"
                title={intl.formatMessage({
                  id: "patents.section.map.title",
                })}
                description={intl.formatMessage({
                  id: "patents.section.map.description",
                })}
              >
                <PatentMap patents={data.patents} />
              </PageSection>
              <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "patents.section.more-like-this",
                })}
                icon="article-line"
                show
              >
                <MoreLikeThis id={data._id} api="patents" />
              </PageSection>
              {!isInProduction() && (
                <PageSection
                  icon="book-2-line"
                  show
                  size="lead"
                  title={intl.formatMessage({ id: "patents.section.publications-linked" })}
                >
                  {publications?.length ? (
                    <div className="result-list">
                      {publications.map((publication) =>
                        <PublicationItem data={publication} key={publication.doi} />
                      )}
                    </div>
                  ) : <Text className="fr-card__detail fr-text--md">{intl.formatMessage({ id: "patents.section.publications-linked.empty" })}</Text>}
                </PageSection>
              )}
              <PageSection
                title="Data JSON"
                description=""
                show={import.meta.env.DEV}
              >
                <div>
                  <pre>{JSON.stringify(data || "", null, 2)}</pre>
                </div>
              </PageSection>
            </PageContent>
          </Container>
        </Col>
        <Col xs="12" md="4" xl="3" offsetXl="1">
          <PageContent>
            <PageSection
              show
              title={intl.formatMessage({
                id: "patents.section.cpc.title",
              })}
              description={intl.formatMessage({
                id: "patents.section.cpc.description",
              })}
            >
              <PatentCPC cpc={data.cpc} />
            </PageSection>
            <PageSection
              show={!!data.patents.length}
              title={intl.formatMessage({
                id: "patents.section.timeline.title",
              })}
              description={intl.formatMessage({
                id: "patents.section.timeline.description",
              })}
            >
              <PatentTimeline patents={data.patents} />
            </PageSection>
            <PageSection
              show={!!(espaceNetUrl || inpiUrl)}
              title={intl.formatMessage({
                id: "patents.section.website.title",
              })}
              description={intl.formatMessage({
                id: "patents.section.website.description",
              })}
            >
              <Websites
                data={[
                  { type: "espacenet", url: espaceNetUrl },
                  { type: "inpi", url: inpiUrl },
                ].filter((link) => link.url)}
              />
            </PageSection>
            {/* <PageSection
              show
              title={intl.formatMessage({
                id: "patents.id.title",
              })}
              description={intl.formatMessage({
                id: "patents.copy",
              })}
            >
              <Identifiers />
            </PageSection> */}
            <PageSection
              show
              title={intl.formatMessage({
                id: "patents.section.share",
              })}
            >
              <Share />
            </PageSection>
            <PageSection
              title={intl.formatMessage({
                id: "patents.section.contribute.title",
              })}
              show
            >
              <ButtonGroup>
                <Button
                  as="a"
                  href={`/bugs/patents/${data.id}`}
                  color="error"
                  variant="tertiary"
                  icon="bug-line"
                  iconPosition="left"
                >
                  {intl.formatMessage({
                    id: "patents.section.contribute.button-label",
                  })}
                </Button>
              </ButtonGroup>
            </PageSection>
          </PageContent>
        </Col>
      </Row>
    </Container>
  )
}
