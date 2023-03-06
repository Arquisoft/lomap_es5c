import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  // MapConsumer,
} from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../images/icon.png";
import L from "leaflet";

export default function Map({ coords, display_name }) {
  const { latitude, longitude } = coords;
  const markers = [[latitude, longitude]];

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  const addMarker = (e) => {
    console.log("TEST");
    markers.push(e.latlng);
    // this.setState({ markers });
  };

  function MapView() {
    let map = useMap();
    map.setView([latitude - 0.005, longitude], map.getZoom());

    return null;
  }

  return (
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={true}
      click={addMarker}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <MapConsumer>
        {(map) => {
          console.log("map center:", map.getCenter());
          map.on("click", function (e) {
            const { lat, lng } = e.latlng;
            L.marker([lat, lng], { icon }).addTo(map);
          });
          return null;
        }}
      </MapConsumer> */}
      <Marker icon={customIcon} position={[latitude, longitude]}>
        <Popup>{display_name}</Popup>
      </Marker>
      <MapView />
    </MapContainer>
  );
}
