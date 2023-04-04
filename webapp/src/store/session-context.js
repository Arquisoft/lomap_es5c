import React, { createContext, useEffect, useState } from "react";

import { LatLng } from "leaflet";

import { useSession } from "@inrupt/solid-ui-react/dist";

const UserSessionContext = createContext({
  markers: [],
  handleMarkers: () => {},
  loaded: false,
});

export const UserSessionProvider = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleMarkers = (newMarkers) => {
    newMarkers.map((place) => {
      for (let i = 0; i < place.length; i++) {
        console.log(place[i].name);
        setMarkers((prevValue) => [
          ...prevValue,
          {
            title: place[i].name,
            coords: new LatLng(place[i].latitude, place[i].longitude),
            description: place[i].description,
            category: place[i].category,
          },
        ]);
      }
    });

    setLoaded(true);
    console.log(markers);
  };

  return (
    <UserSessionContext.Provider
      value={{
        markers,
        handleMarkers,
        loaded,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionContext;
