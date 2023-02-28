import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../images/icon.png";
import L from "leaflet";

export default function Map({ coords, display_name }) {
  const { latitude, longitude } = coords;

  console.log(latitude);
  console.log(longitude);
  // console.log(longitude );
  // const { lat, long } = coords;

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());

    return null;
  }

  return (
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customIcon} position={[latitude, longitude]}>
        <Popup>{display_name}</Popup>
      </Marker>
      <MapView />
    </MapContainer>
  );
}
