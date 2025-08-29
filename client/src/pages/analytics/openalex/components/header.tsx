import { Button, Col, Row, Text, Title } from "@dataesr/dsfr-plus";
import useOpenalexAnalyticsData from "../hooks/useOpenalexAnalyticsData.ts";
import useUrl from "../../hooks/useUrl";
import BaseSkeleton from "../../../../components/skeleton/base-skeleton.tsx";
import CurrentFilters from "../../components/current-filters.tsx";
import Filters from "./filters/index.tsx";


export default function OpenalexAnalyticsHeader() {
  const { data, isLoading } = useOpenalexAnalyticsData();
  const {currentQuery, currentFilters} = useUrl();

    console.log("buildSearchURL", currentFilters)
  const buildSearchUrl = () => {
    const baseUrl = "https://openalex.org/works?page=1&filter=";
    // /* @ts-expect-error unknown */

    const [yearMin, yearMax] = currentFilters?.year?.values?.map((year) => year.value) || [];
    const types = currentFilters?.type?.values?.map((type) => `types/${type.value}`).join("|") || "";

		const yearsFilter = (yearMin && yearMax) ? `publication_year:${yearMin}-${yearMax}` : "";
		const typesFilter = types ? `type:${types}` : "";

		const finalQuery= [`title_and_abstract.search:${currentQuery}`, typesFilter, yearsFilter].filter(Boolean).join(",")
		console.log(finalQuery)
		return baseUrl + finalQuery;
  };

	return (
			<Row gutters>
				<Col xs="12">
				<div
					className="fr-mb-1w"
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						gap: "1rem",
					}}
				>
					<Title as="h2" className="fr-mb-0 fr-text--lg">
            {isLoading ? <BaseSkeleton width="200px" height="28px" /> : `${data?.total}  publications internationales`}
            <Text size="xs" className="fr-text--regular fr-text-mention--grey fr-pr-5w">
              pour la recherche <b>{currentQuery}</b>
            </Text>
					</Title>
					<Button className="no-text-wrap" size="sm" target="_blank" rel="noopener noreferrer" variant="text" as="a" href={buildSearchUrl()}>
            Explorer la liste
					</Button>
				</div>
					<CurrentFilters FilterModal={Filters} />
					<hr />
				</Col>
			</Row>
	);
}
