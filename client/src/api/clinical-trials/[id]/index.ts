import {
  clinicalTrialsIndex,
  postHeadersBso,
} from "../../../config/api";
import type { LightClinicalTrial } from "../../../types/clinical-trial";
import { CLINICAL_TRIAL_SOURCE } from "../_utils/constants";

export async function getClinicalTrialById(id: string): Promise<LightClinicalTrial> {
  const queryBody = {
    _source: CLINICAL_TRIAL_SOURCE,
    query: { bool: { should: [
      { term: { "NCTId.keyword": id } },
      { term: { "eudraCT.keyword": id } },
      { term: { "CTIS.keyword": id } },
    ] } },
  }
  const res = await fetch(`${clinicalTrialsIndex}/_search`, {
    body: JSON.stringify(queryBody),
    headers: postHeadersBso,
    method: "POST",
  })
  const data = await res.json()
  const clinicalTrial = data?.hits?.hits?.[0]?._source
  if (!clinicalTrial) throw new Error("404")
  return { ...clinicalTrial, _id: data?.hits?.hits?.[0]._id }
}
