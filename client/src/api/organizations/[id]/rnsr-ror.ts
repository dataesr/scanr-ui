import {
  organizationsIndex,
  postHeaders,
} from "../../../config/api"

// TODO: type the array of objects returned by the promise
export async function getOrganizationRnsrRor(id: string): Promise<any[]> {
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
    size: 2000,
    query: {
      bool: {
        filter: [
          { term: { "status.keyword": "active" } },
          { term: { "institutions.structure.keyword": id } },
        ],
      },
    },
  }

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
    result["rnsr_city"] = item?._source?.address?.[0]?.city
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
    result["ror_city"] = item?._source?.ror_infos?.address?.[0]?.city
    // Matches between RNSR and ROR
    result["rnsr_ror_city_match"] = result?.ror_city === result?.rnsr_city
    result["rnsr_ror_label_match"] = result?.ror_label === result?.rnsr_label
    result["rnsr_ror_creation_match"] = result?.ror_creation === result?.rnsr_creation
    results.push(result)
  })

  return results;
}