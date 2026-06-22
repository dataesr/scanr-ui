// import { useState } from "react"
import { useIntl } from "react-intl"
import { Button, Container, Tab, Tabs, Title } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useNetworkContext } from "../../context/hook"
import SourcesFilters from "./sources"
import NetworkFiltersPatents from "./patents"
import NetworkFiltersProjects from "./projects"
import NetworkFiltersPublications from "./publications"
// import useUrl from "../../../search/hooks/useUrl"
import ModelFilters from "./model"
import NetworkFiltersAuthors from "./authors"
import NetworkFiltersOrganizations from "./organizations"
import { useSearchParams } from "react-router-dom"

const SOURCE_FILTERS = {
  publications: <NetworkFiltersPublications />,
  patents: <NetworkFiltersPatents />,
  projects: <NetworkFiltersProjects />,
}

const MODEL_FILTERS = {
  domains: null,
  authors: <NetworkFiltersAuthors />,
  institutions: <NetworkFiltersOrganizations />,
  structures: null,
  software: null,
  projects: null,
  countries: null,
  persons: null,
  organizations: null,
  sublcasses: null,
  classes: null,
}

export default function NetworkFiltersModal() {
  const intl = useIntl()
  const [searchParams, setSearchParams] = useSearchParams()
  // const [tab, setTab] = useState<number>(0)
  const {
    options: { currentSource, currentModel },
  } = useNetworkContext()
  const id = "networks-options-filters-modal"

  const clearFilters = () => {
    searchParams.delete("filters")
    searchParams.delete("nfilters")
    searchParams.delete("filterNodes")
    setSearchParams(searchParams)
  }

  return (
    <>
      <Modal id={id} size="lg">
        {/*<nav
          className="fr-nav xfr-nav--horizontal"
          aria-label="Menu"
          style={{ display: "flex", width: "100%", alignItems: "center" }}
        >
          <ul className="fr-nav__list" style={{ display: "flex", width: "100%", margin: 0, padding: 0 }}>
            <li className="fr-nav__item" style={{ flex: 1 }}>
              <button
                className="fr-nav__link"
                style={{ width: "100%", textAlign: "center", fontSize: "1.1rem" }}
                aria-current={tab === 0}
                onClick={() => setTab(0)}
              >
                <div>{intl.formatMessage({ id: "networks.filters.modal.source.title" })}</div>
                <div>{`( ${intl.formatMessage({ id: `networks.source.${currentSource}` })} )`}</div>
              </button>
            </li>
            <li className="fr-nav__item" style={{ flex: 1 }}>
              <button
                className="fr-nav__link"
                style={{ width: "100%", textAlign: "center", fontSize: "1.1rem" }}
                aria-current={tab === 1}
                onClick={() => setTab(1)}
                disabled={MODEL_FILTERS[currentModel] === null}
              >
                <div>{intl.formatMessage({ id: "networks.filters.modal.model.title" })}</div>
                <div>{`( ${intl.formatMessage({ id: `networks.model.${currentModel}` })} )`}</div>
              </button>
            </li>
          </ul>
        </nav>
         <Container className="fr-px-2w fr-my-5w">
          {tab === 0 && (
            <Container fluid>
              {SOURCE_FILTERS[currentSource]}
              <SourcesFilters />
            </Container>
          )}
          {tab === 1 && <Container fluid>{MODEL_FILTERS[currentModel]}</Container>}
        </Container> */}
        <Container fluid>
          <Tabs>
            <Tab icon="article-line" label={intl.formatMessage({ id: "networks.filters.modal.source.title" })}>
              <Title as="h3">
                {intl.formatMessage({ id: "networks.filters.modal.title-plural" })}{" "}
                {intl.formatMessage({ id: `networks.source.${currentSource}` }).toLowerCase()}
              </Title>
              {SOURCE_FILTERS[currentSource]}
              <SourcesFilters />
            </Tab>
            <Tab icon="network-line" label={intl.formatMessage({ id: "networks.filters.modal.model.title" })}>
              <Title as="h3">
                {intl.formatMessage({ id: "networks.filters.modal.title-plural" })}{" "}
                {intl.formatMessage({ id: `networks.model.${currentModel}` }).toLowerCase()}
              </Title>
              <ModelFilters />
              {MODEL_FILTERS[currentModel]}
            </Tab>
          </Tabs>
        </Container>
        <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            <Button variant="secondary" onClick={clearFilters}>
              {intl.formatMessage({ id: "networks.filters.modal.clear" })}
            </Button>
          </div>
          <Button aria-controls={id}>{intl.formatMessage({ id: "networks.filters.modal.display" })}</Button>
        </div>
      </Modal>
    </>
  )
}
