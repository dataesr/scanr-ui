import { ExternalIdsData } from "./commons"

export type LightClinicalTrial = {
  all_sources: string[]
  CTIS: string
  eudraCT: string
  id: string
  intervention_type: string
  lead_sponsor_normalized: string
  lead_sponsor_type: string
  NCTId: string
  other_ids: ExternalIdsData[]
  status_simplified: string
  study_completion_year: number
  study_start_year: number
  study_type: string
  summary: string
  title: string
}