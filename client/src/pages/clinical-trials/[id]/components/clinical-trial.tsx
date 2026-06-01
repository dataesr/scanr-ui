import {
  Badge,
  BadgeGroup,
  // Button,
  // ButtonGroup,
  Col,
  Container,
  Link,
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
import Truncate from "../../../../components/truncate"
import useScreenSize from "../../../../hooks/useScreenSize"
import { LightClinicalTrial } from "../../../../types/clinical-trial"
// import { ExternalIdsData } from "../../../../types/commons"
// import { encode } from "../../../../utils/string"
// import ProjectItem from "../../../search/components/projects/project-item"
// import PublicationsHeader from "./header"
// import Software from "./software"

const MAPPING_SOURCES = {
  clinical_trials: 'ClinicalTrials.gov',
  ctis: 'Clinical Trials Information System',
  euctr: 'EU Clinical Trials Register',
}

const MAPPING_STATUS = {
  Completed: 'Terminé',
  Ongoing: 'En cours',
  Unknown: 'Statut non renseigné',
}

export default function ClinicalTrial({ data }: { data: LightClinicalTrial }) {
  const intl = useIntl()
  const { screen } = useScreenSize()

  let identifiers = []
  if (data?.NCTId) identifiers.push({ id: data.NCTId, type: "ClinicalTrials.gov" })
  if (data?.CTIS) identifiers.push({ id: data.CTIS, type: "CTIS" })
  if (data?.eudraCT) identifiers.push({ id: data.eudraCT, type: "EudraCT" })
  if (data?.other_ids) identifiers = [...identifiers, ...data.other_ids]
  // Filter identifiers to remove duplicates based on id x type
  identifiers = identifiers.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.id === value.id && t.type === value.type
    ))
  )

  return (
    <Container fluid>
      <Row gutters={!["sm", "xs"].includes(screen)}>
        <Col xs="12" md="8">
          <Container fluid className="fr-mb-6w">
            <section>
              <div>
                <BadgeGroup>
                  {data?.study_type && <Badge color="blue-cumulus" noIcon>{intl.formatMessage({ id: `clinical-trials.type.${data?.study_type}` })}</Badge>}
                  <Badge color="blue-ecume">
                    {intl.formatMessage({ id: 'clinical-trials.sponsor' })} {data?.lead_sponsor_type}
                  </Badge>
                  {data?.intervention_type && (
                    <Badge>
                      {intl.formatMessage({ id: `clinical-trials.intervention-type.${data.intervention_type.toLowerCase()}` })}
                    </Badge>
                  )}
                </BadgeGroup>
                <Title className="fr-mb-1v" as="h1" look="h5">{data.title}</Title>
                <Text bold size="md" className="fr-card__detail">
                  {`${data?.study_start_year ?? '...'} - ${data?.study_completion_year ?? '...'}`}
                  {' / '}
                  {MAPPING_STATUS?.[data?.status_simplified] ?? data?.status_simplified}
                  {' / '}
                  {data?.all_sources.map((source) => MAPPING_SOURCES?.[source] ?? intl.formatMessage({ id: 'clinical-trials.source-unknown' })).join(", ")}
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
              <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "clinical-trials.section.lead-sponsor",
                })}
                icon="building-line"
                show={!!data?.lead_sponsor_normalized}
              >
                <div className="fr-mb-6w">
                  <div style={{ display: "inline-flex" }}>
                    <div>
                      {data?.ror ? (
                        <Link href={data.ror} target="_blank">{data.lead_sponsor_normalized} ({data.ror})</Link>
                      ) : (
                        data.lead_sponsor_normalized
                      )}
                    </div>
                  </div>
                </div>
              </PageSection>
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
              <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "clinical-trials.section.more-like-this",
                })}
                icon="article-line"
                show
              >
                <MoreLikeThis id={data._id} api="clinical-trials" />
              </PageSection>
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
