// disable eslint for this file
/* eslint-disable */
// disable typescript for this file
// @ts-nocheck
import { useMemo } from "react";
import { divIcon, latLngBounds } from "leaflet";
import { GeoJSON } from "react-leaflet";
import customGeoJSON from "./custom.geo.json";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

export type MapMarkers = {
  latLng: number[];
  address: string;
  color?: string;
  label?: string;
  zIndexOffset?: number;
};

export type SetMapProps = {
  markers: MapMarkers[];
};

export type MapProps = {
  height?: string;
  markers: MapMarkers[];
  onMarkerDragEnd?: (e: DragEvent) => void;
  width?: string;
  zoom?: number;
  iso2Codes?: string[];
};

const getIcon = (color = "#0078f3") =>
  divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
    <path fill="none" d="M0 0h24v24H0z"/>
      <g fill=${color}>
        <path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
      </g>
    </svg>
  `,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

const iso2Codes = customGeoJSON.features.map(
  (features: any) => features.properties.iso_a2
);
function SetMap({ markers }: SetMapProps) {
  const map = useMap();
  if (markers.length) {
    const markerBounds = markers && latLngBounds(markers.map((m) => m.latLng));
    map.fitBounds(markerBounds, { padding: [50, 50] });
  }
  if (map.getZoom() > 12) map.setZoom(12);
  return null;
}

export default function Map({
  height,
  markers,
  onMarkerDragEnd,
  width,
  zoom = 6,
  iso2Codes = [],
  mapInstance,
}: MapProps) {
  const eventHandlers = useMemo(
    () => ({
      dragend(e: DragEvent) {
        return onMarkerDragEnd(e);
      },
    }),
    [onMarkerDragEnd]
  );
  const theme =
    window.localStorage.getItem("prefers-color-scheme") === "dark"
      ? "dark"
      : "sunny";
  return (
    <MapContainer
      attributionControl
      center={[48.866667, 2.333333]}
      scrollWheelZoom={false}
      style={{ height, width }}
      zoom={zoom}
    >
      <TileLayer
        attribution="<a href='https://www.jawg.io' target='_blank'>&copy; Jawg</a>"
        url={`https://tile.jawg.io/jawg-${theme}/{z}/{x}/{y}.png?access-token=5V4ER9yrsLxoHQrAGQuYNu4yWqXNqKAM6iaX5D1LGpRNTBxvQL3enWXpxMQqTrY8`}
      />
      {markers?.map((marker, i) => (
        <Marker
          zIndexOffset={marker?.zIndexOffset || 10000}
          icon={getIcon(marker.color)}
          draggable={!!onMarkerDragEnd}
          eventHandlers={eventHandlers}
          key={i}
          position={marker.latLng}
        >
          <Tooltip>
            {marker?.label && (
              <>
                {marker.label}
                <br />
              </>
            )}
            {marker.address}
          </Tooltip>
        </Marker>
      ))}
      <SetMap markers={markers} />
      <GeoJSON
        data={customGeoJSON}
        style={(feature: any) => {
          const iso2Code = feature.properties.iso_a2;
          let fillColor = "transparent";
          if (iso2Codes.includes(iso2Code)) {
            fillColor = "blue";
          }
          if (iso2Codes.includes("WO") && fillColor !== "blue") {
            fillColor = "green";
          }
          return {
            fillColor,
            weight: 1,
            opacity: 1,
            color: "white",
            fillOpacity: 0.7,
          };
        }}
      />
    </MapContainer>
  );
}
