import { Button, Col, Row, Spinner, Text } from "@dataesr/dsfr-plus";
import { useQuery } from "@tanstack/react-query";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useIntl } from "react-intl";

import YearBars from "../../../../../components/year-bars";
import { clinicalTrialsIndex, postHeadersBso } from "../../../../../config/api";
import type { Organization } from "../../../../../types/organization";
import { isInProduction } from "../../../../../utils/helpers";

const lastYear = import.meta.env.VITE_CLINICAL_TRIALS_LAST_YEAR;

export default function OrganizationClinicalTrials({
  data,
  label,
  value,
}: {
  data: Organization;
  label?: string,
  value: string,
}) {
  const intl = useIntl();

  const searchFilters = {
    "ror": { values: [{ label, value: `https://ror.org/${value}` }], type: "terms" },
  };
  const clinicalTrialsFilterUrl = `/search/clinical-trials?filters=${encodeURIComponent(
    JSON.stringify(searchFilters),
  )}`;

  const { data: cts, isLoading } = useQuery({
    queryKey: ["organizations", "clinical-trials", data.id],
    queryFn: async () => {

      const previousYear = new Date().getFullYear() - 1;
      const body: any = {
        size: 0,
        query: {
          bool: {
            filter: [
              {
                term: {
                  "bso_local_affiliations.keyword": value,
                },
              },
              {
                term: {
                  "status_simplified.keyword": "Completed",
                },
              },
              {
                range: {
                  study_completion_year: {
                    gte: 2010,
                    lte: previousYear,
                  },
                },
              },
            ],
          },
        },
        aggs: {
          byYear: {
            terms: {
              field: "study_completion_year",
              order: { _key: "asc" },
              size: "50",
            },
            aggs: {
              hasResults: {
                terms: {
                  field: `results_details.${lastYear}.has_results`,
                },
                aggs: {
                  hasPublication: {
                    terms: {
                      field: `results_details.${lastYear}.has_publications_result`,
                    },
                  },
                }
              },
              hasPublication: {
                terms: {
                  field: `results_details.${lastYear}.has_publications_result`,
                },
                aggs: {
                  hasResults: {
                    terms: {
                      field: `results_details.${lastYear}.has_results`,
                    },
                  },
                }
              },
              hasResultsOrPublication: {
                terms: {
                  field: `results_details.${lastYear}.has_results_or_publications`,
                },
              },
            },
          },
        },
      };
      const organizationClinicalTrials = await fetch(
        `${clinicalTrialsIndex}/_search`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: postHeadersBso,
        },
      ).then((r) => r.json());
      return organizationClinicalTrials;
    },
    throwOnError: true,
  });

  const counts = (cts?.aggregations?.byYear?.buckets ?? []).map((bucket) => bucket.doc_count)
  const countsHasResultsOnly = (cts?.aggregations?.byYear?.buckets ?? []).map((bucket) => bucket?.hasResults?.buckets?.find((item) => item.key === 1)?.hasPublication?.buckets.find((item) => item.key === 0)?.doc_count ?? 0)
  const countsHasPublicationOnly = (cts?.aggregations?.byYear?.buckets ?? []).map((bucket) => bucket?.hasPublication?.buckets?.find((item) => item.key === 1)?.hasResults?.buckets?.find((item) => item.key === 0)?.doc_count ?? 0)
  const countsHasResultsAndPublication = (cts?.aggregations?.byYear?.buckets ?? []).map((bucket) => bucket?.hasPublication?.buckets?.find((item) => item.key === 1)?.hasResults?.buckets?.find((item) => item.key === 1)?.doc_count ?? 0)
  const countsNoResultsNoPublications = (cts?.aggregations?.byYear?.buckets ?? []).map((bucket) => bucket?.hasResultsOrPublication?.buckets?.find((item) => item.key === 0)?.doc_count ?? 0)
  const years = (cts?.aggregations?.byYear?.buckets ?? []).map((bucket) => bucket.key)

  const options = {
    chart: {
      height: '400px',
      type: 'column',
    },
    title: {
      text: intl.formatMessage({ id: "organizations.clinical-trials-results.title" }),
    },
    accessibility: {
      description: 'Nombre par année',
    },
    xAxis: {
      accessibility: { description: 'Années' },
      categories: years,
      crosshair: true,
      type: 'category',
    },
    yAxis: {
      accessibility: { description: 'Nombre' },
      crosshair: true,
      endofTick: true,
      max: Math.max(...counts),
      min: 0,
      opposite: true,
      style: { fontFamily: 'Marianne' },
      title: { enabled: false },
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        dataLabels: { enabled: false },
        pointPadding: 0,
        stacking: 'normal',
      }
    },
    colors: ['#cecece', '#cbcf33', '#d06088', '#e49a43'],
    series: [
      {
        data: countsNoResultsNoPublications,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.no-communication", defaultMessage: "No communication" }),
      }, {
        data: countsHasResultsOnly,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.has-results", defaultMessage: "Results posted in the register only" }),
      }, {
        data: countsHasPublicationOnly,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.has-publication", defaultMessage: "Results published in a journal only" }),
      }, {
        data: countsHasResultsAndPublication,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.has-results-and-publication", defaultMessage: "Posted and published results" }),
      }
    ]
  }

  if (isLoading) return <Spinner />

  return (
    ((cts?.aggregations?.byYear?.buckets?.length ?? 0) > 0) && (
      <>
        <div
          className="fr-mb-3w"
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Text size="lg" className="fr-m-0" bold>
              {intl.formatMessage({ id: "organizations.clinical-trials" })}
            </Text>
          </div>
          <Button
            as="a"
            href={clinicalTrialsFilterUrl}
            icon="arrow-right-s-line"
            iconPosition="right"
            variant="text"
          >
            {intl.formatMessage({ id: "organizations.clinical-trials.search" })}
          </Button>
        </div>
        <Row gutters>
          <Col xs="12" className="fr-pb-6w">
            <YearBars
              name={intl.formatMessage({
                id: "organizations.clinical-trials.year-bars.name",
              })}
              height="300px"
              counts={counts}
              years={years}
            />
          </Col>
        </Row>
        {!isInProduction() && (
          <Row gutters>
            <Col xs="12" className="fr-pb-6w">
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            </Col>
          </Row>
        )}
        <hr />
      </>
    )
  );
}
