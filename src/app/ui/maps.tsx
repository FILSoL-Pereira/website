"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function EventMap() {
  const eventLocation = { lat: 4.790286, lng: -75.69014 };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={eventLocation}
        center={eventLocation}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        
      >
        <Marker position={eventLocation} />
      </Map>
    </APIProvider>
  );
}
