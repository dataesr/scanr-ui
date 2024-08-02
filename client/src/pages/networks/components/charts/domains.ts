export default function getDomainsChartOptions({ data, height = "300px", title = "", subtitle = "" }) {
  const minYear = 2013
  const maxYear = 2023
  const maxValue = 2000
  const range = [...Array(maxYear - minYear + 1).keys()].map((y) => y + minYear)

  return {
    chart: {
      type: "spline",
      height,
    },
    title: { text: title },
    subtitle: { text: subtitle },
    xAxis: {
      min: Math.max(2000, range[0]),
      crosshair: true,
      accessibility: {
        description: "Years",
      },
    },
    yAxis: {
      type: "logarithmic",
      opposite: true,
      crosshair: true,
      accessibility: {
        description: "Occurence",
      },
      title: { enabled: false },
    },
    plotOptions: {
      series: {
        marker: { enabled: false },
        pointStart: minYear,
        pointInterval: 1, // one year
      },
    },
    legend: { enabled: false },
    series: data.map((d) => ({
      name: d.label,
      data: range.map((year) => d[year] ?? 0),
    })),
  }
}
