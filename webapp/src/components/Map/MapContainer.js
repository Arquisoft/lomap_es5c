import React, { useState, useEffect } from "react";

import styles from "./MapContainer.module.css";
import Map from "./Maps";
import LoadingSpinner from "../UI/LoadingSpinner";
import SideMenu from "../layout/SideMenu";

// This component is used when the user is not logged in
const MapContainer = () => {
  const [coords, setCorrds] = useState({
    latitude: null,
    longitude: null,
  });
  const [newCoords, setNewCoords] = useState({});
  const [display_name, setName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickedMarker, setClickedMarker] = useState(false);
  const [option, setOption] = useState("read");

  function error() {
    setIsLoaded(false); // Change the isLoaded property to false
    alert("Sorry, no position available.");
  }
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  async function getCurrentCityName() {
    let url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
      "&lat=" +
      coords.latitude +
      "&lon=" +
      coords.longitude;

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
      },
    })
      .then((response) => response.json())
      .then((data) => setName(data.display_name));

    setIsLoaded(true);

    return display_name;
  }

  async function getLocation() {
    const response = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    await setCorrds({
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
    });
    setIsLoaded(true);
  }

  // A useEffect without dependencies loads only on first componente load, otherwise a useEffect
  // with dependencies only runs when the object/s changes
  useEffect(() => {
    if (coords.latitude == null || coords.longitude == null) {
      return;
    }
    // getCurrentCityName();
  }, [coords]);

  useEffect(() => {
    getLocation();
  }, []);

  const style = {
    maxHeight: "100%",
    // Adding media query..
    "@media (max-width: 400px)": {
      maxHeight: "50%",
    },
  };

  return (
    // <div className={styles.container}>
    <>
      {isLoaded ? (
        <div
          className="container-fluid px-0 mt-2 align-items-center"
          style={{ height: "100%" }}
        >
          <div
            className="row gx-3 flex-row flex-grow-1"
            style={{ height: "100%" }}
          >
            <React.Fragment>
              <div
                className="col-md-8 d-flex"
                style={{ maxHeight: "100%", minHeight: "50%" }}
              >
                <Map
                  coords={coords}
                  display_name={display_name}
                  markerEvent={(e) => {
                    setOption("create");
                    console.log("create");
                    setNewCoords(e);
                  }}
                />
              </div>
              <div
                className={`col-md-4  d-flex overflow-auto align-items-center ${styles.map_container}`}
              >
                <div className={styles.container_info}>
                  <SideMenu
                    option={option}
                    coords={newCoords}
                    handleOption={(opt) => {
                      console.log(opt);
                      setOption(opt);
                    }}
                  />
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
      ) : (
        <div className="container-fluid px-0 text-center">
          <div
            className="d-flex justify-content-center"
            style={{ height: "100%" }}
          >
            <LoadingSpinner />
          </div>
        </div>
      )}
    </>
  );
};

export default MapContainer;
