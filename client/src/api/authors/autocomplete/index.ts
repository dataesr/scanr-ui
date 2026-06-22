import { authorsIndex, postHeaders } from "../../../config/api"
import { LightAuthor } from "../../../types/author"
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
