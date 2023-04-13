import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";

import LocationMarkers from "./LocateMarkers";

export default function Map({ coords, markerEvent }) {
  const { latitude, longitude } = coords;

  return (
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarkers coords={coords} markerEvent={markerEvent} />
    </MapContainer>
  );
}
