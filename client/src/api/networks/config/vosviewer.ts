import { NetworkConfig } from "../../../types/network"
import { COLORS } from "../_utils/constants"
import { CONFIG } from "./elastic"

const configGetItemDescription = (source: string, model) =>
  `<div class='description_heading'>${
    CONFIG[source][model]?.url_page
      ? "<a class='description_url' href={page}>{label}</a>"
      : "<span class='description_label'>{label}</span>"
  }<br /><a class='description_url' href={search}>associated ${source.toLowerCase()}</a></div>`
const configGetLinkDescription = (model: string) =>
  `<div class='description_heading'>Co-${model} link</div><div class='description_label'>`

export function configGetItemPage(source: string, model: string, key: string): string {
  const targetUrl = CONFIG[source][model]?.url_page
  // special case for domains (link to wikidata)
  if (model === "domains") return `${targetUrl}/${key}`
  return targetUrl ? window.location.origin + `${targetUrl}/${key}` : undefined
}
export function configGetItemSearch(query: string, source: string, model: string, key: string, integration: string): string {
  const itemField = CONFIG[source][model].field + ".keyword"
  const targetUrl = CONFIG[source][model].url_search
  const itemFilter = `${itemField}:${key}`
  const integrationFilter = integration ? ` AND bso_local_affiliations.keyword:${integration.toLowerCase()}` : ""

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
