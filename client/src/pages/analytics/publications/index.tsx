import { Col, Row, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../components/analytics-graph";
import getBarChartOptions from "../../../components/analytics-graph/graph-options/bar";
import getDonutOptions from "../../../components/analytics-graph/graph-options/donut";
import getStackedBarChartOptions from "../../../components/analytics-graph/graph-options/stacked-bar";
import getYearChartOptions from "../../../components/analytics-graph/graph-options/years";
import AnalyticsSkeleton from "../../../components/skeleton/analytics-skeleton";
import BubbleMap from "./components/charts/bubble-map.tsx";
import ResultExports from "./components/export";
import Network from "./components/network";

import CurrentFilters from "./components/current-filters.tsx";
import Filters from "./components/filters/index.tsx";
import usePublicationsAnalyticsData from "./hooks/usePublicationsAnalyticsData.ts";

export default function PublicationsAnalytics() {
	const { data, isLoading, isError } = usePublicationsAnalyticsData();
	if (isError) return "Une erreur est survenue";
	if (isLoading) return <AnalyticsSkeleton />;

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
	} = data;

	const yearOptions = getYearChartOptions({
		data: byYear,
		colors: ["var(--artwork-minor-purple-glycine)"],
	});
	const authorsOptions = getBarChartOptions({
		data: byAuthors.slice(0, 20),
		colors: ["var(--authors-analytics)"],
	});
	const authorsFullNamesOptions = getBarChartOptions({
		data: byAuthorsFullNames.slice(0, 20),
		colors: ["var(--authors-analytics)"],
	});
	const reviewOptions = getBarChartOptions({
		data: byReview.slice(0, 15),
		colors: ["var(--publications-analytics)"],
	});
	const typeOptions = getBarChartOptions({
		data: byType,
		colors: ["var(--publications-analytics)"],
	});
	const funderOptions = getBarChartOptions({
		data: byFunder.slice(0, 10),
		colors: ["var(--projects-analytics)"],
	});
	const privateSupportOptions = getBarChartOptions({
		data: byPrivateSupport.slice(0, 30),
		colors: ["var(--organizations-analytics)"],
	});

	const labsOptions = getBarChartOptions({
		data: byLabs.slice(0, 15),
		colors: ["var(--organizations-analytics)"],
	});
	const countriesOptions = getBarChartOptions({
		data: byCountries.slice(0, 15),
		colors: ["var(--publications-analytics)"],
	});
	const isOaOptions = getDonutOptions({
		data: byIsOa,
		colors: [
			"var(--background-contrast-success-active)",
			"var(--text-mention-grey)",
		],
	});

	const authorsWithMoreThan5Publications = byAuthors.filter(
		(author) => author.count > 5,
	)?.length;

	const authorsFullNamesWithMoreThan5Publications = byAuthorsFullNames.filter(
		(author) => author.count > 5,
	)?.length;

	const byAuthorsByLabsOptions = getStackedBarChartOptions({
		data: byAuthorsByLabsChart,
		colors: ["var(--organizations-analytics)", "var(--patents-analytics)"],
	});
	return (
		<>
			<Row gutters>
				<Col xs="12">
					<div
						className="fr-mb-3w"
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Title
							as="h2"
							look="h4"
							className="fr-mb-0"
						>{`${publicationsCount} publications françaises`}</Title>
						<ResultExports />
					</div>
					<CurrentFilters />
					<Filters />
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
					<Title as="h2" look="h4">
						Auteurs
					</Title>
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
					<p className="fr-text--xs fr-text-mention--grey">
						Analyse des réseaux d'auteurs à travers les publications
						séléctionnées
					</p>
					<Network model="authors" />
				</Col>
				<Col xs="12">
					<hr />
					<Title as="h2" look="h4">
						Laboratoires
					</Title>
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
					<p className="fr-text--xs fr-text-mention--grey">
						Analyse des réseaux de laboratoires à travers les publications
						séléctionnées
					</p>
					<Network model="structures" />
				</Col>

				<Col xs="12">
					<hr />
					<Title as="h2" look="h4">
						Financements
					</Title>
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
			</Row>
		</>
	);
}
