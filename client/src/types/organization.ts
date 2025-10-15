import type {
	Address,
	Aggregation,
	ExternalIdsData,
	LangField,
} from "./commons";
import type { Network } from "./network";

export type OrganizationPublicationsData = {
	byYear: Aggregation[];
	byType: Aggregation[];
	byAuthors: Aggregation[];
	byWiki: Aggregation[];
	bySource: Aggregation[];
	byOpenAlexFields: Aggregation[];
	byGrantsFunder: Aggregation[];
	byInfrastructureName: Aggregation[];
	bySupportEntity: Aggregation[];
	publicationsCount: number;
};
export type OrganizationProjectsData = {
	byYear: Aggregation[];
	byType: Aggregation[];
	byKeywords: Aggregation[];
	projectsCount: number;
};

export type OrganizationPatentsData = {
	nature: any;
	level: any;
	kind: any;
	byYear: Aggregation[];
	byCpc: Aggregation[];
	patentsCount: number;
};

type BaseLink = {
	type?: string;
	url?: string;
	language?: string;
};
type BaseSocialMedia = BaseLink & { account?: string };
export type OrganizationLinksData = BaseLink[];
export type OrganizationSocialMediasData = BaseSocialMedia[];

export type RelatedOrganizationData = {
	structure: string;
	relationType?: string;
	type?: string;
	fromDate: string;
	label: string;
	denormalized: {
		id: string;
		label: LangField;
		address?: Address[];
		institutions: RelatedOrganizationData[];
	};
};

export type OrganizationLeaderData = {
	person?: string;
	role?: string;
	fromDate?: string;
	firstName?: string;
	lastName?: string;
};

export type OrganizationBadgesData = {
	code: string;
	label: LangField;
};
export type OrganizationAwardsData = {
	label: string;
	year: number;
	domain?: {
		id: string;
		label: string;
	};
};
export type OrganizationAgreementsData = {
	type: string;
	start: number;
	end: number;
	years: number[];
	label: string;
};
export type OrganizationIaDescription = {
	creation_date: string;
	model: string;
	description: LangField;
};

export type Organization = {
	_id: string;
	acronym: LangField;
	address?: Address[];
	agreements: OrganizationAgreementsData[];
	ai_description?: OrganizationIaDescription;
	awards: OrganizationAwardsData[];
	badges?: OrganizationBadgesData[];
	creationYear?: number;
	description: LangField;
	endDate?: string;
	externalIds: ExternalIdsData[];
	id: string;
	institutionOf?: RelatedOrganizationData[];
	institutions?: RelatedOrganizationData[];
	isFrench: boolean;
	kind: string[];
	label: LangField;
	leaders?: OrganizationLeaderData[];
	level?: string;
	links: OrganizationLinksData;
	nature?: string;
	parentOf?: RelatedOrganizationData[];
	parents?: RelatedOrganizationData[];
	patents: OrganizationPatentsData;
	projects: OrganizationProjectsData;
	publications: OrganizationPublicationsData;
	relationOf?: RelatedOrganizationData[];
	relations?: RelatedOrganizationData[];
	socialMedias: OrganizationSocialMediasData;
	network?: Network;
};

export type OrganizationAggregations = {
	byNature: Aggregation[];
	byKind: Aggregation[];
	byLocalization: Aggregation[];
	byLevel: Aggregation[];
	byFundings: Aggregation[];
	byTags: Aggregation[];
	byAwards: Aggregation[];
	byAgreements: Aggregation[];
};

export type LightOrganization = {
	label: LangField;
	acronym: LangField;
	address: {
		main: boolean;
		city?: string;
	}[];
	kind: string[];
	level: string;
	nature: string;
	id: string;
	creationYear: string;
	isFrench: string;
	active: string;
	publicationsCount: number;
	projectsCount: number;
	patentsCount: number;
};

export type ExportOrganization = {
	label: LangField;
	acronym: LangField;
	address: {
		postcode: string;
		main: boolean;
		city?: string;
	}[];
	links: OrganizationLinksData;
	kind: string[];
	nature: string;
	id: string;
};
