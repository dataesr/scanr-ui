import {
	Breadcrumb,
	Col,
	Container,
	Link,
	Row,
	SearchBar,
    Text,
} from "@dataesr/dsfr-plus";
import PublicationsAnalytics from "./publications";
import OpenalexAnalytics from "./openalex";
import PatentsAnalytics from "./patents";
import ProjectsAnalytics from "./projects";
import useUrl from "./hooks/useUrl.ts";

export default function Analytics() {
	const { currentQuery, handleQueryChange, currentTab, handleTabChange } = useUrl();



	return (
		<>
			<Container fluid>
				<Container>
					<Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
						<Link href="/">Accueil</Link>
						<Link current>Analyses</Link>
					</Breadcrumb>
					<Row gutters className="">
						<Col xs="12" sm="9" lg="9">
						<SearchBar
								label="Commencez par entrer votre équation de recherche"
								key={currentQuery}
								isLarge
								buttonLabel="Recherche"
								defaultValue={currentQuery || ""}
								placeholder="Entrez votre équation de recherche"
								onSearch={(value) => handleQueryChange(value)}
							/>
						<Text className="fr-mt-1w" size="xs">
              Vous pouvez utiliser les opérateurs AND, OR, NOT, et parenthèses pour créer des équations de recherche complexes.
						</Text>
						</Col>
					</Row>

					<fieldset className="fr-segmented fr-segmented--sm fr-mb-3w">
              <legend className="fr-segmented__legend">
                Sélection du corpus à analyser:
              </legend>
              <div className="fr-segmented__elements">
                  <div className="fr-segmented__element">
                      <input
                        onChange={(e) => e.target.checked && handleTabChange('1')}
                        value="1"
                        checked={currentTab === '1'}
                        type="radio"
                        id="segmented-1"
                        name="segmented"
                      />
                      <label className="fr-label" htmlFor="segmented-1">
                        Publications françaises
                      </label>
                  </div>
                  <div className="fr-segmented__element">
                      <input
                        onChange={(e) => e.target.checked && handleTabChange('2')}
                        value="2"
                        checked={currentTab === '2'}
                        type="radio"
                        id="segmented-2"
                        name="segmented"
                      />
                      <label className="fr-label" htmlFor="segmented-2">
                        Publications internationales
                      </label>
                  </div>
                  <div className="fr-segmented__element">
                      <input
                        onChange={(e) => e.target.checked && handleTabChange('3')}
                        value="3"
                        checked={currentTab === '3'}
                        type="radio"
                        id="segmented-3"
                        name="segmented"
                      />
                      <label className="fr-label" htmlFor="segmented-3">
                        Brevets français
                      </label>
                  </div>
                  <div className="fr-segmented__element">
                      <input
                        onChange={(e) => e.target.checked && handleTabChange('4')}
                        value="4"
                        checked={currentTab === '4'}
                        type="radio"
                        id="segmented-4"
                        name="segmented"
                      />
                      <label className="fr-label" htmlFor="segmented-4">
                        Financements français et européens
                      </label>
                  </div>
              </div>
          </fieldset>
				</Container>
			<hr />
			</Container>
			{currentQuery && (
				<Container className="fr-mt-3w">
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
