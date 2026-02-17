// Quadrant colors: [x >= median, y >= median]
const QUADRANT_COLORS = {
  "1,1": "#2ecc71", // Motor: High centrality, High density (green)
  "1,0": "#3498db", // Basic: High centrality, Low density (blue)
  "0,1": "#f1c40f", // Niche: Low centrality, High density (yellow)
  "0,0": "#e74c3c", // Emerging: Low centrality, Low density (red)
}

function getQuadrantColor(xValue: number, yValue: number): string {
  const xQuadrant = xValue >= 0 ? 1 : 0
  const yQuadrant = yValue >= 0 ? 1 : 0
  return QUADRANT_COLORS[`${xQuadrant},${yQuadrant}`]
}

export function getQuadrantChartsOptions({
  data,
  height = "",
  title = "",
  subtitle = "",
  title_xaxis = "",
  title_yaxis = "",
  themesName = "themes",
  useColorFromData = false,
}) {
  const _x_max = Math.max(...(data?.map((d) => Math.abs(d.x)) || [0]))
  const _y_max = Math.max(...(data?.map((d) => Math.abs(d.y)) || [0]))

  const xAxisMin = -_x_max * 1.2
  const xAxisMax = _x_max * 1.2
  const yAxisMin = -_y_max * 1.2
  const yAxisMax = _y_max * 1.2

  const _data = data?.map((d) => ({
    name: d.label,
    x: d.x,
    y: d.y,
    z: 10, // Constant size for a cleaner look
    color: useColorFromData ? d.color : getQuadrantColor(d.x, d.y),
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
          value: 0,
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
          value: 0,
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
            style: { fontSize: "14px", width: "120px" },
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
            style: { fontSize: "14px", width: "120px" },
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
            style: { fontSize: "14px", width: "120px" },
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
            style: { fontSize: "14px", width: "120px" },
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        ],
        draggable: "",
      },
    ],
  }
}

export function getVectorQuadrantChartsOptions({
  data,
  height = "",
  title = "",
  subtitle = "",
  title_xaxis = "",
  title_yaxis = "",
  themesName = "themes",
  useColorFromData = false,
}) {
  const _x_max = Math.max(...(data?.flatMap((d) => [Math.abs(d.x1 || 0), Math.abs(d.x2 || 0)]) || [0]))
  const _y_max = Math.max(...(data?.flatMap((d) => [Math.abs(d.y1 || 0), Math.abs(d.y2 || 0)]) || [0]))

  const xAxisMin = -_x_max * 1.2
  const xAxisMax = _x_max * 1.2
  const yAxisMin = -_y_max * 1.2
  const yAxisMax = _y_max * 1.2

  const _data = data?.map((d) => ({
    name: d.label,
    x1: d.x1,
    y1: d.y1,
    x2: d.x2,
    y2: d.y2,
    z: 10, // Constant size for a cleaner look
    color: useColorFromData ? d.color : getQuadrantColor(d.x1, d.y1),
  }))
  console.log("_data", _data)

  return {
    chart: {
      type: "bubble",
      height,
      backgroundColor: "transparent",
      plotBorderWidth: 0,
      events: {
        render: function () {
          const chart = this as any
          if (chart.customArrows) {
            chart.customArrows.forEach((el: any) => el.destroy())
          }
          chart.customArrows = []
          _data.forEach((d) => {
            const { x1, y1, x2, y2, color } = d
            if ((!x1 && x1 !== 0) || (!y1 && y1 !== 0)) return
            const xAxis = chart.xAxis[0]
            const yAxis = chart.yAxis[0]
            const px1 = xAxis.toPixels(x1, false)
            const py1 = yAxis.toPixels(y1, false)
            const px2 = xAxis.toPixels(x2, false)
            const py2 = yAxis.toPixels(y2, false)
            // Draw line
            const line = chart.renderer
              .path(["M", px1, py1, "L", px2, py2])
              .attr({
                stroke: color,
                "stroke-width": 2,
                zIndex: 5,
              })
              .add()
            chart.customArrows.push(line)
            // Draw arrowhead
            const angle = Math.atan2(py2 - py1, px2 - px1)
            const arrowLen = 10
            const arrowAngle = Math.PI / 6
            const ax1 = px2 - arrowLen * Math.cos(angle - arrowAngle)
            const ay1 = py2 - arrowLen * Math.sin(angle - arrowAngle)
            const ax2 = px2 - arrowLen * Math.cos(angle + arrowAngle)
            const ay2 = py2 - arrowLen * Math.sin(angle + arrowAngle)
            const arrowHead = chart.renderer
              .path(["M", px2, py2, "L", ax1, ay1, "M", px2, py2, "L", ax2, ay2])
              .attr({
                stroke: color,
                "stroke-width": 2,
                zIndex: 5,
              })
              .add()
            chart.customArrows.push(arrowHead)
          })
        },
      },
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
          value: 0,
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
          value: 0,
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
        // start points
        data: _data
          .filter((d) => d.x1 && d.y1)
          .map((d) => ({
            ...d,
            x: d.x1,
            y: d.y1,
          })),
      },
      {
        // end points
        data: _data.map((d) => ({
          x: d.x2,
          y: d.y2,
          z: d.z,
          name: d.name,
          color: d.color,
        })),
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
            style: { fontSize: "14px", width: "120px" },
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
            style: { fontSize: "14px", width: "120px" },
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
            style: { fontSize: "14px", width: "120px" },
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
            style: { fontSize: "14px", width: "120px" },
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        ],
        draggable: "",
      },
    ],
  }
}
