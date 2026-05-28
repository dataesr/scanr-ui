export const FIELDS = [
  "NCTId^10",
  "CTIS^10",
  "eudraCT^10",
  "other_ids.id^3",
  "title^3",
  "summary",
]

export const LIGHT_SOURCE = [
  "all_sources",
  "CTIS",
  "eudraCT",
  "intervention_type",
  "lead_sponsor_normalized",
  "lead_sponsor_type",
  "NCTId",
  "status_simplified",
  "study_completion_year",
  "study_start_year",
  "study_type",
  "summary",
  "title",
]

export const AUTHOR_SOURCE = [
  "_id",
  "id",
  "idref",
  "orcid",
  "fullName",
  "firstName",
  "lastName",
  "externalIds",
  "awards",
  "recentAffiliations",
  "domains",
]

export const PUBLICATION_LIGHT_SOURCE = [
  "title.*",
  "authors.fullName",
  "authors.person",
  "authors.role",
  "source.*",
  "isOa",
  "type",
  "id",
  "year",
]

export const CLINICAL_TRIAL_SOURCE = [
  "all_sources",
  "CTIS",
  "eudraCT",
  "id",
  "intervention_type",
  "lead_sponsor_normalized",
  "lead_sponsor_type",
  "NCTId",
  "other_ids",
  "status_simplified",
  "study_completion_year",
  "study_start_year",
  "study_type",
  "summary",
  "title",
]