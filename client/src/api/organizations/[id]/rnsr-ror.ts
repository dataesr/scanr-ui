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

// TODO: type the array of objects returned by the promise
export async function getOrganizationRnsrRor(filters: Filter[], id: string, pagination: Pagination, sorting: Sort): Promise<any[]> {
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
    size: pagination?.size ?? 10,
    query: {
      bool: {
        filter: [
          { term: { "externalIds.type.keyword": "rnsr" } },
          { term: { "status.keyword": "active" } },
          { term: { "institutions.structure.keyword": id } },
        ],
      },
    },
  }
  if (sorting?.id) {
    body.sort = { [sorting.id]: sorting.order }
  }
  // if (filters.length > 0) {
  //   filters.forEach((filter) => {
  //     if (filter.id === 'id') {
  //       body.query.bool.filter.push({ match: { 'project_id.keyword': filter.value } })
  //     } else if (filter.id === 'instrument') {
  //       body.query.bool.filter.push({ match: { 'project_instrument.keyword': filter.value } })
  //     } else if (filter.id === 'label') {
  //       body.query.bool.filter.push({ wildcard: { 'project_label.keyword': {
  //         case_insensitive: true,
  //         value: `*${filter.value.toLowerCase()}*`,
  //       } } })
  //     } else if (filter.id === 'participantId') {
  //       body.query.bool.filter.push({ match: { 'participant_id.keyword': filter.value } })
  //     } else if (filter.id === 'participantLabel') {
  //       body.query.bool.filter.push({ wildcard: { 'participant_label.fr.keyword': {
  //         case_insensitive: true,
  //         value: `*${filter.value.toLowerCase()}*`,
  //       } } })
  //     } else if (filter.id === 'participationIsCoordinator') {
  //       body.query.bool.filter.push({ term: { participation_is_coordinator: filter.value === "1" } })
  //     } else if (filter.id === 'region') {
  //       body.query.bool.filter.push({ match: { 'participant_region_with_labs.keyword': filter.value } })
  //     } else if (filter.id === 'type') {
  //       body.query.bool.filter.push({ match: { 'project_type.keyword': filter.value } })
  //     } else if (filter.id === 'year') {
  //       body.query.bool.filter.push({ match: { project_year: filter.value } })
  //     } else {
  //       console.error(`Filter id not supported : ${filter.id}`)
  //     }
  //   })
  // }

  const rnsrRorQuery = await fetch(`${organizationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((r) => r.json())

  const results = [];
  (rnsrRorQuery?.hits?.hits ?? []).forEach((item) => {
    const result: any = {};
    // RNSR data
    (item?._source?.externalIds ?? [])
      .filter((externalId) => ["idref", "rnsr", "ror"].includes(externalId?.type))
      .forEach((externalId) => result[externalId.type] = externalId.id)
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

  return results;
}