import React, { useState, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import icon from "../../images/icon.png";
import iconRed from "../../images/redMarker.png";
import L from "leaflet";
import {
  createSolidDataset,
  createThing,
  setThing,
  saveSolidDatasetAt,
  buildThing,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { SCHEMA_INRUPT, RDF } from "@inrupt/vocab-common-rdf";

import InfoCard from "../UI/InfoCard";
import PodCreateForm from "../Pods/PodCreateForm";

import styles from "./LocateMarkers.module.css";

function LocationMarkers({ coords }) {
  const [markerName, setMarkerName] = useState();
  const initialMarker = new LatLng(coords.latitude, coords.longitude);
  // const { latitude, longitude } = coords;
  const [markers, setMarkers] = useState([]);
  const [dbMarkers, setDbMarkes] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [initial, setInitial] = useState(false);

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [30, 40],
    iconAnchor: [5, 30],
  });

  const customDbIcon = new L.Icon({
    iconUrl: iconRed,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  const handleFetch = async () => {
    const response = await fetch("http://localhost:5001/place/list").then(
      (res) => res.json()
    );

    response.map((place) =>
      setDbMarkes((prevValue) => [
        ...prevValue,
        {
          title: place.name,
          coords: new LatLng(place.latitude, place.longitude),
        },
      ])
    );
  };
  useEffect(() => {
    handleFetch();
  }, []);

  async function getCurrentCityName(lat, long) {
    let url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
      "&lat=" +
      lat +
      "&lon=" +
      long;

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
      <PodCreateForm coords={markers} saveData={insertThing} />
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

  // PARA LOS PODS
  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  const podUrl = webId.replace("/profile/card#me", "") + "/public/";

  async function insertThing(coords, name, description) {
    // Create a new SolidDataset
    const dataset = createSolidDataset();

    const id =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    // Create a new Thing
    const thing = buildThing(
      createThing({
        name: id,
      })
    )
      .addStringNoLocale(SCHEMA_INRUPT.name, "name: " + name)
      .addStringNoLocale(SCHEMA_INRUPT.name, "description: " + description)
      .addStringNoLocale(SCHEMA_INRUPT.name, "lat: " + coords[0].lat)
      .addStringNoLocale(SCHEMA_INRUPT.name, "lng: " + coords[0].lng)
      .build();

    // Add the Thing to the SolidDataset
    const newDataset = setThing(dataset, thing);

    // Save the SolidDataset to the user's Pod
    const savedDataset = await saveSolidDatasetAt(
      podUrl + "places.json",
      newDataset,
      { fetch: session.fetch }
    );

    console.log("Datos guardados"); // TODO: delete on prod time
  }

  return (
    <React.Fragment>
      <Marker
        icon={customIcon}
        position={initialMarker}
        eventHandlers={{
          click: (e) => {
            setInitial(false);
            getCurrentCityName(e.latlng.lat, e.latlng.lng);
          },
        }}
      ></Marker>
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
      {dbMarkers.map((marker, i) => (
        <Marker
          key={i}
          icon={customDbIcon}
          position={marker.coords}
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
