export const FIELDS = [
  "id.keyword^10",
  "title_abs_text^3",
  "inpadocFamily.keyword^10",
  "patents.id.keyword^10",
  "patents.publicationNumber.keyword^10",
  "title.*^3",
  "summary.*^3",
  "domains.label.*",
  "domains.code^5",
  "inventors.name",
  "inventors.ids.id.keyword^3",
  "applicants.name",
  "applicants.ids.id.keyword^3",
  "cpc.groupe.code.keyword",
  "cpc.groupe.label",
];

export const LIGHT_SOURCE = [
  "title",
  "id",
  "applicationDate",
  "publicationDate",
  "inventors",
  "patents",
  "applicants",
];
