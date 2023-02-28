import React, { useState, useEffect } from "react";

import styles from "./NotLoggedText.module.css";
import Map from "../Map/Maps";

// This component is used when the user is not logged in
const NotLoggedText = () => {
  const [coords, setCorrds] = useState({
    latitude: 43.254501,
    longitude: -5.76885,
  });
  const [display_name, setName] = useState("");

  function error() {
    alert("Sorry, no position available.");
  }
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  async function getCurrentCityName(position) {
    setCorrds({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    // let url = `https://nominatim.openstreetmap.org/reverse?
    // &lat=${coords.latitude}
    // &lon=${coords.longitude}`
    let url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
      "&lat=" +
      coords.latitude +
      "&lon=" +
      coords.longitude;

    await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
      },
    })
      .then((response) => response.json())
      .then((data) => setName(data.display_name));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      // (position) => {
      // console.log("Lon:" + position.coords.longtitude);
      // setCorrds({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // });

      // },
      getCurrentCityName,
      error,
      options
    );
  }, []);

  return (
    <div className={styles.container}>
      <Map coords={coords} display_name={display_name} />
    </div>
    // <div className={styles.container}>
    //   <p className={styles.text}>NOT LOGGED IN, PLEASE LOGIN!</p>
    // </div>
  );
};

export default NotLoggedText;
