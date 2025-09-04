import { Col, Row, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import useProjectsAnalyticsData from "../hooks/useProjectsAnalyticsData";
import TagCloud from "../../../../components/tag-cloud";

export default function ProjectsAnalytics() {
	const { data, isLoading, isError } = useProjectsAnalyticsData();
	if (isError) return "Une erreur est survenue";
	if (isLoading) return <AnalyticsSkeleton />;


	const {
		byYear: projectsByYear,
		byInstitution: projectsByInstitutions,
		byType: projectsByType,
		byKeywords,
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
				{byKeywords?.length > 0 && (
					<Col xs="12">
					<div className="fr-pb-3w">
            <div style={{ display: 'flex', alignItems: 'start' }}>
              <div style={{ flexGrow: 1 }}>
                <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
                  Mots-clés
                </Title>
                <p className="fr-text--xs fr-text-mention--grey">Nuage de mots-clés associés aux financements</p>
              </div>
            </div>
						<TagCloud data={byKeywords} order="random" />
					</div>
				</Col>)}
			</Row>
		</>
	);
}
