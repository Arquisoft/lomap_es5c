import React, { createContext, useState } from "react";

import { LatLng } from "leaflet";

const UserSessionContext = createContext({
  webId: "",
  markers: [],
  filteredMarkers: [],
  handleMarkers: () => {},
  handleFilteredMarkers: () => {},
  filterOption: "all",
  handleFilterOption: () => {},
  loaded: false,
  selectedMarker: null,
  handleSelectedMarker: () => {},
  pageStyle: "dark",
  handleStyle: () => {},
});

export const UserSessionProvider = ({ children }) => {
  const [webId, setWebId] = useState("");

  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [filterOption, setFilterOption] = useState("all");

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [pageStyle, setPageStyle] = useState("dark");

  const handleSessionWebId = (webId) => {
    window.localStorage.setItem("webId", webId);
    setWebId(webId);
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
            score: place[i].reviewScores,
          },
        ]);
      }
    });

    setLoaded(true);
  };

  const handleFilteredMarkers = (newMarkers) => {
    if (newMarkers.length === 0) {
      setFilteredMarkers([]);
      return;
    }
    setFilteredMarkers([]);
    newMarkers.map((place) => {
      console.log(place);
      setFilteredMarkers((prevValue) => [
        ...prevValue,
        {
          id: place.id,
          title: place.title,
          coords: new LatLng(place.coords.lat, place.coords.lng),
          description: place.description,
          category: place.category,
          comments: place.comments,
          score: place.score,
        },
      ]);
    });
    console.log(filteredMarkers);
  };

  const handleFilterOption = (option) => {
    setFilterOption(option);
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
        filteredMarkers,
        handleFilteredMarkers,
        filterOption,
        handleFilterOption,
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
