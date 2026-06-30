import {
  organizationsIndex,
  postHeaders,
} from "../../../config/api"

const normalize = (str: string) => str
  ?.normalize("NFD")
  ?.replace(/[\u0300-\u036f]/g, "")
  ?.toLowerCase()
  ?? ""

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

export async function getOrganizationReferences(filters: Filter[], id: string, pagination: Pagination, sorting: Sort): Promise<{ aggregations: { rnsr_level: any[], rnsr_ror_match: any[] }, results: any[] }> {
  if (!id) return { aggregations: { rnsr_level: [], rnsr_ror_match: [] }, results: [] }
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
        if (!["idref", "rnsr_ror_match", "ror"].includes(filter.id)) console.error(`Filter id not supported : ${filter.id}`)
      }
    })
  }

  const organizationsQuery = fetch(`${organizationsIndex}/_search`, {
    body: JSON.stringify(body),
    headers: postHeaders,
    method: "POST",
  }).then((r) => r.json())
  const rnsrReferencesQuery = fetch("https://pydref.staging.dataesr.ovh/rnsr_alignements").then((r) => r.json())
  const [organizationsResponses, rnsrReferencesResponses] = await Promise.all([organizationsQuery, rnsrReferencesQuery])

  let results = [];
  (organizationsResponses?.hits?.hits ?? []).forEach((item) => {
    const result: any = {};
    // RNSR data
    const rnsr = item?._source?.externalIds?.find((id) => id?.type === "rnsr")?.id
    result["id"] = rnsr
    result["rnsr"] = rnsr
    result["rnsr_label"] = item?._source?.label?.fr
    result["rnsr_level"] = item?._source?.level
    result["rnsr_address"] = item?._source?.address?.[0]?.address?.replace(/œ/gi, 'oe')?.replace(/’/gi, '\'')
    result["rnsr_city"] = item?._source?.address?.[0]?.city?.replace(/œ/gi, 'oe')?.replace(/’/gi, '\'')
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
    if (rnsr && rnsrReferencesResponses?.[rnsr]) {
      result["idref"] = rnsrReferencesResponses[rnsr].find((item) => item.type === "idref")?.id
      result["ror"] = rnsrReferencesResponses[rnsr].find((item) => item.type === "ror")?.id
    }
    // ROR data
    result["ror_label"] = item?._source?.ror_infos?.label?.default?.replace(/œ/gi, 'oe')?.replace(/’/gi, '\'')
    result["ror_creation"] = item?._source?.ror_infos?.creationYear
    result["ror_city"] = item?._source?.ror_infos?.address?.[0]?.city?.replace(/œ/gi, 'oe')?.replace(/’/gi, '\'')
    // Matches between RNSR and ROR
    result["rnsr_ror_city_match"] = !result?.rnsr_city || result.rnsr_city == '' || !result?.ror_city || result.ror_city === '' ? undefined : normalize(result?.rnsr_city) === normalize(result?.ror_city)
    result["rnsr_ror_creation_match"] = !result?.rnsr_creation || result.rnsr_creation === '' || !result?.ror_creation || result.ror_creation === '' ? undefined : result?.rnsr_creation === result?.ror_creation
    result["rnsr_ror_label_match"] = !result?.rnsr_label || result.rnsr_label === '' || !result?.ror_label || result.ror_label === '' ? undefined : normalize(result?.rnsr_label) === normalize(result?.ror_label)
    result["rnsr_ror_match"] = result.rnsr_ror_city_match === undefined || result.rnsr_ror_label_match === undefined ? undefined : result.rnsr_ror_city_match && result.rnsr_ror_label_match
    results.push(result)
  })
  // Apply specific filters based on field not on ES but computed after the ES query
  const idrefFilter = filters.find((filter) => filter?.id === "idref" && filter?.value === "missing")
  if (idrefFilter) {
    results = results.filter((result) => result?.idref === undefined)
  }
  const rorFilter = filters.find((filter) => filter?.id === "ror" && filter?.value === "missing")
  if (rorFilter) {
    results = results.filter((result) => result?.ror === undefined)
  }
  const rnsrRorMatchFilter = filters.find((filter) => filter.id === "rnsr_ror_match")
  let v = undefined;
  if (rnsrRorMatchFilter) {
    switch (rnsrRorMatchFilter.value) {
      case 'true':
        v = true
        break
      case 'false':
        v = false
        break
    }
    results = results.filter((result) => result.rnsr_ror_match === v)
  }

  const rnsr_ror_match = [
    { key: 'undefined', count: results.filter((result) => result?.rnsr_ror_match === undefined).length, value: undefined },
    { key: 'true', count: results.filter((result) => result.rnsr_ror_match === true).length, value: true },
    { key: 'false', count: results.filter((result) => result.rnsr_ror_match === false).length, value: false },
  ]
  const rnsrLevelsTmp = {}
  results.forEach((result) => {
    if (!Object.keys(rnsrLevelsTmp).includes(result?.rnsr_level)) rnsrLevelsTmp[result?.rnsr_level] = 0
    rnsrLevelsTmp[result?.rnsr_level] += 1
  })
  const rnsr_level = Object.keys(rnsrLevelsTmp).map((key) => ({ key, count: rnsrLevelsTmp[key], label: key, value: key }))


  return { aggregations: { rnsr_level, rnsr_ror_match }, results };
}

export async function getRnsrReferences(): Promise<any> {
  const references = await fetch("https://pydref.staging.dataesr.ovh/rnsr_alignements").then((r) => r.json())
  return references
}