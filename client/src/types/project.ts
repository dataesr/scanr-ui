import { Aggregation, LangField } from "./commons"

export type Participant = {
  role: string,
  funding?: string,
  label: LangField,
  structure: {
    id: string,
    label: {
      default: string,
      en?: string,
      fr?: string,
    },
    mainAddress?: {
      main: boolean,
      city?: string,
      address?: string,
      postcode?: string,
      country?: string,
      gps?: {
        lat: number,
        lon: number,
      },
    },
  },
}

export type Action = {
  id: string,
  label: LangField,
  level: string,
}


export type Project = {
  _id: string,
  id: string,
  label: LangField
  keywords: LangField,
  action: Action,
  call: {
    id: string,
    label: string,
  }
  publications: {
    id: string;
    title: LangField;
    source: {
      title: string;
      volume?: string;
      issue?: string;
      publisher?: string;
      journalIssns?: string[];
    },
    isOa: boolean;
    type: string;
    year: number;
    authors: {
      fullName: string;
      person: string;
      role?: string;
    }[];
  }[],
  domains: {
    type: string,
    label: LangField,
  }[],
  participants: Participant[],
  year: number,
  type: string,
  endDate?: string,
  startDate?: string,
  budgetTotal?: number,
  budgetFinanced?: number,
  acronym: LangField,
  description: LangField,
  duration?: number,
  url?: string,
}

export type LightProject = {
  id: string,
  label: LangField,
  acronym: LangField,
  keywords?: {
    default?: string[],
    en?: string[],
    fr?: string[],
  },
  participants?: Participant[],
  year: number,
  type: string,
}

export type ExportProject = {
  id: string,
  label: LangField,
  type: string,
  startDate: string,
  endDate: string,
  budgetTotal: number,
  budgetFinanced: number,
  url: string,
  participantCount: number,
  call: {
    label: string,
  },
  action: {
    label: LangField,
  },
  duration: number,
}

export type ProjectAggregations = {
  byType: Aggregation[],
  byYear: Aggregation[],
}

export type ProjectAggregationsForAnalyticsTool = {
  byType: Aggregation[],
  byYear: Aggregation[],
  byInstitution: Aggregation[],
  projectsCount: number
}
