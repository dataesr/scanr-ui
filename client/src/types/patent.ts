import { Aggregation, LangField } from "./commons";

export type LightPatent = {
  id: string;
  title: LangField;
  fullName: string;
  applicationDate: number;
  publicationDate: number;
  grantedDate: number;
  inventors: InventorData[];
  applicants: ApplicantData[];
  patents: PatentsData[];
};

export type PatentsData = {
  id: string;
  isPriority: boolean;
  ipType: string;
  office: string;
  applicationDate: string;
  applicationNumber: string;
  internatApplicationNumber: string;
  publicationDate: number;
  publicationNumber: string;
  grantedDate: string;
  links: [
    {
      type: string;
      url: string;
      label: string;
    }
  ];
};

export type Patent = {
  isGranted: boolean;
  isOeb: boolean;
  affiliations: any;
  isInternational: boolean;
  type: string;
  _id: string;
  id: string;
  title: LangField;
  summary: LangField;
  fullName: string;
  applicationDate: number;
  publicationDate: number;
  grantedDate: number;
  inventors: InventorData[];
  applicants: ApplicantData[];
  cpc: {
    classe: { code: string; label: string }[];
    groupe: { code: string; label: string }[];
    section: { code: string; label: string }[];
    ss_classe: { code: string; label: string }[];
  };
  patents: PatentsData[];
};

export type InventorData = {
  type: string;
  name: string;
  country?: string;
  ids: {
    id: string;
    type: "idref";
  }[];
};

export type ApplicantData = {
  type: string;
  name: string;
  country?: string;
  ids: {
    id: string;
    type: "siren" | "idref" | "id";
  }[];
};

export type RolePatent = {
  role: "inv" | "dep";
  description: "inv" | "dep";
};

export type PatentAggregations = {
  byYear: Aggregation[];
};

export type PatentsAggregationsForAnalyticTool = {
  byApplicants: Aggregation[];
  byInventors: Aggregation[];
  patentsCount: number;
  byYear: Aggregation[];
};

export type ExportPatent = {
  patents: Patent[];
  domains: { label: LangField; code: string; type: string; count: number }[];
  title: { default: string; en: string; fr: string };
  summary: { default: string; en: string; fr: string };
  authors: { fullName: string; person: string; role?: string }[];
  isInternational: boolean;
  submissionDate: string;
  publicationDate: string;
  id: string;
};
