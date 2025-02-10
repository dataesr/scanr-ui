import { patentsIndex, publicationsIndex } from "../../../config/api"
import { NetworkConfig } from "../../../types/network"
import { FIELDS as publicationsFields } from "../../publications/_utils/constants"
import { FIELDS as patentsFields, LIGHT_SOURCE as patentsSourceFields } from "../../patents/_utils/constants"
import { COLORS } from "../_utils/constants"

const publicationsSourceFields = [
  "id",
  "title.default",
  "year",
  "productionType",
  "isOa",
  "domains",
  "cited_by_counts_by_year",
]

export const CONFIG = {
  authors: {
    index: publicationsIndex,
    field: "authors.id_name",
    topics: "domains.label.default.keyword",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "authors.id_name"],
    aggregation: "authors.id_name.keyword",
    co_aggregation: "co_authors.keyword",
    url_page: "/authors",
    url_search: "/search/publications",
    terminology: {
      item: "author",
      items: "authors",
      link: "co-author link",
      links: "co-author links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  institutions: {
    index: publicationsIndex,
    field: "affiliations.id_name",
    topics: "domains.label.default.keyword",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "affiliations.id_name"],
    aggregation: "affiliations.id_name.keyword",
    co_aggregation: "co_institutions.keyword",
    url_page: "/organizations",
    url_search: "/search/publications",
    terminology: {
      item: "institution",
      items: "institutions",
      link: "co-institution link",
      links: "co-institution links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  structures: {
    index: publicationsIndex,
    field: "affiliations.id_name",
    topics: "domains.label.default.keyword",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "affiliations.id_name"],
    aggregation: "affiliations.id_name.keyword",
    co_aggregation: "co_structures.keyword",
    url_page: "/organizations",
    url_search: "/search/publications",
    terminology: {
      item: "structure",
      items: "structures",
      link: "co-structure link",
      links: "co-structure links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  domains: {
    index: publicationsIndex,
    field: "domains.id_name",
    topics: "domains.label.default.keyword",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "domains.id_name"],
    aggregation: "domains.id_name.keyword",
    co_aggregation: "co_domains.keyword",
    url_search: "/search/publications",
    terminology: {
      item: "topic",
      items: "topics",
      link: "co-topic link",
      links: "co-topic links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  software: {
    index: publicationsIndex,
    field: "software.id_name",
    topics: "domains.label.default.keyword",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "software.id_name"],
    aggregation: "software.id_name.keyword",
    co_aggregation: "co_software.keyword",
    url_search: "/search/publications",
    terminology: {
      item: "software",
      items: "software",
      link: "co-software link",
      links: "co-software links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  projects: {
    index: publicationsIndex,
    field: "projects.id_name",
    topics: "domains.label.default.keyword",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "projects.id_name"],
    aggregation: "projects.id_name.keyword",
    co_aggregation: "co_projects.keyword",
    url_page: "/projects",
    url_search: "/search/publications",
    terminology: {
      item: "project",
      items: "projects",
      link: "co-projects link",
      links: "co-projects links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  countries: {
    index: publicationsIndex,
    field: "affiliations.country",
    topics: "domains.label.default.keyword",
    search_fields: publicationsFields,
    source_fields: [...publicationsSourceFields, "affiliations.country"],
    aggregation: "affiliations.country.keyword",
    co_aggregation: "co_countries.keyword",
    url_search: "/search/publications",
    terminology: {
      item: "country",
      items: "countries",
      link: "co-countries link",
      links: "co-countries links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-publications",
      total_link_strength: "co-publications links",
    },
  },
  persons: {
    index: patentsIndex,
    field: "applicants.id_name",
    topics: "cpc.groupe.label.keyword",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "applicants.id_name"],
    aggregation: "applicants.id_name.keyword",
    co_aggregation: "co_persons.keyword",
    url_search: "/search/patents",
    terminology: {
      item: "person",
      items: "persons",
      link: "co-persons link",
      links: "co-persons links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
  organizations: {
    index: patentsIndex,
    field: "applicants.id_name",
    topics: "cpc.groupe.label.keyword",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "applicants.id_name"],
    aggregation: "applicants.id_name.keyword",
    co_aggregation: "co_organizations.keyword",
    url_page: "/organizations",
    url_search: "/search/patents",
    terminology: {
      item: "organization",
      items: "organizations",
      link: "co-organizations link",
      links: "co-organizations links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
  subclasses: {
    index: patentsIndex,
    field: "cpc.ss_classe.id_name",
    topics: "cpc.groupe.label.keyword",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "cpc.ss_classe.id_name"],
    aggregation: "cpc.ss_classe.id_name.keyword",
    co_aggregation: "co_cpc_ss_classe.keyword",
    url_search: "/search/patents",
    terminology: {
      item: "subclass",
      items: "subclasses",
      link: "co-subclasses link",
      links: "co-subclasses links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
  classes: {
    index: patentsIndex,
    field: "cpc.classe.id_name",
    topics: "cpc.groupe.label.keyword",
    search_fields: patentsFields,
    source_fields: [...patentsSourceFields, "cpc.classe.id_name"],
    aggregation: "cpc.classe.id_name.keyword",
    co_aggregation: "co_cpc_classe.keyword",
    url_search: "/search/patents",
    terminology: {
      item: "classe",
      items: "classes",
      link: "co-classes link",
      links: "co-classes links",
      cluster: "community",
      clusters: "communities",
      link_strength: "co-patents",
      total_link_strength: "co-patents links",
    },
  },
}

const configGetItemDescription = (source: string, model) =>
  `<div class='description_heading'>${
    CONFIG?.[model]?.url_page
      ? "<a class='description_url' href={page}>{label}</a>"
      : "<span class='description_label'>{label}</span>"
  }<br /><a class='description_url' href={search}>associated ${source.toLowerCase()}</a></div>`
const configGetLinkDescription = (model: string) =>
  `<div class='description_heading'>Co-${model} link</div><div class='description_label'>`

export function configGetItemPage(model: string, key: string): string {
  const targetUrl = CONFIG[model]?.url_page
  return targetUrl ? window.location.origin + `${targetUrl}/${key}` : undefined
}
export function configGetItemSearch(query: string, model: string, key: string, integration: string): string {
  const itemField = CONFIG[model].field
  const targetUrl = CONFIG[model].url_search
  const itemFilter = `${itemField}:${key}`
  const integrationFilter = integration ? ` AND bso_local_affiliations.keyword:${integration}` : ""

  if (!query) return window.location.origin.concat(targetUrl, `?q=${itemFilter}`, integrationFilter)
  if (query.includes(itemFilter)) return window.location.origin.concat(targetUrl, `?q=${query}`, integrationFilter)
  return window.location.origin.concat(targetUrl, `?q=(${query}) AND ${itemFilter}`, integrationFilter)
}

export default function configCreate(source: string, model: string): NetworkConfig {
  const templates = {
    item_description: configGetItemDescription(source, model),
    link_description: configGetLinkDescription(model),
  }
  const terminology = CONFIG?.[model]?.terminology

  const cluster_colors = COLORS.map((color, index) => ({ cluster: index + 1, color: color }))

  const config = {
    templates: templates,
    color_schemes: { cluster_colors: cluster_colors },
    ...(terminology && { terminology: terminology }),
  }

  return config
}
