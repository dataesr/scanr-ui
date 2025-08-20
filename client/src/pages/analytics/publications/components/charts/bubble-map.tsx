import HighchartsInstance from "highcharts";
import highchartsMap from "highcharts/modules/map";
import clusters from "highcharts/modules/marker-clusters";
import proj4 from "proj4";

import Highcharts from "../../../../../components/analytics-graph/highcharts";
import mapDataIE from "./fr.topo.json";
import HighchartsReact from "highcharts-react-official";
import { Title } from "@dataesr/dsfr-plus";

highchartsMap(HighchartsInstance);
clusters(HighchartsInstance);

export type BubbleMapProps = {
  lat: number;
  lon: number;
  name: string;
  z: number;
}[];

export type PolygonsDataProps = {
  type: string;
  coordinates: [number, number] | [number, number][];
}[];

export default function BubbleMap({ data }: { data: BubbleMapProps }) {
  if (typeof window !== "undefined") {
    (window as any).proj4 = (window as any).proj4 || proj4;
  }
  if (data?.length === 0) return null;

  const mapOptions: HighchartsInstance.Options = {
    chart: {
      map: mapDataIE,
      backgroundColor: "transparent",
      height: "100%",
    },
    mapNavigation: {
      enabled: true,
      mouseWheelSensitivity:1.9,
    },
    mapView: {
      projection: {
        name: "WebMercator",
      },
      padding: "10%",
    },
    tooltip: {
      headerFormat: "Laboratoire - <br>",
      pointFormat: "<b>{point.name}</b> : {point.z} publications",
    },
    plotOptions: {
      mappoint: {

        cluster: {
          enabled: true,
          dataLabels: {
            style: {
              fontSize: '8px'
            },
            y: -1
          },
          allowOverlap: false,
          animation: false,
          layoutAlgorithm: {
            type: 'grid',
            gridSize: 30,
          },
        },
      }
    },
    series: [
      {
        type: "map",
        name: "Basemap",
        mapData: mapDataIE,
        borderColor: "var(--background-default-grey)",
        nullColor: "var(--border-default-grey)",
        showInLegend: false,
        states: {
          inactive: {
            opacity: 1,
          },
        },
      },
      {
        type: "mappoint",
        name: "Laboratoire",
        color: "rgb(225, 139, 118)",
        // minSize: 6,
        // maxSize: 20,
        data: data,
        cursor: "pointer",
        showInLegend: false,
      },
    ],
  };

  return (
    <div className="fr-pb-3w">
      <div style={{ display: 'flex', alignItems: 'start' }}>
        <div style={{ flexGrow: 1 }}>
          <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
            Cartographie des laboratoires
          </Title>
          <p className="fr-text--xs fr-text-mention--grey">Répartition géographique des laboratoires</p>
        </div>
      </div>
      <HighchartsReact
        constructorType={"mapChart"}
        options={mapOptions}
        highcharts={Highcharts}
      />
    </div>
  );
}
