export const FIELDS = [
  "id^1000",
  "fullName^500",
  "externalIds.id^100",
  "publications.title.default^2",
  "publications.summary.default^2",
  "publications.publication^2",
  "domains.label.*^2",
  "domains.code^2",
  "recentAffiliations.structure.label.*",
  "recentAffiliations.structure.acronym.*",
  "recentAffiliations.structure.id",
  "awards.label.*",
]

export const LIGHT_SOURCE = [
  "id", "fullName", "domains", "orcid", "id_hal",
  "idref", "recent_affiliations", "topDomains",
]

export const PUBLICATION_LIGHT_SOURCE = [
  "title.*",
  "authors.fullName",
  "authors.person",
  "authors.role",
  "source.*",
  "isOa",
  'type',
  'id',
  'year',
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
];
