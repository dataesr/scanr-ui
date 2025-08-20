import { Col, Row, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../components/analytics-graph";
import getBarChartOptions from "../../../components/analytics-graph/graph-options/bar";
import getYearChartOptions from "../../../components/analytics-graph/graph-options/years";
import AnalyticsSkeleton from "../../../components/skeleton/analytics-skeleton";
import usePatentsAnalyticsData from "./hooks/usePatentsAnalyticsData";


export default function PatentsAnalytics() {
	const { data, isLoading, isError } = usePatentsAnalyticsData();
	if (isError) return "Une erreur est survenue";
	if (isLoading) return <AnalyticsSkeleton />;



	const {
		byInventors,
		byApplicants,
		patentsCount,
		byYear: patentsByYear,
	} = data;





	const patentInventorsOptions = getBarChartOptions({
		data: byInventors.slice(0, 15),
		colors: ["var(--authors-analytics)"],
	});
	const patentApplicantsOptions = getBarChartOptions({
		data: byApplicants.slice(0, 15),
		colors: ["var(--organizations-analytics)"],
	});
	const patentYearsOptions = getYearChartOptions({
		data: patentsByYear,
		colors: ["var(--patents-analytics)"],
	});

	return (
		<>
			<Row gutters>
				<Col xs="12">
					<hr />
					<Title
						as="h2"
						look="h4"
					>{`${patentsCount} familles de brevet`}</Title>
					<div className="fr-notice fr-notice--info fr-mb-3w">
						<div className="fr-container">
							<div className="fr-notice__body">
								<p>
									<span className="fr-notice__title">
										Les filtres ne sont pas disponibles pour les brevets
									</span>
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
			</Row>
		</>
	);
}
