import React, { useEffect } from "react";

import { LatLng } from "leaflet";
import { useSession } from "@inrupt/solid-ui-react";
import { listFriends } from "../Pods/PodsFunctions";
import { listLocationsOfAUser } from "../Pods/PodsFunctions";
import MarkerCard from "./podsCards/MarkerCard";

import PodCreateForm from "../Pods/PodCreateForm";
import LoadingSpinner from "../UI/LoadingSpinner";

const SideMenu = ({ option, coords, handleOption }) => {
  const [loaded, setLoaded] = React.useState(false);

  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  const [firstLoad, setFirstLoad] = React.useState(true);
  const [markersList, setMarkersList] = React.useState([]);

  const loadPodsMarkers = async () => {
    setMarkersList([]);
    var usersIds = await listFriends(webId);
    console.log(usersIds);
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
          },
        ]);
      }
    });

    setLoaded(true);
    console.log(markersList);
  };

  const handleClick = () => {
    setFirstLoad(!firstLoad);
  };

  useEffect(() => {
    console.log(coords);
    loadPodsMarkers();
  }, []);

  return (
    <>
      {option === "pods" && <h1>PODS</h1>}
      {/* {option === "create" && <h1>{coords.latitude}</h1>} */}
      {option === "create" && (
        <PodCreateForm coords={coords} close={handleOption} />
      )}
      {option === "read" && !loaded && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <LoadingSpinner />
        </div>
      )}
      {/* <div>
        <button onClick={handleClick}>Get current city name</button>
      </div> */}
      {firstLoad &&
        option === "read" &&
        loaded &&
        markersList.map((marker, i) => {
          console.log(marker);
          return <MarkerCard key={i} marker={marker} />;
        })}
    </>
  );
};

export default SideMenu;
