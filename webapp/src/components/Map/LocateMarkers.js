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
import iconSupermarket from "../../images/supermarket.png";
import iconHotel from "../../images/hotel.png";
import iconCinema from "../../images/cinema.png";
import iconAcademicInstitution from "../../images/academicInstitution.png";
import iconPublicInstitution from "../../images/publicInstitution.png";
import iconSportsClub from "../../images/sportsClub.png";
import iconMuseum from "../../images/museum.png";
import iconPark from "../../images/park.png";
import iconHospital from "../../images/hospital.png";
import iconPoliceStation from "../../images/policeStation.png";
import iconTransportCenter from "../../images/transportCenter.png";
import iconEntertainment from "../../images/entertainment.png";
import iconRestaurant from "../../images/restaurant.png";

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
import { useTranslation } from "react-i18next";

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
	const [initial, setInitial] = useState(false); // manage to move this to the sidemenu component

	const [actualMarker, setActualMarker] = useState();

	function createCustomIcon(iconUrl, iconSize, iconAnchor) {
		return new L.Icon({
			iconUrl: iconUrl,
			iconSize: iconSize,
			iconAnchor: iconAnchor,
		});
	}

	const customIcon = createCustomIcon(iconCurrentLocation, [35, 35], [5, 30]);
	const customDbIcon = createCustomIcon(iconRed, [35, 35], [5, 30]);
	const monumentIcon = createCustomIcon(iconMonument, [35, 35], [5, 30]);
	const shopIcon = createCustomIcon(iconShop, [35, 35], [5, 30]);
	const barIcon = createCustomIcon(iconBar, [35, 35], [5, 30]);
	const landscapeIcon = createCustomIcon(iconLandscape, [35, 35], [5, 30]);
	const restaurantIcon = createCustomIcon(iconRestaurant, [35, 35], [5, 30]);
	const supermarketIcon = createCustomIcon(iconSupermarket, [35, 35], [5, 30]);
	const hotelIcon = createCustomIcon(iconHotel, [35, 35], [5, 30]);
	const cinemaIcon = createCustomIcon(iconCinema, [35, 35], [5, 30]);
	const academicInstitutionIcon = createCustomIcon(
		iconAcademicInstitution,
		[35, 35],
		[5, 30]
	);
	const publicInstitutionIcon = createCustomIcon(
		iconPublicInstitution,
		[35, 35],
		[5, 30]
	);
	const sportsClubIcon = createCustomIcon(iconSportsClub, [35, 35], [5, 30]);
	const museumIcon = createCustomIcon(iconMuseum, [35, 35], [5, 30]);
	const parkIcon = createCustomIcon(iconPark, [35, 35], [5, 30]);
	const hospitalIcon = createCustomIcon(iconHospital, [35, 35], [5, 30]);
	const policeStationIcon = createCustomIcon(
		iconPoliceStation,
		[35, 35],
		[5, 30]
	);
	const transportCenterIcon = createCustomIcon(
		iconTransportCenter,
		[35, 35],
		[5, 30]
	);
	const entertainmentIcon = createCustomIcon(
		iconEntertainment,
		[35, 35],
		[5, 30]
	);
	const defaultIcon = createCustomIcon(unknownIcon, [35, 35], [5, 30]);
	const addMarkerIcon = createCustomIcon(addMarkIcon, [35, 35], [5, 30]);

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

	const [t, i18n] = useTranslation("translation");

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
							own: true,
						});
					},
				}}
			></Marker>

			{dbMarkers.map((marker, i) => (
				<Marker
					key={i}
					icon={customDbIcon}
					position={marker.coords}
					eventHandlers={{
						click: (e) => {
							setClicked(true);
							setInitial(false);
							setMarkerName(marker.title);
							ctx.handleSelectedMarker(marker);
						},
					}}
				></Marker>
			))}
			{ctx.loaded &&
				ctx.markers.length > 0 &&
				ctx.filteredMarkers.length === 0 &&
				ctx.markers.map((marker, i) => {
					return (
						<Marker
							key={i}
							icon={
								marker.category === "shop"
									? shopIcon
									: marker.category === "bar"
									? barIcon
									: marker.category === "monument"
									? monumentIcon
									: marker.category === "landscape"
									? landscapeIcon
									: marker.category === "restaurant"
									? restaurantIcon
									: marker.category === "supermarket"
									? supermarketIcon
									: marker.category === "hotel"
									? hotelIcon
									: marker.category === "cinema"
									? cinemaIcon
									: marker.category === "academicInstitution"
									? academicInstitutionIcon
									: marker.category === "publicInstitution"
									? publicInstitutionIcon
									: marker.category === "sportsClub"
									? sportsClubIcon
									: marker.category === "museum"
									? museumIcon
									: marker.category === "park"
									? parkIcon
									: marker.category === "hospital"
									? hospitalIcon
									: marker.category === "policeStation"
									? policeStationIcon
									: marker.category === "transportCenter"
									? transportCenterIcon
									: marker.category === "entertainment"
									? entertainmentIcon
									: defaultIcon
							}
							position={marker.coords}
							eventHandlers={{
								click: (e) => {
									ctx.handleSelectedMarker(marker);
								},
							}}
						></Marker>
					);
				})}
			{ctx.filteredMarkers.length > 0 &&
				ctx.changedFilter &&
				ctx.filteredMarkers.map((marker, i) => {
					return (
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
									: marker.category === "restaurant"
									? restaurantIcon
									: marker.category === "supermarket"
									? supermarketIcon
									: marker.category === "hotel"
									? hotelIcon
									: marker.category === "cinema"
									? cinemaIcon
									: marker.category === "academicInstitution"
									? academicInstitutionIcon
									: marker.category === "publicInstitution"
									? publicInstitutionIcon
									: marker.category === "sportsClub"
									? sportsClubIcon
									: marker.category === "museum"
									? museumIcon
									: marker.category === "park"
									? parkIcon
									: marker.category === "hospital"
									? hospitalIcon
									: marker.category === "policeStation"
									? policeStationIcon
									: marker.category === "transportCenter"
									? transportCenterIcon
									: marker.category === "entertainment"
									? entertainmentIcon
									: defaultIcon
							}
							position={marker.coords}
							eventHandlers={{
								click: (e) => {
									// addComment(webId, session, "Test", marker.id);
									ctx.handleSelectedMarker(marker);
								},
							}}
						></Marker>
					);
				})}

			{ctx.createMarker && (
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
