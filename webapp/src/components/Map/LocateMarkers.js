import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import icon from "../../images/icon.png";
import L from "leaflet";

import InfoCard from "../UI/InfoCard";

import styles from "./LocateMarkers.module.css";

function LocationMarkers({ coords }) {
  const [markerName, setMarkerName] = useState();
  const initialMarkers = [new LatLng(coords.latitude, coords.longitude)];
  // const { latitude, longitude } = coords;
  const [markers, setMarkers] = useState(initialMarkers);
  const [clicked, setClicked] = useState(false);

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  async function getCurrentCityName(lat, long) {
    let url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
      "&lat=" +
      lat +
      "&lon=" +
      long;

    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
      },
    })
      .then((response) => response.json())
      .then((data) => setMarkerName(data.display_name));
  }

  function onClick(e) {
    console.log(e);
  }

  const load = (
    <div className={styles.info_container}>
      <InfoCard position={markerName}></InfoCard>
    </div>
  );

  const map = useMapEvents({
    click(e) {
      console.log("EJEMPLO");
      // setMarkerName(getPositionName(e.latlng.latitude, e.latlng.longitude));
      markers.push(e.latlng);
      setMarkers((prevValue) => [...prevValue, e.latlng]);
    },
  });

  return (
    <React.Fragment>
      {markers.map((marker, i) => (
        <Marker
          key={i}
          icon={customIcon}
          position={marker}
          eventHandlers={{
            click: (e) => {
              setClicked(true);
              getCurrentCityName(e.latlng.lat, e.latlng.lng);
            },
          }}
        >
          <Popup>TEST</Popup>
        </Marker>
      ))}
      {clicked && load}
    </React.Fragment>
  );
}

export default LocationMarkers;
