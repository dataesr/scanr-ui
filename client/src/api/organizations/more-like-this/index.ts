import { organizationsIndex, postHeaders } from "../../../config/api";
import { DEFAULT_FILTERS, LIGHT_SOURCE } from "../_utils/constants";

export async function getMoreOrganizationsLikeThis(id: string, filters?: any) {
  const body = JSON.stringify({
    _source: LIGHT_SOURCE,
    size: 3,
    query: {
      bool: {
        filter: [...DEFAULT_FILTERS, ...filters],
        must: [{
          more_like_this: {
            fields: ["publications.title.*", "web_content", "patents.title.*", "projects.label.*", "description.*"],
            like: [{ _id: id }],
            min_term_freq: 1,
            max_query_terms: 12,
          },
        }]
      }
    }
  })
  const res = await fetch(`${organizationsIndex}/_search`, { method: 'POST', body, headers: postHeaders })
  const data = await res.json();
  return data?.hits?.hits?.map(({ _source }) => _source) || []
}
