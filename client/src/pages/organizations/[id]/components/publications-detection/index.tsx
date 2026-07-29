import { useIntl } from "react-intl";
import { useId, useState } from "react";
import { Row, Col, Text, Badge } from "@dataesr/dsfr-plus";
import BarLink from "../../../../../components/bar-link";
import { OrganizationPublicationsData } from "../../../../../types/organization";

type OrganizationPublicationsProps = {
  data: OrganizationPublicationsData,
  value: string,
  label?: string
}

export default function OrganizationPublicationsDetection({
  data: publications,
}: OrganizationPublicationsProps) {
  const intl = useIntl();
  const [publicationGraph, setPublicationGraph] = useState("infra");
  const segmentId = useId();

  if (!publications.publicationsCount || publications.publicationsCount === 0) {
    return null;
  }

  return (
    <>
      <div className="fr-hr-or">
        <Badge style={{ textWrap: "nowrap"}} noIcon color="success">
          STAGING ONLY
        </Badge>
      </div>
      <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Text size="lg" className="fr-m-0" bold>
            {intl.formatMessage({ id: "organizations.found-on-publications" })}
          </Text>
        </div>
      </div>
      <Row gutters>
        <Col xs="12">
          <fieldset style={{ overflowX: "scroll"}} id="publication-graph-selector" className="fr-segmented fr-segmented--sm">
            <legend className="fr-segmented__legend">
              {intl.formatMessage({ id: "organizations.activity.fieldset.legend" })}
            </legend>
            <div className="fr-segmented__elements">
              <div className="fr-segmented__element">
                <input
                  checked={publicationGraph === "infra"}
                  id={`${segmentId}-infra`}
                  onChange={() => {}}
                  onClick={() => setPublicationGraph("infra")}
                  type="radio"
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-infra`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.infras" })}
                </label>
              </div>

              <div className="fr-segmented__element">
                <input
                  checked={publicationGraph === "grants"}
                  id={`${segmentId}-grants`}
                  onChange={() => {}}
                  onClick={() => setPublicationGraph("grants")}
                  type="radio"
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-grants`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.grants" })}
                </label>
              </div>
              <div className="fr-segmented__element">
                <input
                  checked={publicationGraph === "support"}
                  id={`${segmentId}-support`}
                  onChange={() => {}}
                  onClick={() => setPublicationGraph("support")}
                  type="radio"
                />
                <label
                  className="fr-label"
                  htmlFor={`${segmentId}-support`}
                >
                  {intl.formatMessage({ id: "organizations.publications.nav.supports" })}
                </label>
              </div>
            </div>
          </fieldset>
        </Col>
        <Col xs="12" className="fr-pb-6w">

          {(publicationGraph === "support") && publications.bySupportEntity?.map((a) => (
            <BarLink
              key={a.value}
              name={a.label}
              count={a.count}
              width={a.normalizedCount}
            />
          ))}
          {(publicationGraph === "grants") && publications.byGrantsFunder?.map((a) => (
            <BarLink
              key={a.value}
              name={a.label}
              count={a.count}
              width={a.normalizedCount}
            />
          ))}
          {(publicationGraph === "infra") && publications.byInfrastructureName?.map((a) => (
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
