import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { Aggregation } from "../../types/commons";

HighchartsMore(Highcharts);

type CpcChartProps = {
  data: Aggregation[];
};

const sectionLabels: Record<string, string> = {
  A: "Nécessités courantes de la vie",
  B: "Techniques industrielles diverses; transports",
  C: "Chimie; métallurgie",
  D: "Textiles; papier",
  E: "Constructions fixes",
  F: "Mécanique; éclairage; chauffage; armement; sautage",
  G: "Physique",
  H: "Electricité",
  Y: "Technologies émergentes ou celles qui couvrent plusieurs sections",
};

const CpcChart: React.FC<CpcChartProps> = ({ data }) => {
  const colorPalette = [
    "#7AB1E8",
    "#21AB8E",
    "#f6e157",
    "#CE70CC",
    "#FF9575",
    "#FFCA00",
    "#FF732C",
    "#E6BE92",
    "#AEA397",
  ];
  const groupedData = data.reduce((acc, item) => {
    const firstLetter = item.value.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push({
      name: item.value,
      value: item.count,
      label: item.label,
    });
    return acc;
  }, {} as Record<string, { name: string; value: number; label: string }[]>);

  const seriesData = Object.entries(groupedData).map(
    ([letter, items], index) => {
      const totalCount = items.reduce((sum, item) => sum + item.value, 0);
      return {
        name: `Section ${sectionLabels[letter]}`,
        color: colorPalette[index % colorPalette.length],
        data: items.map((item) => ({
          name: item.name,
          value: item.value,
          label: item.label,
        })),
        totalCount,
      };
    }
  );

  const values = seriesData.flatMap((series) =>
    series.data.map((point) => point.value)
  );
  const zMin = Math.min(...values);
  const zMax = Math.max(...values);

  const options = {
    chart: {
      type: "packedbubble",
      backgroundColor: "#f4f4f4",
      height: "600px",
    },
    title: {
      text: null,
    },
    tooltip: {
      formatter: function () {
        const pointName =
          this.point.name && this.point.name !== "undefined"
            ? `<b>${this.point.name}</b>`
            : "";
        const pointLabel =
          this.point.label && this.point.label !== "undefined"
            ? `<b>${this.point.label}</b>`
            : "";
        const familiesText = `Familles de brevets: ${this.point.value}`;

        const sectionName = this.series.name;
        const totalCount = this.series.data.reduce(
          (sum, item) => sum + item.value,
          0
        );
        const totalFamiliesText = `${totalCount} famille${totalCount > 1 ? "s" : ""}`

        if (!pointName && !pointLabel) {
          return `<b>${sectionName}</b>: ${totalFamiliesText}`;
        }

        return `${pointName} ${
          pointLabel ? `- ${pointLabel}` : ""
        }: ${familiesText}`;
      },
    },

    plotOptions: {
      packedbubble: {
        minSize: "45%",
        maxSize: "120%",
        zMin: zMin,
        zMax: zMax,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          parentNodeLimit: true,
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.point.name !== "undefined" ? this.point.name : "";
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: seriesData,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default CpcChart;
