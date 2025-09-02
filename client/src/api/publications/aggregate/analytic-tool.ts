import { publicationsIndex, postHeaders } from "../../../config/api";
import { AggregationArgs } from "../../../types/commons";
import { PublicationAggregationsForAnalyticTool } from "../../../types/publication";
import { publicationTypeMapping } from "../../../utils/string";
import { fillWithMissingYears } from "../../utils/years";

interface AuthorData {
  idref: string;
  name: string;
  labs: string[];
  labCounts: Map<string, number>;
}

interface LabMetrics {
  singleAffiliationCount: number;
  multipleAffiliationCount: number;
  totalCount: number;
  singleAffiliationAuthors: string[];
  multipleAffiliationAuthors: string[];
}

interface ChartDataPoint {
  name: string;
  y: number;
}

interface StackedChartSeries {
  name: string;
  data: ChartDataPoint[];
  stack: string;
}

interface StackedChartData {
  categories: string[];
  series: StackedChartSeries[];
}

const getLabLabel = (lab: string): string | undefined =>
  lab.split('###')[3]?.split('_')?.[1]?.split('|||')?.[0];

function parseAuthorData(buckets: any[]): AuthorData[] {
  return buckets.map(bucket => {
    const [idref, authorName] = bucket.key.split('###');

    const labsData = bucket.byLabs.buckets
      ?.filter((lab: any) => lab.key.startsWith(idref))
      ?.map((lab: any) => ({
        label: getLabLabel(lab.key),
        count: lab.doc_count
      }))
      ?.filter((lab: any) => lab.label) || [];

    const labs = labsData.map((lab) => lab.label);
    const labCounts: Map<string, number> = new Map(labsData.map((lab: { label: string, count: number }) => [lab.label, lab.count]));

    return {
      idref,
      name: authorName,
      labs,
      labCounts
    };
  });
}

function calculateLabMetrics(authorsData: AuthorData[]): Map<string, LabMetrics> {
  const labMetrics = new Map<string, LabMetrics>();

  // Initialize all labs
  authorsData.forEach(author => {
    author.labs.forEach(lab => {
      if (!labMetrics.has(lab)) {
        labMetrics.set(lab, {
          singleAffiliationCount: 0,
          multipleAffiliationCount: 0,
          totalCount: 0,
          singleAffiliationAuthors: [],
          multipleAffiliationAuthors: []
        });
      }
    });
  });

  // Calculate metrics for each lab
  authorsData.forEach(author => {
    const hasMultipleAffiliations = author.labs.length > 1;

    author.labs.forEach(lab => {
      const metrics = labMetrics.get(lab)!;
      metrics.totalCount++;

      if (hasMultipleAffiliations) {
        metrics.multipleAffiliationCount++;
        metrics.multipleAffiliationAuthors.push(author.name);
      } else {
        metrics.singleAffiliationCount++;
        metrics.singleAffiliationAuthors.push(author.name);
      }
    });
  });

  return labMetrics;
}

function sortLabsByTotalCount(labMetrics: Map<string, LabMetrics>): string[] {
  return Array.from(labMetrics.entries())
    .sort(([, a], [, b]) => b.totalCount - a.totalCount)
    .map(([lab]) => lab);
}

function createChartSeries(
  sortedLabs: string[],
  labMetrics: Map<string, LabMetrics>
): StackedChartSeries[] {
  return [
    {
      name: 'Auteurs avec affiliation unique',
      data: sortedLabs.map(lab => {
        const metrics = labMetrics.get(lab)!;
        return {
          name: metrics.singleAffiliationAuthors.join(", "),
          y: metrics.singleAffiliationCount
        };
      }),
      stack: 'Total'
    },
    {
      name: 'Auteurs avec plusieurs affiliations',
      data: sortedLabs.map(lab => {
        const metrics = labMetrics.get(lab)!;
        return {
          name: metrics.multipleAffiliationAuthors.join(", "),
          y: metrics.multipleAffiliationCount
        };
      }),
      stack: 'Total'
    }
  ];
}

function processAuthorsByLabsForStackedChart(buckets: any[]): StackedChartData {
  // Parse the raw bucket data into structured author data
  const authorsData = parseAuthorData(buckets);

  // Calculate metrics for each lab
  const labMetrics = calculateLabMetrics(authorsData);

  // Sort labs by total count (descending)
  const sortedCategories = sortLabsByTotalCount(labMetrics);

  // Create series data for the chart
  const series = createChartSeries(sortedCategories, labMetrics);

  return {
    categories: sortedCategories,
    series
  };
}


export async function aggregatePublicationsForAnalyticTool(
  { query, filters = [], minAuthorsPublications = 5 }: AggregationArgs & { minAuthorsPublications: number }
  ): Promise<PublicationAggregationsForAnalyticTool> {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              fields: ["title_abs_text"],
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
          size: 1000,
          min_doc_count: minAuthorsPublications,
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
      byLabs: {
        terms: {
          field: "affiliations.id_name.keyword",
          size: 500,
          min_doc_count: minAuthorsPublications,
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
          min_doc_count: minAuthorsPublications,
          order: {
            _count: "desc"
          }
        },
        aggs: {
          byLabs: {
            terms: {
              field: "authors.affiliations.id_name_author_labo.keyword",
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
  const byAuthors = data?.byAuthorsByLabs?.buckets?.map((element) => {
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

  const byLabs = data?.byLabs?.buckets
    ?.filter((element) => element.key.split('###')?.[0].match(/^[0-9]{9}[A-Z]{1}$/))
    .map((element) => {
      return {
        value: element.key.split('###')?.[0],
        label: element.key.split('###')?.[1]?.split('_')?.[1]?.split('|||')?.[0],
        count: element.doc_count,
      }
    })
    .filter(el => el) || [];
  const byLabsMap = data?.byLabs?.buckets
    ?.filter((element) => element.key.split('###')?.[0].match(/^[0-9]{9}[A-Z]{1}$/))
    ?.filter((element) => element.key.split('###')?.[3])
    .map((element) => {
      return {
        lat: Number(element.key.split('###')?.[3].split('|')?.[0]),
        lon: Number(element.key.split('###')?.[3].split('|')?.[1]),
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
