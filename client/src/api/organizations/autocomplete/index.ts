import { organizationsIndex, postHeaders } from "../../../config/api";
import { LightOrganization } from "../../../types/organization";
import { SearchArgs, SearchResponse, ElasticResult } from "../../../types/commons";

const SOURCE = ["id", "label", "address.main", "address.city", "publicationsCount", "projectsCount", "patentsCount"]

export async function autocompleteOrganizations({ query }: SearchArgs): Promise<Pick<SearchResponse<LightOrganization>, "data">> {
  const body: any = {
    _source: SOURCE,
    size: 7,
    query: {
      bool: {
        filter: [
          { term: { isFrench: true } },
          { term: { status: "active" } },
        ],
        must: {
          match_phrase_prefix: {
            autocompletedText: {
              query,
              max_expansions: 10
            }
          }
        }
      },
    },
  }
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const orgs: ElasticResult<LightOrganization>[] = data?.hits?.hits || []

  return { data: orgs }
}
