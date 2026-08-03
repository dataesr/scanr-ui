import { Button, Col, Row, Text } from "@dataesr/dsfr-plus";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import { useIntl } from "react-intl";

import YearBars from "../../../../../components/year-bars";
import type { Organization } from "../../../../../types/organization";
import { isInProduction } from "../../../../../utils/helpers";

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
  const [clinicalTrialGraph, setClinicalTrialGraph] = useState("years");

  const searchFilters = {
    "ror": { values: [{ label, value: `https://ror.org/${value}` }], type: "terms" },
  };
  const clinicalTrialsFilterUrl = `/search/clinical-trials?filters=${encodeURIComponent(
    JSON.stringify(searchFilters),
  )}`;

  const optionsResults = {
    chart: {
      height: '400px',
      type: 'column',
    },
    title: { text: null },
    accessibility: {
      description: 'Nombre par année',
    },
    xAxis: {
      accessibility: { description: 'Années' },
      categories: data.clinicalTrials.years,
      crosshair: true,
      type: 'category',
    },
    yAxis: {
      accessibility: { description: 'Nombre' },
      crosshair: true,
      endofTick: true,
      max: Math.max(...data.clinicalTrials.countByYear),
      min: 0,
      opposite: true,
      style: { fontFamily: 'Marianne' },
      title: { enabled: true },
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        dataLabels: { enabled: false },
        pointPadding: 0,
        stacking: 'normal',
      }
    },
    series: [
      {
        color: '#cecece',
        data: data.clinicalTrials.countsNoResultsNoPublications,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.no-communication", defaultMessage: "No communication" }),
      }, {
        color: '#cbcf33',
        data: data.clinicalTrials.countsHasResultsOnly,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.has-results", defaultMessage: "Results posted in the register only" }),
      }, {
        color: '#d06088',
        data: data.clinicalTrials.countsHasPublicationOnly,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.has-publication", defaultMessage: "Results published in a journal only" }),
      }, {
        color: '#e49a43',
        data: data.clinicalTrials.countsHasResultsAndPublication,
        name: intl.formatMessage({ id: "organizations.clinical-trials-results.has-results-and-publication", defaultMessage: "Posted and published results" }),
      }
    ]
  }

  const optionsTypes = {
    chart: {
      height: '400px',
      type: 'column',
    },
    title: { text: null },
    accessibility: { description: 'Nombre par année' },
    xAxis: {
      accessibility: { description: 'Années' },
      categories: data.clinicalTrials.years,
      crosshair: true,
      type: 'category',
    },
    yAxis: {
      accessibility: { description: 'Nombre' },
      crosshair: true,
      endofTick: true,
      max: Math.max(...data.clinicalTrials.countByYear),
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
    series: data?.clinicalTrials?.byType,
  }

  return (
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
            {data.clinicalTrials.clinicalTrialsCount}{" "}
            {intl.formatMessage({ id: "organizations.clinical-trials.count" })}
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
        <Col xs="12">
          <fieldset
            id="publication-graph-selector"
            className="fr-segmented fr-segmented--sm"
          >
            <legend className="fr-segmented__legend">
              {intl.formatMessage({
                id: "organizations.activity.fieldset.legend",
              })}
            </legend>
            <div className="fr-segmented__elements">
              <div className="fr-segmented__element">
                <input
                  checked={clinicalTrialGraph === "years"}
                  onChange={() => setClinicalTrialGraph("years")}
                  type="radio"
                  id="segmented-clinical-trials-years"
                />
                <label className="fr-label" htmlFor="segmented-clinical-trials-years">
                  {intl.formatMessage({ id: "organizations.clinical-trials.nav.years" })}
                </label>
              </div>
              {!isInProduction() && (
                <div className="fr-segmented__element">
                  <input
                    checked={clinicalTrialGraph === "results"}
                    type="radio"
                    id="segmented-clinical-trials-results"
                    onChange={() => setClinicalTrialGraph("results")}
                  />
                  <label className="fr-label" htmlFor="segmented-clinical-trials-results">
                    {intl.formatMessage({
                      id: "organizations.clinical-trials.nav.results",
                    })}
                  </label>
                </div>
              )}
              {!isInProduction() && (
                <div className="fr-segmented__element">
                  <input
                    checked={clinicalTrialGraph === "types"}
                    type="radio"
                    id="segmented-clinical-trials-types"
                    onChange={() => setClinicalTrialGraph("types")}
                  />
                  <label className="fr-label" htmlFor="segmented-clinical-trials-types">
                    {intl.formatMessage({
                      id: "organizations.clinical-trials.nav.types",
                    })}
                  </label>
                </div>
              )}
            </div>
          </fieldset>
        </Col>
        <Col xs="12" className="fr-pb-6w">
          {(clinicalTrialGraph === "years") && (
            <YearBars
              counts={data.clinicalTrials.countByYear}
              height="300px"
              name={intl.formatMessage({ id: "organizations.clinical-trials.year-bars.name" })}
              years={data.clinicalTrials.years}
            />
          )}
          {!isInProduction() && (clinicalTrialGraph === "results") && (
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsResults}
            />
          )}
          {!isInProduction() && (clinicalTrialGraph === "types") && (
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsTypes}
            />
          )}
        </Col>
      </Row>
      <hr />
    </>
  );
}
