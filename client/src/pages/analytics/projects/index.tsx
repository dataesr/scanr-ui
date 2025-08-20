import { Col, Row, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../components/analytics-graph";
import getBarChartOptions from "../../../components/analytics-graph/graph-options/bar";
import getYearChartOptions from "../../../components/analytics-graph/graph-options/years";
import AnalyticsSkeleton from "../../../components/skeleton/analytics-skeleton";
import useProjectsAnalyticsData from "./hooks/useProjectsAnalyticsData";

export default function ProjectsAnalytics() {
	const { data, isLoading, isError } = useProjectsAnalyticsData();
	if (isError) return "Une erreur est survenue";
	if (isLoading) return <AnalyticsSkeleton />;


	const {
		projectsCount,
		byYear: projectsByYear,
		byInstitution: projectsByInstitutions,
		byType: projectsByType,
	} = data;

	const projectsYearOptions = getYearChartOptions({
		data: projectsByYear,
		colors: ["var(--projects-analytics)"],
	});
	const projectsInstitutionsOptions = getBarChartOptions({
		data: projectsByInstitutions.slice(0, 15),
		colors: ["var(--organizations-analytics)"],
	});
	const projectsTypeOptions = getBarChartOptions({
		data: projectsByType.slice(0, 15),
		colors: ["var(--projects-analytics)"],
	});

	return (
		<>
			<Row gutters>
				<Col xs="12">
					<hr />
					<Title as="h2" look="h4">{`${projectsCount} projets financés`}</Title>
					<div className="fr-notice fr-notice--info fr-mb-3w">
						<div className="fr-container">
							<div className="fr-notice__body">
								<p>
									<span className="fr-notice__title">
										Les filtres ne sont pas disponibles pour les projets
									</span>
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
		</>
	);
}
