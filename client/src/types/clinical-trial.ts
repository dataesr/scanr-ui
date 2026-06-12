import { ExternalIdsData } from "./commons"

export type ClinicalTrialAggregations = {
  byRor: string[];
};

export type LightClinicalTrial = {
  _id: string
  all_sources: string[]
  CTIS: string
  eudraCT: string
  id: string
  intervention_type: string
  lead_sponsor_normalized: string
  lead_sponsor_type: string
  location_country: string[]
  NCTId: string
  other_ids: ExternalIdsData[]
  results_details: object
  ror: string
  status_simplified: string
  study_completion_year: number
  study_start_year: number
  study_type: string
  summary: string
  title: string
}

export type ExportClinicalTrial = {
  _id: string
  all_sources: string[]
  CTIS: string
  eudraCT: string
  id: string
  intervention_type: string
  lead_sponsor_normalized: string
  lead_sponsor_type: string
  NCTId: string
  other_ids: ExternalIdsData[]
  ror: string
  status_simplified: string
  study_completion_year: number
  study_start_year: number
  study_type: string
  summary: string
  title: string
}