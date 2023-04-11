import React, { useState, useEffect, useContext } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import iconRed from "../../images/redMarker.png";
import addMarkIcon from "../../images/newplace.png";
import iconMonument from "../../images/monument.png";
import iconLandscape from "../../images/landscape.png";
import iconShop from "../../images/shop.png";
import iconBar from "../../images/bar.png";
import iconCurrentLocation from "../../images/current_location.png";
import iconFriends from "../../images/friends.png";
import unknownIcon from "../../images/unknown.png";
import L from "leaflet";
import { useSession } from "@inrupt/solid-ui-react";
import InfoCard from "../UI/InfoCard";
import PodCreateForm from "../Pods/PodCreateForm";
import styles from "./LocateMarkers.module.css";
import { insertNewMarker } from "../Pods/PodsFunctions";

import { listFriends } from "../Pods/PodsFunctions";
import { listLocationsOfAUser } from "../Pods/PodsFunctions";
import { addComment } from "../Pods/PodsFunctions";

import UserSessionContext from "../../store/session-context";
import {useTranslation} from "react-i18next"

function LocationMarkers({ coords, markerEvent }) {
	const ctx = useContext(UserSessionContext);

	const [markerName, setMarkerName] = useState();
	const initialMarker = new LatLng(coords.latitude, coords.longitude);
	// const { latitude, longitude } = coords;
	const [markers, setMarkers] = useState([]);
	const [dbMarkers, setDbMarkes] = useState([]);
	const [podMarkers, setPodMarkers] = useState([]);
	const [podMarkersLoaded, setPodMarkersLoaded] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [initial, setInitial] = useState(false);

	const [actualMarker, setActualMarker] = useState();

	const customIcon = new L.Icon({
		iconUrl: iconCurrentLocation,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	const customDbIcon = new L.Icon({
		iconUrl: iconRed,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	const monumentIcon = new L.Icon({
		// iconUrl: iconYellow,
		iconUrl: iconMonument,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	const shopIcon = new L.Icon({
		iconUrl: iconShop,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	const barIcon = new L.Icon({
		iconUrl: iconBar,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	const landscapeIcon = new L.Icon({
		iconUrl: iconLandscape,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	const defaultIcon = new L.Icon({
		iconUrl: unknownIcon,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	const addMarkerIcon = new L.Icon({
		iconUrl: addMarkIcon,
		iconSize: [35, 35],
		iconAnchor: [5, 30],
	});

	//PODS
	const { session } = useSession(); // Hook for providing access to the session in the component
	const { webId } = session.info; // User's webId
	//Url of the places that user has on his pod
	const podUrl = webId.replace(
		"/profile/card#me",
		"/justforfriends/locations.json"
	);

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

	const loadPodsMarkers = async () => {
		// setPodMarkers([]);
		ctx.markers.map((place) =>
			setPodMarkers((prevValue) => [
				...prevValue,
				{
					title: place.name,
					coords: new LatLng(place.latitude, place.longitude),
				},
			])
		);

		setPodMarkersLoaded(true);
	};

	useEffect(() => {
		handleFetch();
		// loadPodsMarkers();
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
			<PodCreateForm coords={actualMarker} saveData={insertThing} />
		</div>
	);

	const aux = "leaflet-container leaflet-touch";

	const map = useMapEvents({
		click(e) {
			markerEvent(e.latlng);
			// if (e.originalEvent.target.attributes.length > 0) {
			//   // if (aux === e.originalEvent.target.attributes[0].nodeValue) {
			//   if (e.originalEvent.target.attributes[0].nodeValue.includes(aux)) {
			//     setClicked(false);
			setInitial(true);
			setActualMarker(e.latlng);
			//     //setMarkers((prevValue) => [...prevValue, e.latlng]);
			//   }
			// }
		},
	});

	const[t, i18n] = useTranslation("translation");

	// FOR PODS ------------------------------------------

	//Function to save a new place into user's pod
	async function insertThing(coords, name, description, category) {
		{
			var result = insertNewMarker(
				coords,
				name,
				description,
				podUrl,
				session,
				webId,
				category //WE HAVE TO ADD THIS
			);
			setInitial(!result);
			if (result) setMarkers((prevValue) => [...prevValue, actualMarker]);
			return result;
		}
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
						ctx.handleSelectedMarker({
							title: t("LocateMarkers.here"),
							coords: e.latlng,
						});
					},
				}}
			></Marker>

			{/* {markers.map((marker, i) => (
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
        ></Marker>
      ))} */}
			{dbMarkers.map((marker, i) => (
				<Marker
					key={i}
					icon={customDbIcon}
					position={marker.coords}
					eventHandlers={{
						click: (e) => {
							setClicked(true);
							setInitial(false);
							//   getCurrentCityName(e.latlng.lat, e.latlng.lng);
							setMarkerName(marker.title);
							ctx.handleSelectedMarker(marker);
						},
					}}
				>
					{/* <Popup>Test</Popup> */}
				</Marker>
			))}
			{ctx.loaded &&
				ctx.markers.map((marker, i) => (
					<Marker
						key={i}
						// icon={monumentIcon}
						icon={
							marker.category === "shop"
								? shopIcon
								: marker.category === "bar"
								? barIcon
								: marker.category === "monument"
								? monumentIcon
								: marker.category === "landscape"
								? landscapeIcon
								: defaultIcon
						}
						position={marker.coords}
						eventHandlers={{
							click: (e) => {
								// console.log("clicked:", marker);
								// addComment(webId, session, "Test", marker.id);
								ctx.handleSelectedMarker(marker);
							},
						}}
					></Marker>
				))}

			{/* {podMarkersLoaded &&
        podMarkers.map(
          (marker, i) => (
            console.log(marker),
            (
              <Marker
                key={i}
                icon={customDbIcon}
                position={marker.coords}
                eventHandlers={{
                  click: (e) => {
                    setClicked(true);

                    // setInitial(false);
                    // getCurrentCityName(e.latitude, e.latlng.lng);
                    setMarkerName(marker.title);
                  },
                }}
              ></Marker>
            )
          )
        )} */}
			{/* {clicked && load}
      {initial && form} */}
			{initial && (
				<Marker
					icon={addMarkerIcon}
					position={actualMarker}
					eventHandlers={{
						click: (e) => {
							setInitial(false);
							getCurrentCityName(e.latlng.lat, e.latlng.lng);
						},
					}}
				></Marker>
			)}
		</React.Fragment>
	);
}

export default LocationMarkers;
