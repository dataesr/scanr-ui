import { publicationsIndex, postHeaders } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { PublicationAggregationsForAnalyticTool } from "../../../types/publication";
import { publicationTypeMapping } from "../../../utils/string";
import { fillWithMissingYears } from "../../utils/years";
import { FIELDS } from "../_utils/constants";

interface StackedChartSeries {
  name: string;
  data: number[];
  stack: string;
}

interface StackedChartData {
  categories: string[];
  series: StackedChartSeries[];
}

function processAuthorsByLabsForStackedChart(buckets: any): StackedChartData {
  // Parse and group the data
  // const labsData = new Map<string, Map<string, number>>();
  const allAuthors = new Map<string, string[]>();
  const categories = new Set<string>();

  buckets.forEach(bucket => {
    const parts = bucket.key.split('###');
    const idref = parts[0];
    const authorName = parts[1];
    const labs = bucket.byLabs.buckets
      ?.filter(lab => lab.key.startsWith(idref))
      ?.map(lab => lab.key.split('###')[3]);

    allAuthors.set(authorName, labs);
    labs?.forEach(lab => categories.add(lab));
  });

  const categoryTotals = new Map<string, number>();
  [...categories].forEach(lab => {
    const singleCount = [...allAuthors].filter(([, authorLabs]) => authorLabs.includes(lab) && authorLabs.length === 1).length;
    const severalCount = [...allAuthors].filter(([, authorLabs]) => authorLabs.includes(lab) && authorLabs.length > 1).length;
    const totalCount = singleCount + severalCount;
    categoryTotals.set(lab, totalCount);
  });

  const sortedCategories = [...categories].sort((a, b) => {
    const totalA = categoryTotals.get(a) || 0;
    const totalB = categoryTotals.get(b) || 0;
    return totalB - totalA;
  });

  const counts = sortedCategories.filter(lab => categoryTotals.get(lab) > 3).map((lab) => {
    const singleCount = [...allAuthors].filter(([, authorLabs]) => authorLabs.includes(lab) && authorLabs.length === 1)
    const severalCount = [...allAuthors].filter(([, authorLabs]) => authorLabs.includes(lab) && authorLabs.length > 1)
    return [singleCount.length, severalCount.length];
  })

  const series: StackedChartSeries[] = [
    {
      name: 'Auteurs avec affilation unique',
      data: counts.map(count => count[0]) as number[],
      stack: 'Total'
    },
    {
      name: 'Auteurs avec plusieurs affiliations',
      data: counts.map(count => count[1]) as number[],
      stack: 'Total'
    }
  ]

  return {
    categories: sortedCategories,
    series,
  };
}


export async function aggregatePublicationsForAnalyticTool(
  { query, filters = [] }: AggregationArgs
  ): Promise<PublicationAggregationsForAnalyticTool> {
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
    aggs: {
      publicationsCount: {
        value_count: { field: "id.keyword" },
      },
      byYear: {
        terms: {
          field: "year",
          size: 40,
        }
      },
      byAuthorsFullNames: {
        terms: {
          field: "authors.fullName.keyword",
          size: 15,
          min_doc_count: 5,
          order: {
            _count: "desc"
          }
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
          size: 15,
          min_doc_count: 5,
          order: {
            _count: "desc"
          }
        },
      },
      byLabs: {
        terms: {
          field: "affiliations.id_name.keyword",
          size: 500,
          min_doc_count: 5,
          order: {
            _count: "desc"
          }
        },
      },
      byCountries: {
        terms: {
          field: "affiliations.country.keyword",
          size: 100,
        },
      },
      byAuthorsByLabs: {
        terms: {
          field: "authors.id_name.keyword",
          size: 5000,
          min_doc_count: 5,
        },
        aggs: {
          byLabs: {
            terms: {
              field: "authors.affiliations.id_name_author_labo.keyword",
              size: 1000,
            },
          },
        },
      },
      byIsOa: {
        terms: {
          field: "isOa",
        }
      },
      byFunder: {
        terms: {
          field: "projects.type.keyword",
        }
      },
      byReview: {
        terms: {
          field: "source.title.keyword",
          size: 100,
        }
      },
      byPrivateSupport: {
        terms: {
          field: "structured_acknowledgments.private_support.entity.keyword",
          size: 100,
        }
      }
    }
  }
  if (filters.length > 0) {
    body.query.bool.filter = filters
  }
  const res = await fetch(
    `${publicationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  const result = await res.json()
  const { aggregations: data} = result;

  console.log("ROW", data.byAuthorsByLabs)

  const _100Year = data?.byYear?.buckets && Math.max(...data.byYear.buckets.map((el) => el.doc_count));
  const byYear = data?.byYear?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
      normalizedCount: element.doc_count * 100 / _100Year,
    }
  }).sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []) || [];
  const byType = data?.byPublicationType?.buckets?.map((element) => {
    if (!publicationTypeMapping[element?.key]) return null;
    return {
      value: element.key,
      label: publicationTypeMapping[element.key],
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byPrivateSupport = data?.byPrivateSupport?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byCountries = data?.byCountries?.buckets?.filter((element) => element.key !== 'France').map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byFunder = data?.byFunder?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byAuthors = data?.byAuthors?.buckets?.map((element) => {
    return {
      value: element.key.split('###')?.[0],
      label: element.key.split('###')?.[1],
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byAuthorsFullNames = data?.byAuthorsFullNames?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byLabs = data?.byLabs?.buckets?.filter((element) => element.key.split('###')?.[0].match(/^[1-9]{9}[A-Z]{1}$/)).map((element) => {
    return {
      value: element.key.split('###')?.[0],
      label: element.key.split('###')?.[1]?.split('_')?.[1]?.split('|||')?.[0],
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byLabsMap = data?.byLabs?.buckets
    ?.filter((element) => element.key.split('###')?.[0].match(/^[1-9]{9}[A-Z]{1}$/))
    ?.filter((element) => element.key.split('###')?.[2])
    .map((element) => {
      return {
        lat: Number(element.key.split('###')?.[2].split('|')?.[0]),
        lon: Number(element.key.split('###')?.[2].split('|')?.[1]),
        name: element.key.split('###')?.[1]?.split('_')?.[1]?.split('|||')?.[0],
        z: element.doc_count,
      }
    })
    .filter(el => el) || [];
  const byReview = data?.byReview?.buckets?.map((element) => {
    return {
      value: element.key,
      label: element.key,
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byIsOa = data?.byIsOa?.buckets?.map((element) => {
    return {
      value: element.key === 1 ? 'Accès ouvert' : 'Accès restreint',
      label: element.key === 1 ? 'Accès ouvert' : 'Accès restreint',
      count: element.doc_count,
    }
  }).filter(el => el) || [];
  const byAuthorsByLabsChart = processAuthorsByLabsForStackedChart(
    data?.byAuthorsByLabs?.buckets || []
  );
  const publicationsCount = data.publicationsCount?.value;
  return {
    byYear,
    byType,
    byAuthors,
    byFunder,
    byIsOa,
    byReview,
    byAuthorsFullNames,
    byLabs,
    byCountries,
    publicationsCount,
    byPrivateSupport,
    byLabsMap,
    byAuthorsByLabsChart,
  };
}
