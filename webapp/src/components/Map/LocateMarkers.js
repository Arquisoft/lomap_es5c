import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import icon from "../../images/icon.png";
import L from "leaflet";

function LocationMarkers({ coords, getPositionName }) {
	const [markerName, setMarkerName] = useState();
	const initialMarkers = [new LatLng(coords.latitude, coords.longitude)];
	// const { latitude, longitude } = coords;
	const [markers, setMarkers] = useState(initialMarkers);

	const customIcon = new L.Icon({
		iconUrl: icon,
		iconSize: [25, 35],
		iconAnchor: [5, 30],
	});

	const map = useMapEvents({
		click(e) {
			// setMarkerName(getPositionName(e.latlng.latitude, e.latlng.longitude));
			console.log(e.latlng);
			markers.push(e.latlng);
			setMarkers((prevValue) => [...prevValue, e.latlng]);
		},
	});

	return (
		<React.Fragment>
			{markers.map((marker) => (
				<Marker icon={customIcon} position={marker}>
					<Popup>TEST</Popup>
				</Marker>
			))}
		</React.Fragment>
	);
}

export default LocationMarkers;
