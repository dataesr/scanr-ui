import { Col, Row, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import usePatentsAnalyticsData from "../hooks/usePatentsAnalyticsData";
import CpcChart from "../../../../components/patent-chart/cpc";



export default function PatentsAnalyticsContent() {
	const { data, isLoading, isError } = usePatentsAnalyticsData();
	if (isError) return "Une erreur est survenue";
	if (isLoading) return <AnalyticsSkeleton />;

	const {
		byInventors,
		byApplicants,
		patentsCount,
		byYear,
		byCpc,
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
		data: byYear,
		colors: ["var(--patents-analytics)"],
	});

	return (
		<>
			<Row gutters>
				<Col xs="12">
					<Title
						as="h2"
						look="h4"
					>{`${patentsCount} familles de brevet`}</Title>

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
            <div className="fr-pb-3w">
              <div style={{ display: 'flex', alignItems: 'start' }}>
                <div style={{ flexGrow: 1 }}>
                  <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
                    Répartition par classification CPC
                  </Title>
                  <p className="fr-text--xs fr-text-mention--grey">Domaines technologiques identifiés dans les familles de brevets</p>
                </div>
              </div>
              <div style={{ height: "600px"}}>
                <CpcChart data={byCpc} />
              </div>
            </div>
				</Col>
			</Row>
		</>
	);
}
