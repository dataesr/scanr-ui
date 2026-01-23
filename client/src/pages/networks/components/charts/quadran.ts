import { getMedian } from "../../utils"

// Quadrant colors: [x >= median, y >= median]
const QUADRANT_COLORS = {
  "1,1": "#2ecc71", // Motor: High centrality, High density (green)
  "1,0": "#3498db", // Basic: High centrality, Low density (blue)
  "0,1": "#f1c40f", // Niche: Low centrality, High density (yellow)
  "0,0": "#e74c3c", // Emerging: Low centrality, Low density (red)
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
  height = "",
  title = "",
  subtitle = "",
  title_xaxis = "",
  title_yaxis = "",
  themesName = "themes",
  useColorFromData = false,
}) {
  const _x_values = data?.map((d) => d[x]) || []
  const _y_values = data?.map((d) => d[y]) || []
  const _x_median = getMedian(_x_values) || 0
  const _y_median = getMedian(_y_values) || 0

  // Calculate axis bounds to center on medians
  const xMaxDiff = _x_values.length > 0 ? Math.max(..._x_values.map((val) => Math.abs(val - _x_median)), 0.1) : 1
  const yMaxDiff = _y_values.length > 0 ? Math.max(..._y_values.map((val) => Math.abs(val - _y_median)), 0.1) : 1

  const xAxisMin = _x_median - xMaxDiff * 1.2
  const xAxisMax = _x_median + xMaxDiff * 1.2
  const yAxisMin = _y_median - yMaxDiff * 1.2
  const yAxisMax = _y_median + yMaxDiff * 1.2

  const _data = data?.map((d) => ({
    name: d.label,
    x: d[x],
    y: d[y],
    z: 10, // Constant size for a cleaner look
    color: useColorFromData ? d.color : getQuadrantColor(d[x], d[y], _x_median, _y_median),
  }))

  return {
    chart: {
      type: "bubble",
      height,
      backgroundColor: "transparent",
      plotBorderWidth: 0,
    },
    title: { text: title },
    subtitle: { text: subtitle },
    xAxis: {
      lineWidth: 0,
      tickLength: 0,
      labels: { enabled: false },
      title: { text: null },
      min: xAxisMin,
      max: xAxisMax,
      gridLineWidth: 0,
      plotLines: [
        {
          width: 1,
          value: _x_median,
          zIndex: 1,
          label: {
            text: `${title_yaxis}`,
            rotation: -90,
            x: -6,
            align: "right",
            style: { color: "#999", fontSize: "10px" },
          },
        },
      ],
    },
    yAxis: {
      lineWidth: 0,
      tickLength: 0,
      labels: { enabled: false },
      title: { text: null },
      min: yAxisMin,
      max: yAxisMax,
      gridLineWidth: 0,
      plotLines: [
        {
          width: 1,
          value: _y_median,
          zIndex: 1,
          label: {
            text: `${title_xaxis}`,
            align: "right",
            x: -10,
            style: { color: "#999", fontSize: "10px" },
          },
        },
      ],
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<div style="font-weight: bold; font-size: 13px; margin-bottom: 4px;">{point.key}</div>',
      pointFormat:
        '<div style="font-size: 11px;">' +
        title_xaxis +
        ": <b>{point.x}</b></div>" +
        '<div style="font-size: 11px;">' +
        title_yaxis +
        ": <b>{point.y}</b></div>",
      // followPointer: true,
      padding: 8,
      borderRadius: 4,
    },
    plotOptions: {
      bubble: {
        minSize: 15,
        maxSize: 15,
        marker: {
          fillOpacity: 0.8,
        },
      },
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            textOutline: "none",
            fontWeight: "normal",
            fontSize: "11px",
            color: "#333",
          },
          y: -15,
        },
      },
    },
    legend: { enabled: false },
    series: [
      {
        data: _data,
      },
    ],
    annotations: [
      {
        labels: [
          {
            point: { x: xAxisMax, y: yAxisMax, xAxis: 0, yAxis: 0 },
            text: "Motor " + themesName,
            overflow: "none",
            align: "right",
            x: -5,
            verticalAlign: "top",
            style: { color: QUADRANT_COLORS["1,1"], fontSize: "14px", width: "120px" },
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
          {
            point: { x: xAxisMin, y: yAxisMax, xAxis: 0, yAxis: 0 },
            text: "Highly developed or isolated " + themesName,
            overflow: "none",
            align: "left",
            x: 5,
            verticalAlign: "top",
            style: { color: QUADRANT_COLORS["1,0"], fontSize: "14px", width: "120px" },
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
          {
            point: { x: xAxisMin, y: yAxisMin, xAxis: 0, yAxis: 0 },
            text: "Emerging or declining " + themesName,
            overflow: "none",
            align: "left",
            x: 5,
            verticalAlign: "bottom",
            style: { color: QUADRANT_COLORS["0,1"], fontSize: "14px", width: "120px" },
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
          {
            point: { x: xAxisMax, y: yAxisMin, xAxis: 0, yAxis: 0 },
            text: "Basic and transversal " + themesName,
            overflow: "none",
            align: "right",
            x: -5,
            verticalAlign: "bottom",
            style: { color: QUADRANT_COLORS["0,0"], fontSize: "14px", width: "120px" },
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        ],
        draggable: "",
      },
    ],
  }
}
