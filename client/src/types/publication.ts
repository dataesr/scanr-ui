import { Aggregation, ExternalIdsData, LangField } from "./commons";

type OaEvidenceData = {
  hostType: string;
  hostUrl: string;
  version: string;
  url: string;
};

type DomainsData = {
  type: string;
  label: LangField;
  code: string;
};

type SourceData = {
  title: string;
  volume?: string;
  issue?: string;
  publisher?: string;
  journalIssns?: string[];
};

type ProjectData = {
  id: string;
  label: LangField;
  acronym: LangField;
  year: number;
  type: string;
};

type BasePublication = {
  id: string;
  title: LangField;
  source: SourceData;
  isOa: boolean;
  type: string;
  year: number;
  landingPage?: string;
  externalIds: ExternalIdsData[];
};

export type SoftwareMention = {
  softwareName: string;
  contexts: string[];
  id_name: string;
  wikidata?: string;
}

export type LightPublication = BasePublication & {
  authors: {
    fullName: string;
    person: string;
    role?: string;
  }[];
};

export type Publication = BasePublication & {
  _id: string
  summary: LangField
  domains: DomainsData[]
  software: SoftwareMention[]
  pdfUrl?: string
  affiliations: {
    name: string
    id: string
  }[]
  authors: {
    fullName: string
    person: string
    role: string
    affiliations: Record<string, unknown>[]
  }[]
  oaEvidence?: OaEvidenceData
  projects: ProjectData[]
}

export type ExportPublication = {
  id: string;
  title: LangField;
  summary: LangField;
  authors: {
    fullName: string;
  }[];
  source: SourceData;
  type: string;
  isOa: boolean;
  publicationDate: string;
  submissionDate: string;
};

export type PublicationAggregations = {
  byYear: Aggregation[];
  byType: Aggregation[];
  byAuthors: Aggregation[];
  byIsOa: Aggregation[];
  byFunder: Aggregation[];
  byReview: Aggregation[];
};

export type PublicationAggregationsForAnalyticTool = {
  byYear: Aggregation[];
  byType: Aggregation[];
  byAuthors: Aggregation[];
  byAuthorsFullNames: Aggregation[];
  byCountries: Aggregation[];
  byLabs: Aggregation[];
  byIsOa: Aggregation[];
  byFunder: Aggregation[];
  byPrivateSupport: Aggregation[];
  byReview: Aggregation[];
  publicationsCount: number;
  byLabsMap: {
    lat: number;
    lon: number;
    name: string;
    z: number;
  }[];
};
