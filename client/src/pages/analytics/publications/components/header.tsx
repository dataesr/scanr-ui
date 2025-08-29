import { Button, Col, Row, Text, Title } from "@dataesr/dsfr-plus";

import CurrentFilters from "../../components/current-filters";
import Filters from "../components/filters/index.tsx";
import usePublicationsAnalyticsData from "../hooks/usePublicationsAnalyticsData.ts";
import useUrl from "../../hooks/useUrl.ts";
import BaseSkeleton from "../../../../components/skeleton/base-skeleton.tsx";

export default function PublicationsAnalyticsHeader() {
  const { currentQuery, currentFilters } = useUrl();
	const { data, isLoading, isError } = usePublicationsAnalyticsData();
	if (isError) return "Une erreur est survenue";

	const bluidSearchUrl = () => {
    const searchParams = new URLSearchParams()
    searchParams.set("q", currentQuery);
    searchParams.set("filters", JSON.stringify(currentFilters));
		return `/search/publications?${searchParams.toString()}`;
	}

	return (
		<>
			{/*<div className="fr-hr-or" >{isLoading ? "Chargement..." :"Résultats"}</div>*/}
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
						<Title
							as="h2"
							className="fr-mb-0 fr-text--lg"
						>
							{isLoading ? <BaseSkeleton width="200px" height="28px" /> : `${data?.publicationsCount}  publications françaises`}
							<Text size="xs" className="fr-text--regular fr-text-mention--grey fr-pr-5w">
								pour la recherche <b>{currentQuery}</b>
							</Text>
						</Title>
						<Button className="no-text-wrap" size="sm" target="_blank" rel="noopener noreferrer" variant="text" as="a" href={bluidSearchUrl()}>
              Explorer la liste
						</Button>
					</div>
					<CurrentFilters FilterModal={Filters} />
					<hr />
				</Col>
			</Row>
		</>
	);
}
