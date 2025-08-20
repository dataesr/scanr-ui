import HighchartsInstance from "highcharts";
import Highcharts from "../../../../../components/analytics-graph/highcharts";
import HighchartsReact from "highcharts-react-official";
import { PublicationAggregationsForAnalyticTool } from "../../../../../types/publication";
import { Title } from "@dataesr/dsfr-plus";

export default function StackedBar({ data }: { data: PublicationAggregationsForAnalyticTool["byAuthorsByLabsChart"] }) {
  if (!data) return null;

  const height = `${data.categories.slice(0, 15).length * 30}px`;

  const options: HighchartsInstance.Options = {
    chart: {
      type: 'bar',
      height,
      margin: [0, 0, 0, 0],
    },
    title: {
      text: null
    },
    xAxis: {
      categories: data.categories.slice(0, 15),
      type: 'category',
      tickLength: 0,
    },
    yAxis: {
      visible: false,
      tickLength: 0,
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'bottom',
      layout: 'vertical',
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
      }
    },
    colors: ['var(--organizations-analytics)', 'var(--authors-analytics)'],
    series: data.series.map((series, i) => ({
      ...series,
      data: series.data.slice(0, 15),
      pointPadding: 0.2,
      groupPadding: 0,
      type: 'bar',
      dataLabels: (i === data.series.length - 1) && {
				align: 'left',
				inside: true,
        enabled: true,
        format: '{point.category}'
      },
    }))
  };

  return (
    <div className="fr-pb-3w">
      <div style={{ display: 'flex', alignItems: 'start' }}>
        <div style={{ flexGrow: 1 }}>
          <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
            Nombre d'auteurs par labos
          </Title>
          <p className="fr-text--xs fr-text-mention--grey">Répartition auteurs par laboratoires</p>
        </div>
      </div>

      <HighchartsReact
        options={options}
        highcharts={Highcharts}
      />
    </div>
  );
}
