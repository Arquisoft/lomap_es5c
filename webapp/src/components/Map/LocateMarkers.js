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
	getSolidDataset,
	getThing,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";

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

	async function createNewPlacesFile(newPlace, propertyName) {
		//Create a new dataset
		const placesDataset = createSolidDataset();

		// Create a new Thing
		const thing = buildThing(
			createThing({
				name: "places.json",
			})
		)
			.addStringNoLocale(propertyName, `{${newPlace}}`)
			.build();

		// Add the Thing to the SolidDataset
		const newDataset = setThing(placesDataset, thing);

		// Save the SolidDataset to the user's Pod
		const savedDataset = await saveSolidDatasetAt(podUrl, newDataset, {
			fetch: session.fetch,
		});
	}

	async function checkIfPlacesFileExists(podUrl) {
		try {
			const dataset = await getSolidDataset(podUrl);
			return dataset !== null;
		} catch (error) {
			return false;
		}
	}

	//Url of the places that user has on his pod
	const podUrl = webId.replace("/profile/card#me", "") + "/public/places.json";

	//Function to save a new place into user's pod
	async function insertThing(coords, name, description) {
		//property name for the thing
		const propertyName = podUrl + "#points";
		//We create the new place in JSON format
		const newPlace = JSON.stringify({
			name: name,
			description: description,
			lat: coords[0].lat,
			lng: coords[0].lng,
		});
		const newDataBlob = new Blob([newPlace], {
			type: "application/json",
		});
		//Check if is a new user or not -> creates a new places file if it is new
		const existsDataset = await checkIfPlacesFileExists(podUrl);
		if (!existsDataset) {
			createNewPlacesFile(newPlace, propertyName);
			return;
		} else {
			const dataset = await getSolidDataset(podUrl);
			let places = getThing(dataset, `${podUrl}#places.json`);
			const existingPoints =
				places.predicates[propertyName].literals[
					"http://www.w3.org/2001/XMLSchema#string"
				][0];
			const modifiedPoints = `${existingPoints.slice(0, -1)},${newPlace}`;

			// Create a new Thing
			const newThing = buildThing(
				createThing({
					name: "places.json",
				})
			)
				.addStringNoLocale(propertyName, `${modifiedPoints}}`)
				.build();

			//Create the new dataset
			const newDataset = setThing(dataset, newThing);

			// Save the SolidDataset to the user's Pod
			const savedDataset = await saveSolidDatasetAt(podUrl, newDataset, {
				fetch: session.fetch,
			});
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
