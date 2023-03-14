import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import icon from "../../images/icon.png";
import L from "leaflet";

import InfoCard from "../UI/InfoCard";
import PodCreateForm from "../Pods/PodCreateForm";

import styles from "./LocateMarkers.module.css";

function LocationMarkers({ coords }) {
  const [markerName, setMarkerName] = useState();
  const initialMarkers = [new LatLng(coords.latitude, coords.longitude)];
  // const { latitude, longitude } = coords;
  const [markers, setMarkers] = useState(initialMarkers);
  const [clicked, setClicked] = useState(false);
  const [initial, setInitial] = useState(false);

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
    setClicked(true);
  }

  const load = (
    <div className={styles.info_container}>
      <InfoCard position={markerName}></InfoCard>
    </div>
  );

  const form = (
    <div className={styles.info_container}>
      <PodCreateForm coords={markers} />
    </div>
  );

  const aux =
    "leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom";

  const map = useMapEvents({
    click(e) {
      if (e.originalEvent.target.attributes.length > 0) {
        if (aux === e.originalEvent.target.attributes[0].nodeValue) {
          setClicked(false);
          setInitial(true);
          setMarkers((prevValue) => [...prevValue, e.latlng]);
        }
      }
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
              setInitial(false);
              getCurrentCityName(e.latlng.lat, e.latlng.lng);
            },
          }}
        >
          {/* <Popup>Test</Popup> */}
        </Marker>
      ))}
      {clicked && load}
      {initial && form}
    </React.Fragment>
  );
}

export default LocationMarkers;
