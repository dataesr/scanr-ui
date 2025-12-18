import {
	Breadcrumb,
	Col,
	Container,
	Link,
	Row,
  Text,
  Title,
} from "@dataesr/dsfr-plus";
import PublicationsAnalytics from "./publications";
import OpenalexAnalytics from "./openalex";
import PatentsAnalytics from "./patents";
import ProjectsAnalytics from "./projects";
import useUrl from "./hooks/useUrl.ts";
import { useState } from "react";

export default function Analytics() {
	const { currentQuery, handleQueryChange, currentTab, handleTabChange } = useUrl();
	const [q, setQ] = useState(currentQuery);

	const placeholder=`Exemple: \nfire AND mediterranean AND (forest OR vegetation)`



	return (
		<>
			<Container fluid className="bg-alt-grey fr-pb-0">
				<Container>
					<Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
						<Link href="/">Accueil</Link>
						<Link current>Analyses graphiques</Link>
					</Breadcrumb>
					<Row gutters className="">
					<Col xs="12">
					<Title look="h3" className="fr-mb-0">Analyse thématique</Title>
					</Col>
						<Col xs="12" lg="10">
						<div className="fr-search-bar fr-search-bar--lg fr-mt-1w" id="search-lg" role="search">
						<label className="fr-label" htmlFor="search-input-lg">Entrez votre équation de recherche :</label>
              <textarea value={q} onChange={(e) => setQ(e.target.value)} style={{ maxHeight: "12rem"}} className="fr-input" aria-describedby="search-input-lg-messages" placeholder={placeholder} id="search-input-lg" rows={4} />
              <button title="Rechercher" type="button" className="fr-btn" onClick={() => handleQueryChange(q)}>Rechercher</button>
            </div>
						<Text className="fr-mt-1w fr-mb-3w fr-message fr-message--info" size="xs">
              Vous pouvez utiliser les opérateurs AND, OR, NOT, et parenthèses pour créer des équations de recherche complexes.
						</Text>
						</Col>
					</Row>
					<nav className="fr-nav xfr-nav--horizontal" aria-label="Menu">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <button
              aria-current={currentTab === '1'}
              className="fr-nav__link"
              onClick={() => handleTabChange("1")}
            >
              Publications françaises
            </button>
          </li>
          <li className="fr-nav__item">
            <button
              onClick={() => handleTabChange("2")}
              aria-current={currentTab === '2'}
              className="fr-nav__link"
            >
              Publications internationales
            </button>
          </li>
          <li className="fr-nav__item">
            <button
              onClick={() => handleTabChange("3")}
              aria-current={currentTab === '3'}
              className="fr-nav__link"
            >
              Brevets français
            </button>
          </li>
          <li className="fr-nav__item">
            <button
              onClick={() => handleTabChange("4")}
              aria-current={currentTab === '4'}
              className="fr-nav__link"
            >
              Financements français et européens
            </button>
          </li>
        </ul>
      </nav>
				</Container>
			</Container>
			{currentQuery && (
				<Container className="fr-mt-5w">
					{ !['1', '2', '3', '4'].includes(currentTab) && <>Select a tab</> }
					{ currentTab === '1' && <PublicationsAnalytics /> }
					{currentTab === '2' && <OpenalexAnalytics />}
					{currentTab === '3' && <PatentsAnalytics />}
					{currentTab === '4' && <ProjectsAnalytics />}
				</Container>
			)}
			{!currentQuery && (
				<Container className="fr-my-15w">
					<i>Ajouter des termes de recherche pour obtenir des résultats.</i>
				</Container>
			)}
		</>
	);
}
