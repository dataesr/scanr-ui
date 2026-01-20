import { useState } from "react";
import { useIntl } from "react-intl";
import { Button, Row, Col, Text } from "@dataesr/dsfr-plus";
import TagCloud from "../../../../../components/tag-cloud";
import BarLink from "../../../../../components/bar-link";
import { OrganizationProjectsData } from "../../../../../types/organization";
import useScreenSize from "../../../../../hooks/useScreenSize";
import YearBars from "../../../../../components/year-bars";

type OrganizationProjectsProps = {
  data: OrganizationProjectsData,
  value: string,
  label?: string
}

export default function OrganizationProjects({ data: projects, value, label }: OrganizationProjectsProps) {
  const { screen } = useScreenSize();
  const intl = useIntl();
  const searchFilters = { 'participants_id_search': { values: [{ value: value, label }], type: 'terms' } }
  const projectsFilterUrl = `/search/projects?filters=${encodeURIComponent(JSON.stringify(searchFilters))}`;
  const [projectGraph, setProjectGraph] = useState("type");

  if (!projects.projectsCount || projects.projectsCount === 0) {
    return null;
  }
  if (projects.projectsCount < 10 || ["xs", "sm"].includes(screen)) {
    return (
      <>
        <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Text className="fr-m-0" bold>
              {projects.projectsCount}
              {' '}
              {intl.formatMessage({ id: "organizations.projects.count" })}
            </Text>
          </div>
          <Button as="a" variant="text" icon="arrow-right-s-line" iconPosition="right" href={projectsFilterUrl}>
            {intl.formatMessage({ id: "organizations.projects.search" })}
          </Button>
        </div>
        <hr />
      </>

    );
  }

  return (
    <>
      <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Text size="lg" className="fr-m-0" bold>
            {projects.projectsCount}
            {' '}
            {intl.formatMessage({ id: "organizations.projects.count" })}
          </Text>
        </div>
        <Button as="a" variant="text" icon="arrow-right-s-line" iconPosition="right" href={projectsFilterUrl}>
          {intl.formatMessage({ id: "organizations.projects.search" })}
        </Button>
      </div>
      <Row gutters>
        <Col xs="12">
          <fieldset id="publication-graph-selector" className="fr-segmented fr-segmented--sm">
            <legend className="fr-segmented__legend">
              {intl.formatMessage({ id: "organizations.activity.fieldset.legend" })}
            </legend>
            <div className="fr-segmented__elements">
              <div className="fr-segmented__element">
                <input checked={(projectGraph === "type")} onClick={() => setProjectGraph("type")} type="radio" id="segmented-22187-4" />
                <label className="fr-label" htmlFor="segmented-22187-4">
                  {intl.formatMessage({ id: "organizations.projects.nav.type" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input checked={(projectGraph === "year")} onClick={() => setProjectGraph("year")} type="radio" id="segmented-22187-3" />
                <label className="fr-label" htmlFor="segmented-22187-3">
                  {intl.formatMessage({ id: "organizations.projects.nav.year" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input checked={(projectGraph === "keywords")} type="radio" id="segmented-22187-2" />
                <label onClick={() => setProjectGraph("keywords")} className="fr-label" htmlFor="segmented-22187-2">
                  {intl.formatMessage({ id: "organizations.projects.nav.tag-cloud" })}
                </label>
              </div>
            </div>
          </fieldset>
        </Col>
        <Col xs="12" className="fr-pb-6w">
          {(projectGraph === "year") && (
            <YearBars
              name={intl.formatMessage({ id: "organizations.projects.year-bars.name" })}
              height="300px"
              counts={projects.byYear.map((year) => year.count)}
              years={projects.byYear.map((year) => year.label)}
            />
          )}
          {(projectGraph === "keywords") && <TagCloud data={projects.byKeywords} order="random" />}
          {(projectGraph === "type") && projects.byType?.map((a) => (
            <BarLink
              key={a.value}
              name={a.label}
              count={a.count}
              width={a.normalizedCount}
            />
          ))}
        </Col>
      </Row>
      <hr />
    </>
  );
}
