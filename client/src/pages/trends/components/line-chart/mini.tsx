import { rangeArray } from "../../../../utils/helpers"
import useTrends from "../../hooks/useTrends"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "../../../../components/analytics-graph/highcharts"
import { useRef } from "react"

export default function LineChartMini({ data }) {
  const chartRef = useRef(null)
  const {
    trendsYears: { min, max },
  } = useTrends()
  const range = rangeArray(min, max)

  const _data = range.map((year) => data?.count?.[year] || 0)
  // const _reg = range.map((_, index) => index * data.slope + data.intercept)

  if (!_data) return null

  const highchartsOptions = {
    chart: {
      type: "line",
      height: "50",
      width: "100",
      backgroundColor: null,
    },
    xAxis: {
      visible: false,
      tickInterval: 1, // one year
      labels: { enabled: false },
      gridLineWidth: 0,
    },
    yAxis: {
      visible: false,
      labels: { enabled: false },
      gridLineWidth: 0,
    },
    plotOptions: {
      series: {
        pointStart: min,
        pointInterval: 1, // one year
        marker: { enabled: false },
        enableMouseTracking: false,
      },
    },
    legend: { enabled: false },
    series: [
      {
        data: _data,
        color: "#0078f3",
      },
      // {
      //   data: _reg,
      //   dashStyle: "dash",
      //   color: "grey",
      // },
    ],
  }

  return <HighchartsReact ref={chartRef} highcharts={Highcharts} options={highchartsOptions} />
}
