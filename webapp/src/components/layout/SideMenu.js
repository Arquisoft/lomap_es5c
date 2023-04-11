import React, { useContext, useEffect } from "react";

import { LatLng, setOptions } from "leaflet";
import { useSession } from "@inrupt/solid-ui-react";
import { listFriends } from "../Pods/PodsFunctions";
import { listLocationsOfAUser } from "../Pods/PodsFunctions";
import MarkerCard from "./podsCards/MarkerCard";

import PodCreateForm from "../Pods/PodCreateForm";
import LoadingSpinner from "../UI/LoadingSpinner";

import UserSessionContext from "../../store/session-context";

import FriendsList from "../Friends/FriendsList";

import { Button } from "react-bootstrap";

import OptionsMenu from "./OptionsMenu";
import FilterCard from "./FilterCard";

const SideMenu = ({ option, coords, handleOption }) => {
  const ctx = useContext(UserSessionContext);

  const [loaded, setLoaded] = React.useState(false);
  const [loadedUserPods, setLoadedUserPods] = React.useState(false);

  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  const [firstLoad, setFirstLoad] = React.useState(true);
  const [markersList, setMarkersList] = React.useState([]);

  const loadUserPodsMarkers = async () => {
    setMarkersList([]);
    var locations = [];

    locations.push(await listLocationsOfAUser(webId, session));

    locations.map((place) => {
      for (let i = 0; i < place.length; i++) {
        setMarkersList((prevValue) => [
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

    // console.log(l);
    ctx.handleMarkers(locations); // we add the markers to the context
    setLoadedUserPods(true);
    setFirstLoad(false);
  };

  const loadPodsMarkers = async () => {
    setMarkersList([]);
    var usersIds = await listFriends(webId);
    usersIds.push(webId);
    var locations = [];
    for (let i = 0; i < usersIds.length; i++) {
      locations.push(await listLocationsOfAUser(usersIds[i], session));
    }

    locations.map((place) => {
      for (let i = 0; i < place.length; i++) {
        setMarkersList((prevValue) => [
          ...prevValue,
          {
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

  const handleClick = () => {
    setFirstLoad(!firstLoad);
  };

  useEffect(() => {
    if (firstLoad) {
      loadUserPodsMarkers();
    }
  }, []);

  useEffect(() => {
    if (ctx.selectedMarker !== null) {
      handleOption("markerInfo");
    }
  }, [ctx.selectedMarker]);

  return (
    <>
      <OptionsMenu
        changeOption={(opt) => {
          handleOption(opt);
        }}
      />
      {option === "userPods" && !loadedUserPods && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <LoadingSpinner />
        </div>
      )}
      {loadedUserPods &&
        option === "userPods" &&
        markersList.map((marker, i) => {
          return <MarkerCard key={i} marker={marker} />;
        })}
      {option === "create" && (
        <PodCreateForm coords={coords} close={handleOption} />
      )}
      {option === "read" && !loaded && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <LoadingSpinner />
        </div>
      )}
      {option === "friends" && <FriendsList close={handleOption} />}
      {option === "friends" && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <LoadingSpinner />
        </div>
      )}
      {option === "read" &&
        loaded &&
        markersList.map((marker, i) => {
          return <MarkerCard key={i} marker={marker} />;
        })}
      {option === "markerInfo" && (
        <>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close mx-3 mt-2"
              style={{ fontSize: "1rem" }}
              aria-label="Close"
              onClick={() => {
                console.log("close");
                handleOption("userPods");
                ctx.handleSelectedMarker(null);
              }}
            ></button>
          </div>
          <MarkerCard marker={ctx.selectedMarker} />
        </>
      )}
      {option === "filter" && <FilterCard />}
    </>
  );
};

export default SideMenu;
