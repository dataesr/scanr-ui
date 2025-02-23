import { organizationsIndex, patentsIndex, postHeaders, projectsIndex, publicationsIndex } from "../../../config/api"
import { Organization } from "../../../types/organization"
import { publicationTypeMapping } from "../../../utils/string"
import { getStructureNetworkById } from "../../networks/search/organization"
import { fillWithMissingYears } from "../../utils/years"

export async function getOrganizationById(id: string): Promise<Organization> {
  const body: any = {
    _source: {
      excludes: ["publications", "projects", "web_content", "patents", "autocompleted", "autocompletedText"],
    },
    query: {
      bool: {
        filter: [{ term: { "id.keyword": id } }],
      },
    },
  }
  const structureQuery = fetch(`${organizationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  }).then((r) => r.json())
  const publicationsQuery = getStructurePublicationsById(id)
  const projectsQuery = getStructureProjectsById(id)
  const patentsQuery = getStructurePatentsById(id)
  const networkQuery = getStructureNetworkById(id, "publications", "domains")
  const [structure, publications, projects, patents, network] = await Promise.all([
    structureQuery,
    publicationsQuery,
    projectsQuery,
    patentsQuery,
    networkQuery,
  ])

  const structureData = structure?.hits?.hits?.[0]?._source
  if (!structureData) throw new Error("404")
  const { _id } = structure?.hits?.hits?.[0] || {}

  return { ...structureData, _id, publications, projects, patents, network }
}

async function getStructurePublicationsById(id: string): Promise<any> {
  const body = {
    _source: ["title.*", "authors.fullName", "authors.person", "authors.role", "source.*", "isOa", 'type', 'id', 'year'],
    query: { bool: { filter: [{ term: { "affiliations.id.keyword": id } }] } },
    sort: [{ year: { order: "desc" } }],
    aggs: {
      byWiki: {
        filter: { term: { "domains.type.keyword": "wikidata" } },
        aggs: {
          wiki: {
            terms: {
              size: 40,
              field: "domains.label.default.keyword",
            }
          }
        }
      },
      byYear: {
        terms: {
          field: "year",
          size: 30,
        }
      },
      byPublicationType: {
        terms: {
          field: "type.keyword",
        }
      },
      byAuthors: {
        terms: {
          field: "authors.id_name.keyword",
          size: 10,
        },
      },
      bySource: {
        terms: {
          field: "source.title.keyword",
        }
      },
    },
    size: 0,
  }
  const res = await fetch(`${publicationsIndex}/_search`, { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const data = await res.json()

  const aggregations = data?.aggregations || {}
  const publicationsCount = data?.hits?.total?.value || 0
  const byWiki = aggregations?.byWiki?.wiki?.buckets?.map((element) => {
    return {
      value: element.key,
      count: element.doc_count,
      label: element.key,
    }
  }) || [];
  const _100Year = aggregations?.byYear?.buckets && Math.max(...aggregations.byYear.buckets.map((el) => el.doc_count));
  const byYear = aggregations?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  const byType = aggregations?.byPublicationType?.buckets?.map((element) => {
    if (!publicationTypeMapping[element?.key]) return null;
    return {
      value: element.key,
      label: publicationTypeMapping[element.key],
      count: element.doc_count,
    }
  }).filter(el => el) || [];

  const _100Source = aggregations?.bySource?.buckets && Math.max(...aggregations.bySource.buckets.map((el) => el.doc_count));
  const bySource = aggregations?.bySource?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Source,
    }
  }).filter(el => el) || [];
  const _100Authors = aggregations?.byAuthors?.buckets && Math.max(...aggregations.byAuthors.buckets.map((el) => el.doc_count));
  const byAuthors = aggregations?.byAuthors?.buckets?.map((element) => {
    return {
      value: element.key.split('###')?.[0],
      label: element.key.split('###')?.[1],
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Authors,
    }
  }).filter(el => el) || [];

  return { publicationsCount, byYear, byType, bySource, byAuthors, byWiki } || {}
}

async function getStructureProjectsById(id: string): Promise<any> {
  const body: any = {
    size: 0,
    query: { bool: { filter: [{ term: { "participants.structure.id.keyword": id } }] } },
    aggs: {
      byType: {
        terms: {
          field: "type.keyword",
          size: 500,
        }
      },
      byYear: {
        terms: {
          field: "year",
          size: 25,
        }
      },
      byKeywordsFr: {
        terms: {
          field: "keywords.fr.keyword",
          size: 50,
        },
      },
      byKeywordsEn: {
        terms: {
          field: "keywords.en.keyword",
          size: 50,
        },
      },
    }
  }
  const res = await fetch(
    `${projectsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()

  const { aggregations: data} = result;
  const projectsCount = result?.hits?.total?.value || 0
  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  const _100Type = data?.byType?.buckets && Math.max(...data.byType.buckets.map((el) => el.doc_count));
  const byType = data?.byType?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Type,
    }
  }).filter(el => el) || [];
  const keywordsBuckets = [...data?.byKeywordsFr?.buckets || [], ...data?.byKeywordsEn?.buckets || []];

  const byKeywords = keywordsBuckets.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el).sort((a, b) => a.count - b.count).slice(0, 30) || [];
  return { byYear, byType, byKeywords, projectsCount }
}

async function getStructurePatentsById(id: string): Promise<any> {
  const body: any = {
    size: 0,
    query: { bool: { filter: [{ term: { "applicants.ids.id.keyword": id } }] } },
    aggs: {
      byYear: {
        terms: {
          field: "year",
          size: 25,

        }
      }
    }
  }
  const res = await fetch(
    `${patentsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()

  const { aggregations: data} = result;
  const patentsCount = result?.hits?.total?.value || 0
  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  return { byYear, patentsCount }
}
