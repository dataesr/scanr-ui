import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";
import { Row, Col, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";
import useAnalytics from "../hooks/useAnalytics";
import Network from "./network";
import getDonutOptions from "../../../../components/analytics-graph/graph-options/donut";
import BubbleMap from "./charts/bubble-map";
import ResultExports from "./export";
import { type AnalyticsData } from "../hooks/useAnalytics";
import getStackedBarChartOptions from "../../../../components/analytics-graph/graph-options/stacked-bar";

export default function Analytics() {
  const { data, isLoading, isError } = useAnalytics();
  if (isError) return "Une erreur est survenue";
  if (isLoading) return <AnalyticsSkeleton />

  const { publications, patents, projects } = data as AnalyticsData;

  const {
    projectsCount,
    byYear: projectsByYear,
    byInstitution: projectsByInstitutions,
    byType: projectsByType,
  } = projects;
  const {
    byYear,
    byAuthors,
    byReview,
    byAuthorsFullNames,
    byFunder,
    byLabs,
    byCountries,
    publicationsCount,
    byType,
    byIsOa,
    byPrivateSupport,
    byLabsMap,
    byAuthorsByLabsChart,
  } = publications

  const { byInventors, byApplicants, patentsCount, byYear: patentsByYear } = patents

  const yearOptions = getYearChartOptions({ data: byYear, colors: ['var(--artwork-minor-purple-glycine)'] });
  const authorsOptions = getBarChartOptions({ data: byAuthors.slice(0, 20), colors: ['var(--authors-analytics)'] });
  const authorsFullNamesOptions = getBarChartOptions({ data: byAuthorsFullNames.slice(0, 20), colors: ['var(--authors-analytics)'] });
  const reviewOptions = getBarChartOptions({ data: byReview.slice(0, 15), colors: ['var(--publications-analytics)'] });
  const typeOptions = getBarChartOptions({ data: byType, colors: ['var(--publications-analytics)'] });
  const funderOptions = getBarChartOptions({ data: byFunder.slice(0, 10), colors: ['var(--projects-analytics)'] });
  const privateSupportOptions = getBarChartOptions({ data: byPrivateSupport.slice(0, 30), colors: ['var(--organizations-analytics)'] });


  const labsOptions = getBarChartOptions({ data: byLabs.slice(0, 15), colors: ['var(--organizations-analytics)'] });
  const countriesOptions = getBarChartOptions({ data: byCountries.slice(0, 15), colors: ['var(--publications-analytics)'] });
  const isOaOptions = getDonutOptions({ data: byIsOa, colors: ['var(--background-contrast-success-active)', 'var(--text-mention-grey)'] });

  const authorsWithMoreThan5Publications = byAuthors.filter((author) => author.count > 5)?.length;

  const authorsFullNamesWithMoreThan5Publications = byAuthorsFullNames.filter((author) => author.count > 5)?.length;

  const patentInventorsOptions = getBarChartOptions({ data: byInventors.slice(0, 15), colors: ['var(--authors-analytics)'] });
  const patentApplicantsOptions = getBarChartOptions({ data: byApplicants.slice(0, 15), colors: ['var(--organizations-analytics)'] });
  const patentYearsOptions = getYearChartOptions({ data: patentsByYear, colors: ['var(--patents-analytics)'] });

  const projectsYearOptions = getYearChartOptions({ data: projectsByYear, colors: ['var(--projects-analytics)'] });
  const projectsInstitutionsOptions = getBarChartOptions({ data: projectsByInstitutions.slice(0, 15), colors: ['var(--organizations-analytics)'] });
  const projectsTypeOptions = getBarChartOptions({ data: projectsByType.slice(0, 15), colors: ['var(--projects-analytics)'] });
  const byAuthorsByLabsOptions = getStackedBarChartOptions({ data: byAuthorsByLabsChart, colors: ['var(--organizations-analytics)', 'var(--patents-analytics)'] });
  return (
    <Row gutters>
      <Col xs="12">
        <div className="fr-mb-3w" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title as="h2" look="h4" className="fr-mb-0">{`${publicationsCount} publications françaises`}</Title>
        <ResultExports />
        </div>
        <hr />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Publications par années"
        description="Dans les résultats de recherche"
        options={yearOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Types de publications"
        description="Répartition des publications par type"
        options={typeOptions}
        />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Revues"
        description="Top 15 des revues les plus représentées"
        options={reviewOptions}
        />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Collaboration internationale de la France"
        description="Top 15 des pays qui collaborent avec la France"
        options={countriesOptions}
        />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="OpenAccess"
        description="Part des publications en accès ouvert"
        options={isOaOptions}
        />
      </Col>

      <Col xs="12">
        <hr />
        <Title as="h2" look="h4">Auteurs</Title>
        <hr />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Auteurs identifiés (avec idRef)"
        description={`${authorsWithMoreThan5Publications} auteurs ont plus de 5 publications - après alignement sur le référentiel auteur idref`}
        options={authorsOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Auteurs par nom complet dans la publication"
        description={`${authorsFullNamesWithMoreThan5Publications} auteurs ont plus de 5 publications - sans alignement, uniquement à partir du nom/prénom`}
        options={authorsFullNamesOptions}
        />
      </Col>
      <Col xs="12">
        <Title as="h3" className="fr-text--md fr-text--bold fr-m-0">
          Réseaux d'auteurs
        </Title>
        <p className="fr-text--xs fr-text-mention--grey">Analyse des réseaux d'auteurs à travers les publications séléctionnées</p>
        <Network model="authors" />
      </Col>
      <Col xs="12">
        <hr />
        <Title as="h2" look="h4">Laboratoires</Title>
        <hr />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Laboratoires"
        description="Top 10 des laboratoires les plus représentés"
        options={labsOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Nombre d'auteurs par labos"
        description="Répartition auteurs par laboratoires"
        options={byAuthorsByLabsOptions}
        />
      </Col>
      <Col xs="6">
        <BubbleMap data={byLabsMap} />
      </Col>
      <Col xs="6">
        <Title as="h3" className="fr-text--md fr-text--bold fr-m-0">
          Réseaux de laboratoires
        </Title>
        <p className="fr-text--xs fr-text-mention--grey">Analyse des réseaux de laboratoires à travers les publications séléctionnées</p>
        <Network model="structures" />
      </Col>

      <Col xs="12">
        <hr />
        <Title as="h2" look="h4">Financements</Title>
        <hr />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Types de financements"
        description="Top 10 des types de financement détectés dans les publications"
        options={funderOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Financements privés [ Bêta - publications de 2023 ]"
        description="Top 10 des financements privés détectés dans les paragraphes de remerciements"
        options={privateSupportOptions}
        />
      </Col>
      <Col xs="12">
        <hr />
        <Title as="h2" look="h4">{`${patentsCount} familles de brevet`}</Title>
        <div className="fr-notice fr-notice--info fr-mb-3w">
            <div className="fr-container">
                <div className="fr-notice__body">
                    <p>
                        <span className="fr-notice__title">Les filtres ne sont pas disponibles pour les brevets</span>
                    </p>
                </div>
            </div>
        </div>
        <hr />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Familles de brevet par années"
        description="Nombre de familles de brevet par années pour l'equation de recherche"
        options={patentYearsOptions}
        />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Inventeurs"
        description="Top 15 des inventeurs"
        options={patentInventorsOptions}
        />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Déposants"
        description="Top 15 des déposants"
        options={patentApplicantsOptions}
        />
      </Col>
      <Col xs="12">
        <hr />
        <Title as="h2" look="h4">{`${projectsCount} projets financés`}</Title>
        <div className="fr-notice fr-notice--info fr-mb-3w">
            <div className="fr-container">
                <div className="fr-notice__body">
                    <p>
                        <span className="fr-notice__title">Les filtres ne sont pas disponibles pour les projets</span>
                    </p>
                </div>
            </div>
        </div>
        <hr />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Par années"
        description="Nombre de projets par années pour l'equation de recherche"
        options={projectsYearOptions}
        />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Types"
        description="Top 15 des types"
        options={projectsTypeOptions}
        />
      </Col>
      <Col xs="4">
        <AnalyticsGraph
        title="Participants"
        description="Top 15 des laboratoires participants"
        options={projectsInstitutionsOptions}
        />
      </Col>
    </Row>
  )
}
