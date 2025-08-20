import { Col, Row, Title } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../components/analytics-graph";
import getBarChartOptions from "../../../components/analytics-graph/graph-options/bar";
import getYearChartOptions from "../../../components/analytics-graph/graph-options/years";
import AnalyticsSkeleton from "../../../components/skeleton/analytics-skeleton";
import useOpenalexAnalyticsData from "./hooks/useOpenalexAnalyticsData.ts";


export default function OpenalexAnalytics() {
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
		keywords,
		primaryLocationUrl,
		grantsFunder,
		authorshipsAuthorsInstitutionsContinents,
	} = data;

	const openAlexPrimaryLocation = getBarChartOptions({
		data: primaryLocationUrl.slice(0, 20),
		colors: ["var(--publications-analytics)"],
	});

	const openAlexContinents = getBarChartOptions({
		data: authorshipsAuthorsInstitutionsContinents.slice(0, 20),
		colors: ["var(--authors-analytics)"],
	});

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

	const openAlexKeywordsOptions = getBarChartOptions({
		data: keywords.slice(0, 20),
		colors: ["var(--background-contrast-success-active)"],
	});

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
				<Col xs="12">
					<hr />
					<Title as="h2" look="h4">
						A l'international
					</Title>
					<hr />
				</Col>
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
						title="Grants"
						description="Top 20 des grants"
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
				<Col xs="6">
					<AnalyticsGraph
						title="Keywords"
						description="Top 20 des mots-clés"
						options={openAlexKeywordsOptions}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Primary Topics"
						description="Top 20 des topics"
						options={openAlexPrimaryTopicOptions}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Continents"
						description="Top 20 des continents"
						options={openAlexContinents}
					/>
				</Col>
				<Col xs="6">
					<AnalyticsGraph
						title="Primary Locations"
						description="Top 20 des localisations primaires"
						options={openAlexPrimaryLocation}
					/>
				</Col>
			</Row>
		</>
	);
}
