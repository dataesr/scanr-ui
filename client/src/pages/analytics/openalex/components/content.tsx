import { Col, Row } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import useOpenalexAnalyticsData from "../hooks/useOpenalexAnalyticsData.ts";


export default function OpenalexAnalyticsContent() {
	const { data, isLoading, isError } = useOpenalexAnalyticsData();
	if (isError) return "Une erreur est survenue";
	if (isLoading) return <AnalyticsSkeleton />;



	const {
		publicationYear,
		publicationType,
		authorshipsCountries,
		authorshipsAuthors,
		authorshipsAuthorsInstitutions,
		primaryTopic,
		// keywords,
		primaryLocationUrl,
		grantsFunder,
		// authorshipsAuthorsInstitutionsContinents,
	} = data;

	const openAlexPrimaryLocation = getBarChartOptions({
		data: primaryLocationUrl.slice(0, 20),
		colors: ["var(--publications-analytics)"],
	});

	// const openAlexContinents = getBarChartOptions({
	// 	data: authorshipsAuthorsInstitutionsContinents.slice(0, 20),
	// 	colors: ["var(--authors-analytics)"],
	// });

	const openAlexYearOptions = getYearChartOptions({
		data: publicationYear.sort((a, b) => a.value - b.value),
		colors: ["var(--artwork-minor-purple-glycine)"],
	});

	const openAlexTypeOptions = getBarChartOptions({
		data: publicationType.slice(0, 10),
		colors: ["var(--publications-analytics)"],
	});

	const openAlexCountriesOptions = getBarChartOptions({
		data: authorshipsCountries.map((country) => {
		if (country.label === "France") return { ...country, label: "🇫🇷 France" };
		return country;
		}).slice(0, 20),
		colors: ["var(--authors-analytics)"],
	});

	const openAlexAuthorsOptions = getBarChartOptions({
		data: authorshipsAuthors.slice(0, 20),
		colors: ["var(--authors-analytics)"],
	});

	const openAlexAuthorsInstitutionsOptions = getBarChartOptions({
		data: authorshipsAuthorsInstitutions.slice(0, 20),
		colors: ["var(--organizations-analytics)"],
	});

	// const openAlexKeywordsOptions = getBarChartOptions({
	// 	data: keywords.slice(0, 20),
	// 	colors: ["var(--background-contrast-success-active)"],
	// });

	const openAlexPrimaryTopicOptions = getBarChartOptions({
		data: primaryTopic.slice(0, 20),
		colors: ["var(--background-contrast-success-active)"],
	});

	const openAlexGrantsFunderOptions = getBarChartOptions({
		data: grantsFunder.slice(0, 20),
		colors: ["var(--projects-analytics)"],
	});


	return (
		<>
			<Row gutters>
				<Col xs="6">
					<AnalyticsGraph
						title="Publications par années"
						description="Dans les résultats de recherche"
						options={openAlexYearOptions}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Types de publications"
						description="Répartition des publications par type"
						options={openAlexTypeOptions}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Auteurs"
						description="Top 20 des auteurs"
						options={openAlexAuthorsOptions}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Pays"
						description="Top 20 des pays"
						options={openAlexCountriesOptions}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Financeurs"
						description="Top 20 des financeurs"
						options={openAlexGrantsFunderOptions}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Institutions"
						description="Top 20 des institutions"
						options={openAlexAuthorsInstitutionsOptions}
					/>
				</Col>
				{/*<Col xs="6">
					<AnalyticsGraph
						title="Keywords"
						description="Top 20 des mots-clés"
						options={openAlexKeywordsOptions}
					/>
				</Col>*/}
				<Col xs="6">
					<AnalyticsGraph
						title="Domaines de recherche"
						description="Top 20 des domaines de recherche"
						options={openAlexPrimaryTopicOptions}
					/>
				</Col>
				{/*<Col xs="6">
					<AnalyticsGraph
						title="Continents"
						description="Nombre de publications par continent"
						options={openAlexContinents}
					/>
				</Col>*/}
				<Col xs="6">
					<AnalyticsGraph
						title="Sources (Revues ou Entrepôts)"
						description="Top 20 des sources"
						options={openAlexPrimaryLocation}
					/>
				</Col>
			</Row>
		</>
	);
}
