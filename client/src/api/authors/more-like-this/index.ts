import { authorsIndex, postHeaders } from "../../../config/api";
import { LIGHT_SOURCE } from "../_utils/constants";

export async function getMoreAuthorsLikeThis(id: string) {
  const body = JSON.stringify({
    _source: LIGHT_SOURCE,
    size: 3,
    query: {
      bool: {
        must: [{
          more_like_this: {
            fields: ["domains.label.*"],
            like: [{ _id: id }],
            min_term_freq: 1,
            max_query_terms: 12,
          },
        }]
      }
    }
  })
  const res = await fetch(`${authorsIndex}/_search`, { method: 'POST', body, headers: postHeaders })
  const data = await res.json();
  return data?.hits?.hits?.map(({ _source }) => _source) || []
}