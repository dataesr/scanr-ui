import { organizationsIndex, postHeaders } from "../../../config/api"
import { AggregationArgs } from "../../../types/commons"
import { OrganizationAggregations } from "../../../types/organization"
import { DEFAULT_FILTERS, FIELDS } from "../_utils/constants"
import { getMatchPhrases } from "../_utils/get-match-phrases"
import { toAggregationModel } from "../../utils/helpers"

const AGGS = {
  byNature: {
    terms: {
      field: "nature.keyword",
      size: 50,
    }
  },
  byLevel: {
    terms: {
      field: "level.keyword",
      size: 50,
    }
  },
  byKind: {
    terms: {
      field: "kind.keyword",
    }
  },
  byLocalization: {
    terms: {
      field: "address.urbanUnitLabel.keyword",
      size: 10
    },
  },
  byFundings: {
    terms: {
      field: "projects.type.keyword",
      size: 100
    },
  },
  byTags: {
    terms: {
      field: "badges.label.fr.keyword",
      size: 100
    },
  },
  byAwards: {
    terms: {
      field: "awards.label.keyword",
      size: 100
    },
  },
  byAgreements: {
    terms: {
      field: "agreements.type.keyword",
      size: 100
    },
  },
  byRegions: {
    terms: {
      field: "address.region.keyword",
      size: 20
    }
  }
}


export async function aggregateOrganizations(
  {query, filters = []}: AggregationArgs
  ): Promise<OrganizationAggregations> {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              fields: FIELDS,
            },
          }
        ]
      }
    },
    aggs: AGGS
  }
  if (filters.length > 0) {
    body.query.bool.filter = [...filters, ...DEFAULT_FILTERS]
  } else {
    body.query.bool.filter = DEFAULT_FILTERS
  }
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders });
  const result = await res.json();
  const { aggregations } = result || {};

  const data = Object.entries(aggregations)
    .reduce((acc, [key, aggreg]: [string, any]) => ({...acc, [key]: toAggregationModel(aggreg?.buckets)}) , {});
  return data as OrganizationAggregations;
}

export async function aggregateOrganizationsForHe(
  {query, filters = []}: AggregationArgs
  ): Promise<OrganizationAggregations> {
    const body: any = {
      size: 0,
      query: {
      bool: {
        minimum_should_match: 1,
        should: getMatchPhrases(query?.split('|')),
        filter: [...filters || [], { term: { status: "active" } }]
      }
    },
    aggs: AGGS
  }
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders });
    const result = await res.json(); 
    const { aggregations } = result || {};
    
  const data = Object.entries(aggregations)
    .reduce((acc, [key, aggreg]: [string, any]) => ({...acc, [key]: toAggregationModel(aggreg?.buckets)}) , {});
  return data as OrganizationAggregations;
  
}