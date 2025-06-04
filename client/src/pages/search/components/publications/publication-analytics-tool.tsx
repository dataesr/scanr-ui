import { useIntl } from "react-intl";
import useSearchData from "../../hooks/useSearchData";
import AnalyticsSkeleton from "../../../../components/skeleton/analytics-skeleton";
import { PublicationAggregationsForAnalyticTool } from "../../../../types/publication";
import useAggregateData from "../../hooks/useAggregationData";
import getYearChartOptions from "../../../../components/analytics-graph/graph-options/years";
import { Row, Col } from "@dataesr/dsfr-plus";
import AnalyticsGraph from "../../../../components/analytics-graph";
import getBarChartOptions from "../../../../components/analytics-graph/graph-options/bar";

export default function PublicationAnalyticsTool() {
  const intl = useIntl();
  const { data, isLoading, isError } = useAggregateData('analytics');
  const { search: { data: searchData } } = useSearchData();
  if (isError) return null;
  if (isLoading || !searchData?.length) return <AnalyticsSkeleton />

  const { byYear, byAuthors, byReview, byAuthorsFullNames, byLabs, byCountries } = data as PublicationAggregationsForAnalyticTool

  const yearOptions = getYearChartOptions({ data: byYear, colors: ['var(--artwork-minor-purple-glycine)'] });
  const authorsOptions = getBarChartOptions({ data: byAuthors.slice(0, 30), colors: ['var(--publications-analytics)'] });
  const authorsFullNamesOptions = getBarChartOptions({ data: byAuthorsFullNames.slice(0, 30), colors: ['var(--publications-analytics)'] });
  const reviewOptions = getBarChartOptions({ data: byReview.slice(0, 20), colors: ['var(--publications-analytics)'] });
  const labsOptions = getBarChartOptions({ data: byLabs.slice(0, 20), colors: ['var(--organizations-analytics)'] });
  const countriesOptions = getBarChartOptions({ data: byCountries.slice(0, 20), colors: ['var(--organizations-analytics)'] });


  // const _100TopAuthors = Math.max(...byAuthors.map((el) => el.count | 0));

  return (
    <Row gutters>
      <Col xs="6">
        <AnalyticsGraph
        title={intl.formatMessage({ id: "search.analytics.publications.by-authors.title" })}
        description={intl.formatMessage({ id: "search.analytics.publications.by-authors.description" })}
        options={authorsOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title={intl.formatMessage({ id: "search.analytics.publications.by-authors.title" })}
        description={intl.formatMessage({ id: "search.analytics.publications.by-authors.description" })}
        options={authorsFullNamesOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title={intl.formatMessage({ id: "search.analytics.publications.by-year.title" })}
        description={intl.formatMessage({ id: "search.analytics.publications.by-year.description" })}
        options={yearOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title={intl.formatMessage({ id: "search.analytics.publications.by-authors.title" })}
        description={intl.formatMessage({ id: "search.analytics.publications.by-authors.description" })}
        options={countriesOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title={intl.formatMessage({ id: "search.analytics.publications.by-reviews.title" })}
        description={intl.formatMessage({ id: "search.analytics.publications.by-reviews.description" })}
        options={reviewOptions}
        />
      </Col>
      <Col xs="6">
        <AnalyticsGraph
        title={intl.formatMessage({ id: "search.analytics.publications.by-labs.title" })}
        description={intl.formatMessage({ id: "search.analytics.publications.by-labs.description" })}
        options={labsOptions}
        />
      </Col>
    </Row>
  )
}
