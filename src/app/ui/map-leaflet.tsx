"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  location: { lat: number; lng: number };
  width?: string;
  height?: string;
};

export default function LeafletMap({ location, width = "100%", height = "100%" }: Props) {
  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={15}
      style={{ width, height }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]} icon={markerIcon} />
    </MapContainer>
  );
}
