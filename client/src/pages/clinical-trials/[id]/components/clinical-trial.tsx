import {
  Badge,
  BadgeGroup,
  Col,
  Container,
  Link,
  Row,
  Text,
  Title,
} from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

import Identifiers from "../../../../components/identifiers"
import LinkCard from "../../../../components/link-card"
import MoreLikeThis from "../../../../components/more-like-this"
import { PageContent, PageSection } from "../../../../components/page-content"
import Share from "../../../../components/share"
import Truncate from "../../../../components/truncate"
import useScreenSize from "../../../../hooks/useScreenSize"
import { LightClinicalTrial } from "../../../../types/clinical-trial"
import type { LightPublication } from "../../../../types/publication"
import PublicationItem from "../../../search/components/publications/publication-item"

const lastYear = import.meta.env.VITE_CLINICAL_TRIALS_LAST_YEAR;

const MAPPING_SOURCES = {
  clinical_trials: {
    field: 'NCTId',
    label: 'ClinicalTrials.gov',
    url: 'https://clinicaltrials.gov/study/',
  },
  ctis: {
    field: 'CTIS',
    label: 'Clinical Trials Information System',
    url: 'https://euclinicaltrials.eu/search-for-clinical-trials/?lang=en&EUCT=',
  },
  euctr: {
    field: 'eudraCT',
    label: 'EU Clinical Trials Register',
    url: 'https://www.clinicaltrialsregister.eu/ctr-search/search?query=',
  },
}

export default function ClinicalTrial({ data }: { data: LightClinicalTrial }) {
  const intl = useIntl()
  const { screen } = useScreenSize()

  let identifiers = []
  if (data?.NCTId) identifiers.push({ id: data.NCTId, type: "ClinicalTrials.gov" })
  if (data?.CTIS) identifiers.push({ id: data.CTIS, type: "CTIS" })
  if (data?.eudraCT) identifiers.push({ id: data.eudraCT, type: "EudraCT" })
  if (data?.other_ids) identifiers = [...identifiers, ...data.other_ids]
  // Filter identifiers to remove duplicates based on "id x type"
  identifiers = identifiers.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.id === value.id && t.type === value.type
    ))
  )
  const lastYearData = data?.results_details?.[lastYear]
  const references = (lastYearData?.references ?? []).map((reference) => {
    const result: LightPublication = {
      authors: [],
      externalIds: [],
      id: `doi${reference.doi}`,
      isOa: reference?.oa_details_latest?.is_oa,
      source: { publisher: reference?.publisher_dissemination, title: '' },
      title: { default: reference?.citation },
      type: reference?.type,
      year: reference?.year,
    }
    if (reference?.doi) result.externalIds.push({ type: 'doi', id: reference.doi })
    if (reference?.pmid) result.externalIds.push({ type: 'pmid', id: reference.pmid })
    return result;
  })

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
                </BadgeGroup>
                <Title className="fr-mb-1v" as="h1" look="h5">{data.title}</Title>
              </div>
              {data?.summary && (
                <Truncate lines={6} className="fr-mt-2w">
                  <Text className="fr-mt-3w fr-mb-0" bold>{intl.formatMessage({ id: "clinical-trials.header.summary" })}</Text>
                  <Text className="fr-m-0" size="sm">{data.summary}</Text>
                </Truncate>
              )}
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
                <LinkCard
                  type="organization"
                  icon="building-line"
                >
                  <div style={{ display: "inline-flex" }}>
                    <div>
                      {data?.ror ? (
                        <Link href={`/organizations/${data.ror.replace('https://ror.org/', '')}`}>
                          {data.lead_sponsor_normalized} - {data.lead_sponsor_type.charAt(0).toUpperCase() + data.lead_sponsor_type.slice(1)}
                        </Link>
                      ) : (
                        `${data.lead_sponsor_normalized} - ${data.lead_sponsor_type.charAt(0).toUpperCase() + data.lead_sponsor_type.slice(1)}`
                      )}
                    </div>
                  </div>
                </LinkCard>
              </PageSection>
              <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "clinical-trials.section.data",
                })}
                icon="survey-line"
                show={!!data?.lead_sponsor_normalized}
              >
                <Row gutters>
                  <Col md="6" lg="4">
                    {data?.study_start_year && (
                      <Text size="sm" className="fr-mb-1w">
                        <b>{intl.formatMessage({ id: "clinical-trials.section.year-start" })} :</b>{" "}
                        {data.study_start_year}
                      </Text>
                    )}
                    {data?.study_completion_year && (
                      <Text size="sm" className="fr-mb-1w">
                        <b>{intl.formatMessage({ id: "clinical-trials.section.year-completion" })} :</b>{" "}
                        {data.study_completion_year}
                      </Text>
                    )}
                    {data?.intervention_type && (
                      <Text size="sm" className="fr-mb-1w">
                        <b>{intl.formatMessage({ id: "clinical-trials.section.intervention-type" })} :</b>{" "}
                        {intl.formatMessage({ id: `clinical-trials.intervention-type.${data.intervention_type.toLowerCase()}`, defaultMessage: data.intervention_type })}
                      </Text>
                    )}
                    </Col>
                  <Col md="6" lg="4">
                    {data?.status_simplified && (
                      <Text size="sm" className="fr-mb-1w">
                        <b>{intl.formatMessage({ id: "clinical-trials.section.status" })} :</b>{" "}
                        {intl.formatMessage({ id: `clinical-trials.status.${data.status_simplified}` })}
                      </Text>
                    )}
                    {data?.all_sources && (
                      <Text size="sm" className="fr-mb-1w">
                        <b>{intl.formatMessage({ id: "search.clinical-trials.sources" })} :</b>{" "}
                        {data.all_sources
                          .filter((source) => MAPPING_SOURCES?.[source])
                          .map((source, index, arr) => (
                            <>
                              <Link
                                key={source}
                                href={`${MAPPING_SOURCES[source].url}${data[MAPPING_SOURCES[source].field]}`}
                                target="_blank"
                              >
                                {MAPPING_SOURCES[source].label}
                              </Link>
                              {index < arr.length - 1 && <br />}
                            </>
                          ))}
                      </Text>
                    )}
                  </Col>
                </Row>
              </PageSection>
              <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "clinical-trials.section.results",
                })}
                icon="trophy-line"
                show={!!data?.lead_sponsor_normalized}
              >
                <div className="fr-mb-6w">
                  <div>
                    <ul>
                      {lastYearData?.has_results_or_publications
                        ?  <Text size="sm" className="fr-mb-1w">
                            {intl.formatMessage({ id: "clinical-trials.results.results" })}
                            {' '}
                            ({lastYearData?.has_results && intl.formatMessage({ id: "clinical-trials.results.posted" })}
                            {lastYearData?.has_results && lastYearData?.has_publications_result && ` ${intl.formatMessage({ id: "clinical-trials.results.and" })} `}
                            {lastYearData?.has_publications_result && intl.formatMessage({ id: "clinical-trials.results.published" })})
                            {' '}
                            {intl.formatMessage({ id: "clinical-trials.results.found" })}
                            {' '}
                            {intl.formatMessage({ id: "clinical-trials.results.for-clinical-trial" })}
                            .
                          </Text>
                        : <Text size="sm" className="fr-mb-1w">
                            {intl.formatMessage({ id: "clinical-trials.results.no-results" })}
                            {' '}
                            ({intl.formatMessage({ id: "clinical-trials.results.posted" })}
                            {' '}
                            {intl.formatMessage({ id: "clinical-trials.results.or" })}
                            {' '}
                            {intl.formatMessage({ id: "clinical-trials.results.published" })})
                            {' '}
                            {intl.formatMessage({ id: "clinical-trials.results.not-found" })}
                            {' '}
                            {intl.formatMessage({ id: "clinical-trials.results.for-clinical-trial" })}
                            .
                          </Text>
                      }
                      {lastYearData?.has_publications_result && references.map((reference, index) => <PublicationItem data={reference} key={`clinical-trials-publication-${index}`} />)}
                    </ul>
                  </div>
                </div>
              </PageSection>
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
            <PageSection
              description={intl.formatMessage({
                id: "clinical-trials.section.identifiers-description",
              })}
              show
              title={intl.formatMessage({
                id: "clinical-trials.section.identifiers",
              })}
            >
              <Identifiers data={identifiers} />
            </PageSection>
            <PageSection title={intl.formatMessage({ id: "clinical-trials.section.share" })} show>
              <Share />
            </PageSection>
          </PageContent>
        </Col>
      </Row>
    </Container>
  )
}
