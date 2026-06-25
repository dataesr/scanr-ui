import {
  organizationsIndex,
  postHeaders,
} from "../../../config/api"

const normalize = (str: string) => str
  ?.normalize("NFD")
  ?.replace(/[\u0300-\u036f]/g, "")
  ?.toLowerCase()
  ?? ''

type Filter = {
  id: string
  value: string
}

type Pagination = {
  from: number
  size: number
}

type Sort = {
  id: string
  order: 'asc' | 'desc'
} | Record<string, never>

export async function getOrganizationReferences(filters: Filter[], id: string, pagination: Pagination, sorting: Sort): Promise<{ aggregations: { rnsr_level?: { buckets: any[] } }, results: any[] }> {
  if (!id) return { aggregations: {}, results: [] }
  const body: any = {
    _source: [
      "acronym",
      "address",
      "creationYear",
      "externalIds",
      "id",
      "institutions",
      "label",
      "level",
      "ror_infos",
    ],
    from: pagination?.from ?? 0,
    size: pagination?.size ?? 100,
    query: {
      bool: {
        filter: [
          { term: { "externalIds.type.keyword": "rnsr" } },
          { term: { "status.keyword": "active" } },
          { term: { "institutions.structure.keyword": id } },
        ],
        must_not: [],
      },
    },
    aggregations: {
      rnsr_level: { terms: { field: 'level.keyword' } },
    },
  }
  if (sorting?.id) {
    body.sort = { [sorting.id]: sorting.order }
  }
  if (filters.length > 0) {
    filters.forEach((filter) => {
      if (filter.id === 'id') {
        body.query.bool.filter.push({ match: { 'id.keyword': filter.value } })
      } else if (filter.id === 'rnsr_level') {
        body.query.bool.filter.push({ match: { 'level.keyword': filter.value } })
      } else if (filter.id === 'ror' && filter.value === 'missing') {
        body.query.bool.must_not.push({ match: { 'externalIds.type.keyword': 'ror' } })
      } else if (filter.id === 'idref' && filter.value === 'missing') {
        body.query.bool.must_not.push({ match: { 'externalIds.type.keyword': 'idref' } })
      } else {
        console.error(`Filter id not supported : ${filter.id}`)
      }
    })
  }

  const organizations = await fetch(`${organizationsIndex}/_search`, {
    body: JSON.stringify(body),
    headers: postHeaders,
    method: "POST",
  }).then((r) => r.json())

  const results = [];
  (organizations?.hits?.hits ?? []).forEach((item) => {
    const result: any = {};
    // RNSR data
    const rnsr = item?._source?.externalIds?.find((id) => id?.type === "rnsr")?.id
    result["id"] = rnsr
    result["rnsr"] = rnsr
    result["rnsr_label"] = item?._source?.label?.fr
    result["rnsr_level"] = item?._source?.level
    result["rnsr_address"] = item?._source?.address?.[0]?.address
    result["rnsr_city"] = item?._source?.address?.[0]?.city?.replace('œ', 'oe')
    result["rnsr_acronym"] = item?._source?.acronym?.fr
    result["rnsr_creation"] = item?._source?.creationYear
    let isTutelle = false // pour s'assurer que etab_id est bien dans les tutelles vivantes (et pas slt participant)
    const tutelles = [];
    (item?._source?.institutions ?? [])
      .filter((institution) => institution?.relationType === "établissement tutelle" && !institution?.endDate)
      .forEach((institution) => {
        if (institution?.structure === id) isTutelle = true
        tutelles.push({ id: institution?.denormalized?.id, label: institution?.denormalized?.acronym?.default ?? institution?.denormalized?.label?.fr })
      })
    if (!isTutelle) return
    result["rnsr_tutelles"] = tutelles
    // ROR data
    result["ror_label"] = item?._source?.ror_infos?.label?.default
    result["ror_creation"] = item?._source?.ror_infos?.creationYear
    result["ror_city"] = item?._source?.ror_infos?.address?.[0]?.city?.replace('œ', 'oe')
    // Matches between RNSR and ROR
    result["rnsr_ror_city_match"] = !result?.rnsr_city || result.rnsr_city == '' || !result?.ror_city || result.ror_city === '' ? undefined : normalize(result?.rnsr_city) === normalize(result?.ror_city)
    result["rnsr_ror_creation_match"] = !result?.rnsr_creation || result.rnsr_creation === '' || !result?.ror_creation || result.ror_creation === '' ? undefined : result?.rnsr_creation === result?.ror_creation
    result["rnsr_ror_label_match"] = !result?.rnsr_label || result.rnsr_label === '' || !result?.ror_label || result.ror_label === '' ? undefined : normalize(result?.rnsr_label) === normalize(result?.ror_label)
    results.push(result)
  })
  const aggregations = organizations.aggregations

  return { aggregations, results };
}

export async function getRnsrReferences(): Promise<any> {
  const references = await fetch("https://pydref.staging.dataesr.ovh/rnsr_alignements").then((r) => r.json())
  return references
}