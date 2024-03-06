import { Aggregation, LangField } from "./commons"

export type Project = {
  _id: string,
  id: string,
  label: {
    default: string,
    en?: string,
    fr?: string,
  }
  keywords: {
    default: string,
    en?: string,
    fr?: string,
  },
  participants: {
    role: string,
    funding?: string,
    label: {
      default: string,
      en?: string,
      fr?: string,
    },
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
  }[],
  year: number,
  type: string,
  endDate?: string,
  startDate?: string,
  budgetTotal?: number,
  budgetFinanced?: number,
  acronym: {
    default: string,
    en?: string,
    fr?: string,
  },
  description: {
    default: string,
    en?: string,
    fr?: string,
  },
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
  participants?: {
    role: string,
    funding?: string,
    label: {
      default: string,
      en?: string,
      fr?: string,
    },
    structure: {
      id: string,
      label: LangField,
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
  }[],
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
