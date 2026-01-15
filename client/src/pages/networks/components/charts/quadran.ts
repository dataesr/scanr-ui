import { getMedian } from "../../utils"

// Quadrant colors: [x >= median, y >= median]
const QUADRANT_COLORS = {
  "1,1": "#81C784", // High centrality, High density (pastel green)
  "1,0": "#64B5F6", // High centrality, Low density (pastel blue)
  "0,1": "#FFB74D", // Low centrality, High density (pastel orange)
  "0,0": "#E57373", // Low centrality, Low density (pastel red)
}

function getQuadrantColor(xValue: number, yValue: number, xMedian: number, yMedian: number): string {
  const xQuadrant = xValue >= xMedian ? 1 : 0
  const yQuadrant = yValue >= yMedian ? 1 : 0
  return QUADRANT_COLORS[`${xQuadrant},${yQuadrant}`]
}

export default function getQuadrantChartsOptions({
  data,
  x,
  y,
  height = "300px",
  title = "",
  subtitle = "",
  title_xaxis = "",
  title_yaxis = "",
  useColorFromData = false,
}) {
  const _x_median = data ? getMedian(data.map((d) => d[x])) : 0
  const _y_median = data ? getMedian(data.map((d) => d[y])) : 0

  const _data = data?.map((d) => ({
    name: d.label,
    x: d[x],
    y: d[y],
    color: useColorFromData ? d.color : getQuadrantColor(d[x], d[y], _x_median, _y_median),
  }))

  return {
    chart: {
      type: "bubble",
      height,
    },
    title: { text: title },
    subtitle: { text: subtitle },
    xAxis: {
      // min: Math.min(..._data.map((d) => d.x)),
      // max: Math.max(..._data.map((d) => d.x)),
      title: { text: title_xaxis },
      crosshair: false,
      accessibility: {
        description: title_xaxis,
      },
      plotLines: [
        {
          dashStyle: "dot",
          width: 2,
          value: _x_median,
        },
      ],
    },
    yAxis: {
      // min: Math.min(..._data.map((d) => d.y)),
      // max: Math.max(..._data.map((d) => d.y)),
      title: { text: title_yaxis },
      opposite: true,
      crosshair: false,
      accessibility: {
        description: title_yaxis,
      },
      plotLines: [
        {
          dashStyle: "dot",
          width: 2,
          value: _y_median,
        },
      ],
    },
    tooltip: {
      useHTML: true,
      pointFormat: `<strong>{point.name}</strong><br/><span>${x}: {point.x}</span><br/><span>${y}: {point.y}</span>`,
      followPointer: true,
    },
    plotOptions: {
      bubble: {
        minSize: 20,
        maxSize: 20,
      },
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },
    // colors: _data.map((d) => d.color),
    legend: { enabled: false },
    series: [{ data: _data, colorByPoint: true }],
  }
}
