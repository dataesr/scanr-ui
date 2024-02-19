import { postHeaders } from "../../../config/api";
import { LightOrganization } from "../../../types/organization";
import { SearchArgs, SearchResponse, ElasticResult } from "../../../types/commons";

const SOURCE = [
  "id", "label", "address.main", "address.city",
]

export async function autocompleteOrganizations({ query }: SearchArgs): Promise<Pick<SearchResponse<LightOrganization>, "data">> {
  const body: any = {
    _source: SOURCE,
    size: 7,
    query: {
      multi_match: {
        query,
        type: "bool_prefix",
        fields: [
          "autocompleted",
          "autocompleted._2gram",
          "autocompleted._3gram"
        ]
      }
    },
  }
  const res = await fetch(
    "https://cluster-production.elasticsearch.dataesr.ovh/scanr-organizations-test/_search",
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()
  const orgs: ElasticResult<LightOrganization>[] = data?.hits?.hits || []
  console.log("orgs", orgs);
  
  
  return { data: orgs }
}