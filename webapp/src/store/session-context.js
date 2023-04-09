import React, { createContext, useState } from "react";

import { LatLng } from "leaflet";

const UserSessionContext = createContext({
  webId: "",
  markers: [],
  handleMarkers: () => {},
  loaded: false,
  selectedMarker: null,
  handleSelectedMarker: () => {},
  pageStyle: "dark",
  handleStyle: () => {},
});

export const UserSessionProvider = ({ children }) => {
  const [webId, setWebId] = useState("");

  const [markers, setMarkers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [pageStyle, setPageStyle] = useState("dark");

  const handleSessionWebId = (webId) => {
    window.localStorage.setItem("webId", webId);
    console.log("WebId: " + webId);
    setWebId(webId);
    console.log("WebId: " + webId);
  };

  const handleMarkers = (newMarkers) => {
    newMarkers.map((place) => {
      for (let i = 0; i < place.length; i++) {
        setMarkers((prevValue) => [
          ...prevValue,
          {
            id: place[i].id,
            title: place[i].name,
            coords: new LatLng(place[i].latitude, place[i].longitude),
            description: place[i].description,
            category: place[i].category,
            comments: place[i].comments,
            score: place[i].reviewScores
          },
        ]);
      }
    });

    setLoaded(true);
  };

  const handleSelectedMarker = (marker) => {
    setSelectedMarker(marker);
  };

  const handleStyle = (style) => {
    setPageStyle(style);
  };

  return (
    <UserSessionContext.Provider
      value={{
        webId,
        markers,
        handleMarkers,
        loaded,
        selectedMarker,
        handleSelectedMarker,
        handleSessionWebId,
        pageStyle,
        handleStyle,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionContext;
