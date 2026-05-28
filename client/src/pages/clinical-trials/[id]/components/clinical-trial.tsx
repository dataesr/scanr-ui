import {
  Badge,
  BadgeGroup,
  Button,
  ButtonGroup,
  Col,
  Container,
  // Link,
  Row,
  Text,
  Title,
} from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

import Identifiers from "../../../../components/identifiers"
import MoreLikeThis from "../../../../components/more-like-this"
import { PageContent, PageSection } from "../../../../components/page-content"
import Share from "../../../../components/share"
// import Wiki from "../../../../components/wiki"
import useScreenSize from "../../../../hooks/useScreenSize"
import Truncate from "../../../../components/truncate";
import { LightClinicalTrial } from "../../../../types/clinical-trial"
// import { ExternalIdsData } from "../../../../types/commons"
// import { encode } from "../../../../utils/string"
// import ProjectItem from "../../../search/components/projects/project-item"
// import PublicationsHeader from "./header"
// import Software from "./software"

export default function ClinicalTrial({ data }: { data: LightClinicalTrial }) {
  const intl = useIntl()
  const { screen } = useScreenSize()

  // const authors = data.authors?.filter((author) => author.role === "author") || []
  // const wikis = data?.domains?.filter((domain) => domain.type === "wikidata")

  // const affiliations = data?.authors
  //   ?.flatMap(({ affiliations }) => affiliations?.filter((affiliation) => affiliation.name))
  //   .reduce((acc, cur) => {
  //     if (!cur) return acc
  //     if (cur.rnsr) {
  //       return [...acc.filter((a) => a.rnsr), cur]
  //     }
  //     if (acc.filter((a) => a.rnsr).length > 0) {
  //       return acc
  //     }
  //     return [...acc, cur]
  //   }, [])
  //   .reduce((acc, cur) => {
  //     if (acc.find((a) => a.name === cur.name)) {
  //       return acc
  //     }
  //     return [...acc, cur]
  //   }, [])
  //   .map((affiliation, index) => {
  //     const authors = data.authors
  //       ?.filter((author) => author.affiliations?.find((a) => a.name === affiliation.name))
  //       .map((author) => author.fullName)
  //     return { ...affiliation, index, authors }
  // })

  let identifiers = []
  if (data?.NCTId) identifiers.push({ type: "ClinicalTrials.gov", id: data.NCTId })
  if (data?.CTIS) identifiers.push({ type: "CTIS", id: data.CTIS })
  if (data?.eudraCT) identifiers.push({ type: "EudraCT", id: data.eudraCT })
  if (data?.other_ids) identifiers = [ ...identifiers, ...data.other_ids ]

  return (
    <Container fluid>
      <Row gutters={!["sm", "xs"].includes(screen)}>
        <Col xs="12" md="8">
          <Container fluid className="fr-mb-6w">
            <section>
              <div>
                <BadgeGroup className="structure-badge-list">
                  {data?.study_type && <Badge color="blue-cumulus" noIcon>{intl.formatMessage({ id: `clinical-trials.type.${data?.study_type}` })}</Badge>}
                  <Badge size="sm" color="blue-ecume">
                    {intl.formatMessage({ id: 'clinical-trials.sponsor' })} {data?.lead_sponsor_type}
                  </Badge>
                </BadgeGroup>
                <Title className="fr-mb-1v" as="h1" look="h5">{data.title}</Title>
                {/* <Text bold size="sm" className="fr-mb-1v">
                  {authors.map((author, i) => (
                    <Fragment key={i}>
                      {(i > 0) ? ', ' : ''}
                      {(author?.person) ? <Link href={`/authors/${encode(author.person)}`}>{author.fullName}</Link> : author.fullName}
                      {affiliations
                        ?.filter((affiliation) => affiliation.authors.includes(author.fullName))
                        .map((affiliation, j) => (
                          <Fragment key={j}>
                            <sup>
                              {(j > 0) ? ', ' : ''}
                              {affiliation.index + 1}
                            </sup>
                          </Fragment>
                        )
                        )}
                    </Fragment>
                  ))}
                </Text> */}
                <Text bold size="md" className="fr-card__detail">
                  {data?.lead_sponsor_normalized}
                  {' / '}
                  {`${data?.study_start_year ?? '...'} - ${data?.study_completion_year ?? '...'}`}
                  {' / '}
                  {data?.status_simplified}
                  {' / '}
                  {data?.all_sources.join(", ")}
                </Text>
              </div>
              {data?.summary && (<Row>
                <Text className="fr-mt-3w fr-mb-0" bold>{intl.formatMessage({ id: "clinical-trials.header.summary" })}</Text>
                <Truncate lines={6} className="fr-mt-2w">
                  <Text className="fr-m-0" size="sm">{data.summary}</Text>
                </Truncate>
              </Row>)}
            </section>
          </Container>
          <Container fluid>
            <PageContent>
              {/* <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "publications.section.affiliations",
                })}
                icon="building-line"
                show={!!affiliations?.length}
              >
                <div className="fr-mb-6w">
                  {affiliations?.map((affiliation, i) => (
                    <div style={{ display: "inline-flex" }} key={i}>
                      <sup>{affiliation.index + 1}</sup>{" "}
                      <div>
                        {affiliation?.rnsr ? (
                          <Link href={`/organizations/${affiliation.rnsr}`}>{affiliation.name}</Link>
                        ) : (
                          affiliation.name
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </PageSection> */}
              {/* <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "publications.section.fundings",
                })}
                icon="money-euro-circle-line"
                show={!!data?.projects?.filter((p) => p.label)?.length}
              >
                <div className="result-list">
                  {data?.projects
                    ?.filter((p) => p.label)
                    ?.map((project) => (
                      <ProjectItem data={project} key={project.id} />
                    ))}
                </div>
              </PageSection> */}
              {/* <PageSection
                size="lead"
                icon="code-s-slash-line"
                title={intl.formatMessage({
                  id: "publications.section.software.title",
                })}
                description={intl.formatMessage({
                  id: "publications.section.software.legend",
                })}
                show={!!data?.software?.length}
              >
                <Software software={data?.software} />
              </PageSection> */}
              {/* <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "publications.section.more-like-this",
                })}
                icon="article-line"
                show
              >
                <MoreLikeThis id={data._id} api="clinical-trials" />
              </PageSection> */}
              <PageSection title="Data JSON" description="" show={import.meta.env.DEV}>
                <div>
                  <pre>{JSON.stringify(data || "", null, 2)}</pre>
                </div>
              </PageSection>
            </PageContent>
          </Container>
        </Col>
        <Col md="4" lg="3" offsetLg="1">
          <PageContent>
            {/* <PageSection
              title={intl.formatMessage({ id: "publications.section.access" })}
              show={!!(data.pdfUrl || data.landingPage)}
            >
              <ButtonGroup size="sm">
                {data.pdfUrl && (
                  <Button as="a" href={data.pdfUrl} target="_blank" icon="file-download-line" iconPosition="right">
                    {intl.formatMessage({
                      id: "publications.section.access.download",
                    })}
                  </Button>
                )}
                {data.landingPage && (
                  <Button
                    as="a"
                    href={data.landingPage}
                    target="_blank"
                    variant="tertiary"
                    icon="external-link-line"
                    iconPosition="right"
                  >
                    {intl.formatMessage({
                      id: "publications.section.access.visit",
                    })}
                  </Button>
                )}
              </ButtonGroup>
            </PageSection> */}
            <PageSection
              title={intl.formatMessage({
                id: "clinical-trials.section.identifiers",
              })}
              description={intl.formatMessage({
                id: "clinical-trials.section.identifiers-description",
              })}
              show
            >
              <Identifiers data={identifiers} />
            </PageSection>
            {/* <PageSection title={intl.formatMessage({ id: "publications.section.wikis" })} show={!!wikis?.length}>
              <Wiki wikis={wikis} />
            </PageSection> */}
            <PageSection title={intl.formatMessage({ id: "clinical-trials.section.share" })} show>
              <Share />
            </PageSection>
            {/* <PageSection
              title={intl.formatMessage({
                id: "publications.section.contribute",
              })}
              show
            >
              <ButtonGroup>
                <Button
                  as="a"
                  href={`/bugs/publications/${encode(data.id)}`}
                  color="error"
                  variant="tertiary"
                  icon="bug-line"
                  iconPosition="left"
                >
                  {intl.formatMessage({ id: "publications.signals.bug" })}
                </Button>
              </ButtonGroup>
            </PageSection> */}
          </PageContent>
        </Col>
      </Row>
    </Container>
  )
}
