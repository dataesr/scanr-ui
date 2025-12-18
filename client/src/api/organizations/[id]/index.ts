import { organizationsIndex, patentsIndex, postHeaders, projectsIndex, publicationsIndex } from "../../../config/api"
import { Organization } from "../../../types/organization"
import { publicationTypeMapping } from "../../../utils/string"
import { getStructureNetworkById } from "../../networks/search/organization"
import { processYearAggregations } from "../../utils/years"

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
        terms: {
          size: 40,
          field: "domains.id_name.keyword",
        }
      },
      byYear: {
        terms: {
          field: "year",
          size: 30,
        }
      },
      byOpenAlexFields: {
        terms: {
          field: "topics.field.display_name.keyword",
          size: 10,
        }
      },
      byGrantsFunder: {
        terms: {
          field: "structured_acknowledgments.funders.entity.keyword",
          size: 50,
        }
      },
      byInfrastructureName: {
        terms: {
          field: "structured_acknowledgments.infrastructures.entity.keyword",
          size: 50,
        }
      },
      bySupportEntity: {
        terms: {
          field: "structured_acknowledgments.private_companies.entity.keyword",
          size: 50,
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
  const byWiki = aggregations?.byWiki?.buckets
    ?.map((element) => ({
      value: element.key?.split('###')[0],
      count: element.doc_count,
      label: element.key?.split('###')[1]?.toLowerCase(),
    }))
    ?.filter((element) => element.value?.startsWith('Q'))
    ?.reduce((acc, curr) => {
      const existingItemIndex = acc.findIndex((item) => item.label === curr.label);
      if (existingItemIndex !== -1) {
        return [
          ...acc.slice(0, existingItemIndex),
          {
            value: curr.label,
            label: curr.label,
            count: acc[existingItemIndex].count + curr.count
          },
          ...acc.slice(existingItemIndex + 1)
        ];
      }
      return [
        ...acc,
        {
          value: curr.label,
          label: curr.label,
          count: curr.count
        }
      ];
    }, []) || [];
  const byYear = processYearAggregations(aggregations?.byYear?.buckets);
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
  const _100InfrastructureName = aggregations?.byInfrastructureName?.buckets && Math.max(...aggregations.byInfrastructureName.buckets.map((el) => el.doc_count));
  const byInfrastructureName = aggregations?.byInfrastructureName?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100InfrastructureName,
    }
  }).filter(el => el) || [];
  const _100GrantsFunder = aggregations?.byGrantsFunder?.buckets && Math.max(...aggregations.byGrantsFunder.buckets.map((el) => el.doc_count));
  const byGrantsFunder = aggregations?.byGrantsFunder?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100GrantsFunder,
    }
  }).filter(el => el) || [];
  console.log('GRANTS FUNDER', aggregations.byGrantsFunder)
  const _100SupportEntity = aggregations?.bySupportEntity?.buckets && Math.max(...aggregations.bySupportEntity.buckets.map((el) => el.doc_count));
  const bySupportEntity = aggregations?.bySupportEntity?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100SupportEntity,
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
  const _100OpenAlexFields = aggregations?.byOpenAlexFields?.buckets && Math.max(...aggregations.byOpenAlexFields.buckets.map((el) => el.doc_count));
  const byOpenAlexFields = aggregations?.byOpenAlexFields?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100OpenAlexFields,
    }
  }).filter(el => el) || [];

  return { publicationsCount, byYear, byType, bySource, byAuthors, byWiki, byOpenAlexFields, byInfrastructureName, byGrantsFunder, bySupportEntity }
}

async function getStructureProjectsById(id: string): Promise<any> {
  const body: any = {
    size: 0,
    query: { bool: {
      should: [
        { term: { "participants.structure.id.keyword": id } },
        { term: { "participants.structure.institutions.structure.keyword": id } },
      ],
      minimum_should_match: 1,
    } },
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
  const byYear = processYearAggregations(data?.byYear?.buckets);
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
      },
      byCpc: {
          terms: {
            field: "cpc.classe.code.keyword",
            size: 10000,
          },
          aggs: {
            bySectionLabel: {
              terms: {
                field: "cpc.section.label.keyword",
                size: 1,
              },
            },
        },
      },
    }
  }
  const res = await fetch(
    `${patentsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()

  const { aggregations: data} = result;
  const patentsCount = result?.hits?.total?.value || 0
  const byYear = processYearAggregations(data?.byYear?.buckets);
  const byCpc =
    data?.byCpc?.buckets
      ?.map((element) => {
        return {
          value: element.key.split("###")?.[0],
          label: element.key.split("###")?.[1],
          count: element.doc_count,
        };
      })
      .filter((el) => el) || [];
  return { byYear, byCpc, patentsCount }
}
