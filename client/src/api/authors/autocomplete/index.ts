import { authorsIndex, postHeaders } from "../../../config/api"
import { LightAuthor, RecentAffiliation } from "../../../types/author"
import { SearchArgs, SearchResponse, ElasticResult } from "../../../types/commons"

const SOURCE = ["id", "fullName", "topDomains"]

export async function autocompleteAuthors({ query }: SearchArgs): Promise<Pick<SearchResponse<LightAuthor>, "data">> {
  const body: any = {
    _source: SOURCE,
    size: 7,
    query: {
      match: {
        autocompleted: query,
      },
    },
  }
  const res = await fetch(`${authorsIndex}/_search`, { method: "POST", body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const authors: ElasticResult<LightAuthor>[] = data?.hits?.hits || []

  return { data: authors }
}

export async function autocompleteAuthorsAffiliations({
  query,
  recent,
}: SearchArgs & { recent?: boolean }): Promise<Pick<SearchResponse<RecentAffiliation>, "data">> {
  const field = recent ? "recentAffiliations" : "affiliations"
  const sources = ["id", "mainAdress", "label"].map((s) => field + ".structure." + s)
  const body: any = {
    _source: sources,
    size: 7,
    query: {
      match: {
        [`${field}.structure.id_name`]: query, //TODO: add autocompleted field ?
      },
    },
  }
  const res = await fetch(`${authorsIndex}/_search`, { method: "POST", body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()

  console.log("data", data)
  console.log("data.hits.hits", data?.hits?.hits)

  const affiliations: ElasticResult<RecentAffiliation>[] = data?.hits?.hits || []

  console.log("affiliations", affiliations)
  const uniqueAffiliations = [...new Map(affiliations?.map((aff) => [aff?._source?.structure?.id, aff])).values()]
  console.log("uniqueAffiliations", uniqueAffiliations)
  return { data: uniqueAffiliations }
}
