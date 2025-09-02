import { colors as defaultColors } from "../utils/colors";
import HighchartsInstance from "highcharts";
import { GetGraphOptionsProps } from "./types";

type StackedBarChartOptionsProps = Omit<GetGraphOptionsProps, "data"> & {
  slice?: number;
  data: {
    categories: string[];
    series: {
      name: string;
      data: Array<{
        name: string;
        y: number;
      }>;
      stack: string;
    }[];
  };
};


export default function getStackedBarChartOptions({ data, colors = [], height = "auto", title = "", subtitle = "", slice = 15}: StackedBarChartOptionsProps): HighchartsInstance.Options {
  if (height === "auto") {
    height = `${data.categories.slice(0, slice).length * 30}px`;
  }

  return {
    chart: {
      height,
      margin: [0, 0, 0, 0],

    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'bottom',
      layout: 'vertical',
    },
    xAxis: {
      type: 'category',
      categories: data.categories.slice(0, slice),
      visible: false,
      tickLength: 0,
    },
    yAxis: {
      visible: false,
      labels: {
        enabled: false
      },
      tickLength: 0,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function() {
        const categoryIndex = this.points[0].point.index;
        let tooltipContent = `<b style="font-size: 12px">${this.points[0].point.category}</b><br/>`;
        const total = this.points.reduce((acc, point) => acc + point.y, 0);
        tooltipContent += `<br/><b>Nombre d'auteurs: ${total}</b><br/>`;
        this.points.forEach((point) => {
          const seriesIndex = point.series.index;
          const seriesData = data.series[seriesIndex].data[categoryIndex];
          const authors = typeof seriesData === 'object' ? seriesData?.name : '';
          if (point.y > 0) {
            tooltipContent += `<br/><b>${point.series.name}: ${point.y}</b><br/>`;
            if (authors) {
              tooltipContent += `${authors}<br/>`;
            }
          }
        });

        return tooltipContent;
      }
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
      },
    },
    colors: colors?.length ? colors : defaultColors,
    series: data.series.map((series, i) => ({
      name: series.name,
      data: series.data.slice(0, slice).map(point => ({
        y: point.y,
        name: point.name,
        category: data.categories[series.data.indexOf(point)]
      })),
      pointPadding: 0.2,
      groupPadding: 0,
      type: 'bar',
      dataLabels: {
        align: 'left',
        inside: true,
        enabled: true,
        formatter: function() {
          if (i !== 0) {
            return this.point.category;
          }
        }
      }
    }))
  };
}
