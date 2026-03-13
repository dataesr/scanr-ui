import { Col, Row, Spinner, Text } from "@dataesr/dsfr-plus";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useIntl } from "react-intl";

import CpcWordCloud from "../../../../../components/patent-chart";
import YearBars from "../../../../../components/year-bars";
import { clinicalTrialsIndex, postHeadersBso } from "../../../../../config/api";
import useScreenSize from "../../../../../hooks/useScreenSize";
import type { Organization } from "../../../../../types/organization";

export default function OrganizationClinicalTrials({
  data,
}: {
  data: Organization;
}) {
  const intl = useIntl();

  const { data: data2, isLoading } = useQuery({
    queryKey: ["organizations", "clinical-trials", data.id],
    queryFn: async () => {
      const ror = data.externalIds.find((item) => item.type === "ror").id;
      const previousYear = new Date().getFullYear() - 1;
      const body: any = {
        _source: {
          excludes: [
            "publications",
            "projects",
            "web_content",
            "patents",
            "autocompleted",
            "autocompletedText",
          ],
        },
        size: 0,
        query: {
          bool: {
            filter: [
              {
                term: {
                  "bso_local_affiliations.keyword": `https://ror.org/${ror}`,
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
              size: "20",
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
      return {
        byYear: organizationClinicalTrials.aggregations.byYear.buckets.map(
          (bucket) => ({ count: bucket.doc_count, label: bucket.key }),
        ),
      };
    },
    throwOnError: true,
  });

  if (isLoading) return <Spinner />;

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
            {intl.formatMessage({ id: "organizations.clinical-trials" })}
          </Text>
        </div>
        {/*<Button
          as="a"
          variant="text"
          icon="arrow-right-s-line"
          iconPosition="right"
          href={patentsFilterUrl}
        >
          {intl.formatMessage({ id: "organizations.patents.search" })}
        </Button>*/}
      </div>
      <Row gutters>
        <Col xs="12" className="fr-pb-6w">
          <YearBars
            name={intl.formatMessage({
              id: "organizations.clinical-trials.year-bars.name",
            })}
            height="300px"
            counts={(data2?.byYear ?? []).map((year) => year.count)}
            years={(data2?.byYear ?? []).map((year) => year.label)}
          />
        </Col>
      </Row>
      <hr />
    </>
  );
}
