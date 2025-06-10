import HighchartsInstance from "highcharts";
import Highcharts from "../../../../../components/analytics-graph/highcharts";
import HighchartsReact from "highcharts-react-official";
import { PublicationAggregationsForAnalyticTool } from "../../../../../types/publication";
import { Title } from "@dataesr/dsfr-plus";

export default function StackedBar({ data }: { data: PublicationAggregationsForAnalyticTool["byAuthorsByLabsChart"] }) {
  if (!data) return null;

  const options: HighchartsInstance.Options = {
    chart: {
      type: 'bar',

    },
    title: {
      text: null
    },
    xAxis: {
      categories: data.categories
    },
    yAxis: {
      title: null
    },
    legend: {
      enabled:false
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
      }
    },
    series: data.series.map((series) => ({
      ...series,
      type: 'bar',
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
        height={600}
        options={options}
        highcharts={Highcharts}
      />
    </div>
  );
}
