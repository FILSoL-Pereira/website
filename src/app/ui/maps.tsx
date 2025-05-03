"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

type EventMapProps = {
  location: { lat: number; lng: number };
  width?: string;
  height?: string;
};

export default function EventMap({
  location,
  width = "100%",
  height = "100%",
}: EventMapProps) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        style={{ width, height }}
        defaultCenter={location}
        center={location}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker position={location} />
      </Map>
    </APIProvider>
  );
}
