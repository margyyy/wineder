"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

type Point = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
};

type Props = {
  points: Point[];
};

export function WineAvailabilityMap({ points }: Props) {
  if (points.length === 0) {
    return <p style={{ margin: 0 }}>Nessun punto disponibile per questo vino.</p>;
  }

  const bounds = points.map((point) => [point.lat, point.lng]) as [number, number][];

  return (
    <div
      style={{
        width: "100%",
        height: 320,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--vm-border)",
      }}
    >
      <MapContainer bounds={bounds} boundsOptions={{ padding: [24, 24] }} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => (
          <CircleMarker key={point.id} center={[point.lat, point.lng]} radius={8} pathOptions={{ color: "#8f1f2e" }}>
            <Popup>
              <strong>{point.name}</strong>
              <br />
              {point.category}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
