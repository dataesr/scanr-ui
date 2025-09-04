import { useIntl } from "react-intl";
import { Button, Row, Col, Text } from "@dataesr/dsfr-plus";
import useScreenSize from "../../../../../hooks/useScreenSize";
import YearBars from "../../../../../components/year-bars";
import { useState } from "react";
import { OrganizationPatentsData } from "../../../../../types/organization";
import CpcWordCloud from "../../../../../components/patent-chart";

type OrganizationPatentsProps = {
  data: OrganizationPatentsData;
  value: string;
  label?: string;
};

export default function OrganizationPatents({
  data: patents,
  value,
  label,
}: OrganizationPatentsProps) {
  const { screen } = useScreenSize();
  const intl = useIntl();
  const [projectGraph, setProjectGraph] = useState("type");

  const searchFilters = {
    "applicants.ids.id": { values: [{ value, label }], type: "terms" },
  };
  const patentsFilterUrl = `/search/patents?filters=${encodeURIComponent(
    JSON.stringify(searchFilters)
  )}`;

  if (!patents.patentsCount || patents.patentsCount === 0) {
    return null;
  }

  if (patents.patentsCount < 5 || ["xs", "sm"].includes(screen)) {
    return (
      <>
        <div
          className="fr-mb-3w"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Text className="fr-m-0" bold>
              {patents.patentsCount}{" "}
              {intl.formatMessage({ id: "organizations.patents.count" })}
            </Text>
          </div>
          <Button
            as="a"
            variant="text"
            icon="arrow-right-s-line"
            iconPosition="right"
            href={patentsFilterUrl}
          >
            {intl.formatMessage({ id: "organizations.patents.search" })}
          </Button>
        </div>
        <hr />
      </>
    );
  }

  return (
    <>
      <div
        className="fr-mb-3w"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Text size="lg" className="fr-m-0" bold>
            {patents.patentsCount}{" "}
            {intl.formatMessage({ id: "organizations.patents.count" })}
          </Text>
        </div>
        <Button
          as="a"
          variant="text"
          icon="arrow-right-s-line"
          iconPosition="right"
          href={patentsFilterUrl}
        >
          {intl.formatMessage({ id: "organizations.patents.search" })}
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
                  checked={projectGraph === "type"}
                  onChange={() => setProjectGraph("type")}
                  type="radio"
                  id="segmented-patents-1"
                />
                <label className="fr-label" htmlFor="segmented-patents-1">
                  {intl.formatMessage({ id: "organizations.patents.nav.year" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={projectGraph === "cpc"}
                  type="radio"
                  id="segmented-patents-3"
                  onChange={() => setProjectGraph("cpc")}
                />
                <label className="fr-label" htmlFor="segmented-patents-3">
                  {intl.formatMessage({
                    id: "organizations.patents.nav.cpc",
                  })}
                </label>
              </div>
            </div>
          </fieldset>
        </Col>
        <Col xs="12" className="fr-pb-6w">
          {projectGraph === "type" && (
            <YearBars
              name={intl.formatMessage({
                id: "organizations.patents.year-bars.name",
              })}
              height="300px"
              counts={patents.byYear.map((year) => year.count)}
              years={patents.byYear.map((year) => year.label)}
            />
          )}
          <>
            {projectGraph === "cpc" && patents.byCpc && (
              <CpcWordCloud data={patents.byCpc} />
            )}
          </>
        </Col>
      </Row>
      <hr />
    </>
  );
}
