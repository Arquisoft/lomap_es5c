import React, { useState, useContext } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import iconRed from "../../images/redMarker.png";
import addMarkIcon from "../../images/newplace.png";
import iconMonument from "../../images/monument.png";
import iconLandscape from "../../images/landscape.png";
import iconShop from "../../images/shop.png";
import iconBar from "../../images/bar.png";
import iconCurrentLocation from "../../images/current_location.png";
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
import UserSessionContext from "../../store/session-context";
import { useTranslation } from "react-i18next";

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

export function createCustomIcon(iconUrl, iconSize, iconAnchor) {
	return new L.Icon({
		iconUrl: iconUrl,
		iconSize: iconSize,
		iconAnchor: iconAnchor,
	});
}

export function getOptionIcon(option) {
	switch (option) {
		case "bar":
			return barIcon;
		case "restaurant":
			return restaurantIcon;
		case "shop":
			return shopIcon;
		case "supermarket":
			return supermarketIcon;
		case "hotel":
			return hotelIcon;
		case "cinema":
			return cinemaIcon;
		case "academicInstitution":
			return academicInstitutionIcon;
		case "publicInstitution":
			return publicInstitutionIcon;
		case "sportsClub":
			return sportsClubIcon;
		case "museum":
			return museumIcon;
		case "park":
			return parkIcon;
		case "landscape":
			return landscapeIcon;
		case "monument":
			return monumentIcon;
		case "hospital":
			return hospitalIcon;
		case "policeStation":
			return policeStationIcon;
		case "transportCenter":
			return transportCenterIcon;
		case "entertainment":
			return entertainmentIcon;
		default:
			return defaultIcon;
	}
}

function LocationMarkers({ coords, markerEvent }) {
	const ctx = useContext(UserSessionContext);

	const initialMarker = new LatLng(coords.latitude, coords.longitude);
	const [dbMarkers, setDbMarkes] = useState([]);
	const [actualMarker, setActualMarker] = useState();

	const map = useMapEvents({
		click(e) {
			markerEvent(e.latlng);
			setActualMarker(e.latlng);
		},
	});

	const [t] = useTranslation("translation");

	return (
		<React.Fragment>
			<Marker
				icon={customIcon}
				position={initialMarker}
				eventHandlers={{
					click: (e) => {
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
							icon={getOptionIcon(marker.category)}
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
							icon={getOptionIcon(marker.category)}
							position={marker.coords}
							eventHandlers={{
								click: (e) => {
									ctx.handleSelectedMarker(marker);
								},
							}}
						></Marker>
					);
				})}

			{ctx.createMarker && (
				<Marker icon={addMarkerIcon} position={actualMarker}></Marker>
			)}
		</React.Fragment>
	);
}

export default LocationMarkers;
