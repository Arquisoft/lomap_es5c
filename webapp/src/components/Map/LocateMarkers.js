import React, { useState, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import icon from "../../images/icon.png";
import iconRed from "../../images/redMarker.png";
import L from "leaflet";
import { useSession } from "@inrupt/solid-ui-react";
import InfoCard from "../UI/InfoCard";
import PodCreateForm from "../Pods/PodCreateForm";
import styles from "./LocateMarkers.module.css";
import { insertNewMarker } from "../Pods/PodsFunctions";

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

	//PODS
	const { session } = useSession(); // Hook for providing access to the session in the component
	const { webId } = session.info; // User's webId
	//Url of the places that user has on his pod
	const podUrl = webId.replace("/profile/card#me", "/private/places.json");

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

	// FOR PODS ------------------------------------------

	//Function to save a new place into user's pod
	async function insertThing(coords, name, description) {
		{
			return insertNewMarker(coords, name, description, podUrl, session, webId);
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
