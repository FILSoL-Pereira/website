"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./map-leaflet"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} className="skeleton" />,
});

type EventMapProps = {
  location: { lat: number; lng: number };
  width?: string;
  height?: string;
};

export default function EventMap(props: EventMapProps) {
  return <LeafletMap {...props} />;
}
