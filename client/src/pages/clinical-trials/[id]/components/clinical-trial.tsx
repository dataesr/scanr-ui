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
import MoreLikeThis from "../../../../components/more-like-this"
import { PageContent, PageSection } from "../../../../components/page-content"
import Share from "../../../../components/share"
import Truncate from "../../../../components/truncate"
import useScreenSize from "../../../../hooks/useScreenSize"
import { LightClinicalTrial } from "../../../../types/clinical-trial"

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
                        <Link href={`/organizations/${data.ror.replace('https://ror.org/', '')}`}>{data.lead_sponsor_normalized}</Link>
                      ) : (
                        data.lead_sponsor_normalized
                      )}
                    </div>
                  </div>
                </div>
              </PageSection>
              <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "clinical-trials.section.data",
                })}
                icon="survey-line"
                show={!!data?.lead_sponsor_normalized}
              >
                <div className="fr-mb-6w">
                  <div>
                    {data?.study_start_year && <div>{intl.formatMessage({ id: "clinical-trials.section.year-start" })}: {data?.study_start_year}</div>}
                    {data?.study_completion_year && <div>{intl.formatMessage({ id: "clinical-trials.section.year-completion" })}: {data?.study_completion_year}</div>}
                    {data?.intervention_type && <div>{intl.formatMessage({ id: "clinical-trials.section.intervention-type" })}: {intl.formatMessage({ id: `clinical-trials.intervention-type.${data.intervention_type.toLowerCase()}` })}</div>}
                    {data?.status_simplified && <div>{intl.formatMessage({ id: "clinical-trials.section.status" })}: {intl.formatMessage({ id: `clinical-trials.status.${data?.status_simplified}` })}</div>}
                    {data?.all_sources && <div>{intl.formatMessage({ id: "search.clinical-trials.sources" })}:
                      <ul>
                        {data?.all_sources.map((source) => {
                          if (MAPPING_SOURCES?.[source])
                            return <li><Link href={`${MAPPING_SOURCES?.[source]?.url}${data?.[MAPPING_SOURCES?.[source]?.field]}`} target="_blank">{MAPPING_SOURCES?.[source]?.label ?? intl.formatMessage({ id: 'clinical-trials.source-unknown' })}</Link></li>
                        })}
                      </ul>
                    </div>}
                  </div>
                </div>
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
                      {Object.keys(data?.results_details).sort().filter((year) => year.endsWith('Q4')).map((year) => {
                        const d = data?.results_details?.[year]
                        return <li>Tel que mesuré en {year.slice(0, 4)}: {d?.has_results_or_publications
                          ? <><span className="fr-icon-check-line fr-icon--sm fr-text-label--green-menthe" /> Présence de résultats
                            (postage: {d?.has_results ? <span className="fr-icon-check-line fr-icon--sm fr-text-label--green-menthe" /> : <span className="fr-icon-close-line fr-icon--sm fr-text-label--red-marianne" />}
                            , publication: {d?.has_publications_result ? <span className="fr-icon-check-line fr-icon--sm fr-text-label--green-menthe" /> : <span className="fr-icon-close-line fr-icon--sm fr-text-label--red-marianne" />})
                          </>
                          : <><span className="fr-icon-close-line fr-icon--sm fr-text-label--red-marianne" />Pas de resultats</>}
                        </li>
                      })}
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
            <PageSection title={intl.formatMessage({ id: "clinical-trials.section.share" })} show>
              <Share />
            </PageSection>
          </PageContent>
        </Col>
      </Row>
    </Container>
  )
}
