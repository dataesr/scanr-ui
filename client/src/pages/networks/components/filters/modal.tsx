import { useState } from "react"
import { useIntl } from "react-intl"
import { useSearchParams } from "react-router-dom"
import { Badge, Button, Container, Text, Title } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useNetworkContext } from "../../context/hook"
import useUrl from "../../../search/hooks/useUrl"
import SourcesFilters from "./sources"
import NetworkFiltersPatents from "./patents"
import NetworkFiltersProjects from "./projects"
import NetworkFiltersPublications from "./publications"
import ModelFilters from "./model"
import NetworkFiltersAuthors from "./authors"
import NetworkFiltersOrganizations from "./organizations"

const SOURCE_FILTERS = {
  publications: <NetworkFiltersPublications />,
  patents: <NetworkFiltersPatents />,
  projects: <NetworkFiltersProjects />,
}

const MODEL_FILTERS = {
  domains: null,
  authors: <NetworkFiltersAuthors />,
  institutions: <NetworkFiltersOrganizations />,
  structures: <NetworkFiltersOrganizations isStructure />,
  software: null,
  projects: <NetworkFiltersProjects as="model" />,
  countries: null,
  persons: null,
  organizations: null,
  sublcasses: null,
  classes: null,
}

export default function NetworkFiltersModal() {
  const intl = useIntl()
  const [searchParams, setSearchParams] = useSearchParams()
  const [tab, setTab] = useState<number>(0)
  const { filters } = useUrl()
  const { filters: nfilters } = useUrl("nfilters")
  const {
    options: { currentSource, currentModel, parameters },
  } = useNetworkContext()
  const id = "networks-options-filters-modal"

  const clearFilters = (tab: number) => {
    if (tab === 0) searchParams.delete("filters")
    if (tab === 1) searchParams.delete("nfilters")
    searchParams.delete("filterNodes")
    setSearchParams(searchParams)
  }

  return (
    <>
      <Modal id={id} size="lg">
        <nav
          className="fr-nav xfr-nav--horizontal"
          aria-label="Menu"
          style={{ display: "flex", width: "100%", alignItems: "center" }}
        >
          <ul className="fr-nav__list" style={{ display: "flex", width: "100%", margin: 0, padding: 0 }}>
            <li className="fr-nav__item" style={{ flex: 1 }}>
              <button
                className="fr-nav__link"
                style={{ width: "100%", textAlign: "center" }}
                aria-current={tab === 0}
                onClick={() => setTab(0)}
              >
                <span className="fr-icon-article-line fr-mr-1w" aria-hidden="true" />
                <Text as="span" size="lg" bold className="fr-mr-1w">
                  {intl.formatMessage({ id: "networks.filters.modal.source.title" })}
                </Text>
                <Badge className="fr-ml-1w" size="md" color="blue-ecume">
                  {filters.length || 0}
                </Badge>
              </button>
            </li>
            <li className="fr-nav__item" style={{ flex: 1 }}>
              <button
                className="fr-nav__link"
                style={{ width: "100%", textAlign: "center", fontWeight: 500, fontSize: "1.2rem" }}
                aria-current={tab === 1}
                onClick={() => setTab(1)}
              >
                <span className="fr-icon-network-line fr-mr-1w" aria-hidden="true" />
                <Text as="span" size="lg" bold className="fr-mr-1w">
                  {intl.formatMessage({ id: "networks.filters.modal.model.title" })}
                </Text>
                <Badge className="fr-ml-1w" size="md" color="blue-ecume">
                  {nfilters.length || 0 + parameters.filterNodes?.length || 0}
                </Badge>
              </button>
            </li>
          </ul>
        </nav>
        <Container className="fr-px-2w fr-py-5w fr-card">
          {tab === 0 && (
            <Container fluid>
              <Title as="h3">
                {intl.formatMessage({ id: "networks.filters.modal.title-plural" })}{" "}
                {intl.formatMessage({ id: `networks.source.${currentSource}` }).toLowerCase()}
              </Title>
              {SOURCE_FILTERS[currentSource]}
              <SourcesFilters />
            </Container>
          )}
          {tab === 1 && (
            <Container fluid>
              <Title as="h3">
                {intl.formatMessage({ id: "networks.filters.modal.title-plural" })}{" "}
                {intl.formatMessage({ id: `networks.model.${currentModel}` }).toLowerCase()}
              </Title>
              <ModelFilters />
              {MODEL_FILTERS[currentModel]}
            </Container>
          )}
        </Container>
        <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            <Button variant="secondary" onClick={() => clearFilters(tab)}>
              {intl.formatMessage({ id: "networks.filters.modal.clear" })}
              <Badge className="fr-ml-1w" size="md" color="blue-ecume">
                {tab === 0 ? filters?.length || 0 : nfilters?.length || 0 + parameters.filterNodes?.length || 0}
              </Badge>
            </Button>
          </div>
          <Button aria-controls={id}>{intl.formatMessage({ id: "networks.filters.modal.display" })}</Button>
        </div>
      </Modal>
    </>
  )
}
