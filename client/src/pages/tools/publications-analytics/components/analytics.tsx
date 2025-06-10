import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import { PublicationAggregationsForAnalyticTool } from "../../../../types/publication";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";
import { Row, Col, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";
import useAnalytics from "../hooks/useAnalytics";
import Network from "./network";
import getDonutOptions from "../../../../components/analytics-graph/graph-options/donut";
import BubbleMap from "./charts/bubble-map";
import ResultExports from "./export";
import StackedBar from "./charts/stacked-bar";

export default function Analytics() {
  const { data, isLoading, isError } = useAnalytics();
  if (isError) return "Une erreur est survenue";
  if (isLoading) return <AnalyticsSkeleton />


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
  } = data as PublicationAggregationsForAnalyticTool

  const yearOptions = getYearChartOptions({ data: byYear, colors: ['var(--artwork-minor-purple-glycine)'] });
  const authorsOptions = getBarChartOptions({ data: byAuthors.slice(0, 20), colors: ['var(--publications-analytics)'] });
  const authorsFullNamesOptions = getBarChartOptions({ data: byAuthorsFullNames.slice(0, 20), colors: ['var(--publications-analytics)'] });
  const reviewOptions = getBarChartOptions({ data: byReview.slice(0, 10), colors: ['var(--publications-analytics)'] });
  const typeOptions = getBarChartOptions({ data: byType, colors: ['var(--publications-analytics)'] });
  const funderOptions = getBarChartOptions({ data: byFunder.slice(0, 10), colors: ['var(--projects-analytics)'] });
  const privateSupportOptions = getBarChartOptions({ data: byPrivateSupport.slice(0, 30), colors: ['var(--projects-analytics)'] });


  const labsOptions = getBarChartOptions({ data: byLabs.slice(0, 15), colors: ['var(--organizations-analytics)'] });
  const countriesOptions = getBarChartOptions({ data: byCountries.slice(0, 20), colors: ['var(--organizations-analytics)'] });
  const isOaOptions = getDonutOptions({ data: byIsOa, colors: ['var(--background-contrast-success-active)', 'var(--text-mention-grey)'] });

  const authorsWithMoreThan5Publications = byAuthors.filter((author) => author.count > 5)?.length;

  const authorsFullNamesWithMoreThan5Publications = byAuthorsFullNames.filter((author) => author.count > 5)?.length;


  return (
    <Row gutters>
      <Col xs="12">
        <div className="fr-mb-3w" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title as="h2" look="h4" className="fr-mb-0">{`${publicationsCount} publications`}</Title>
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
      <Col xs="6">
        <AnalyticsGraph
        title="Revues"
        description="Top 10 des revues les plus représentées"
        options={reviewOptions}
        />
      </Col>
      <Col xs="6">
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
        title="Auteurs identifiés avec idRef"
        description={`${authorsWithMoreThan5Publications} auteurs ont plus de 5 publications`}
        options={authorsOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Auteurs par nom complet dans la publication"
        description={`${authorsFullNamesWithMoreThan5Publications} auteurs ont plus de 5 publications`}
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
        <StackedBar
        data={byAuthorsByLabsChart}
        />
      </Col>
      <Col xs="6">
        <BubbleMap data={byLabsMap} />
      </Col>
      <Col xs="12">
        <Network model="structures" />
      </Col>
      <Col xs="12">
        <hr />
        <Title as="h2" look="h4">Pays</Title>
        <hr />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Pays"
        description="Représentation des pays dans les résultats de recherche"
        options={countriesOptions}
        />
      </Col>
      <Col xs="12">
        <hr />
        <Title as="h2" look="h4">Financements</Title>
        <hr />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Types de financements"
        description="Top 10 des types de financement"
        options={funderOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title="Financements privés"
        description="Top 10 des types de financement"
        options={privateSupportOptions}
        />
      </Col>
    </Row>
  )
}
