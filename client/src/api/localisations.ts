import { localisationIndex, postHeaders } from "../config/api";
import { SearchArgs, SearchResponse, ElasticResult } from "../types/commons";

export type LocalisationAutocomplete = {
  autocompleted: string[];
}

export async function autocompleteLocalisations({ query }: SearchArgs): Promise<Pick<SearchResponse<LocalisationAutocomplete>, "data">> {
  const body: any = {
    size: 7,
    query: {
      match: {
        autocompleted: query,
      },
    },
  }

  const res = await fetch(
    `${localisationIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()

  const _data: ElasticResult<LocalisationAutocomplete>[] = data?.hits?.hits || []  

  
  
  return { data: _data}
}