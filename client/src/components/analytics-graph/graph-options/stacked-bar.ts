import { colors as defaultColors } from "../utils/colors";
import HighchartsInstance from "highcharts";
import { GetGraphOptionsProps } from "./types";

type StackedBarChartOptionsProps = Omit<GetGraphOptionsProps, "data"> & {
  slice?: number;
  data: {
    categories: string[];
    series: {
      name: string;
      data: number[];
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
    plotOptions: {
      bar: {
        stacking: 'normal',
      },
    },
    colors: colors?.length ? colors : defaultColors,
    series: data.series.map((series, i) => ({
      ...series,
      data: series.data.slice(0, slice),
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
}
