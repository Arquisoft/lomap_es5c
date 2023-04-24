import React, { useState, useEffect, useContext } from "react";

import styles from "./MapContainer.module.css";
import Map from "./Maps";
import LoadingSpinner from "../UI/LoadingSpinner";
import SideMenu from "../layout/SideMenu";

import UserSessionContext from "../../store/session-context";

// This component is used when the user is not logged in
const MapContainer = () => {
	const ctx = useContext(UserSessionContext);

	const [coords, setCorrds] = useState({
		latitude: null,
		longitude: null,
	});
	const [newCoords, setNewCoords] = useState({});
	const [display_name, setName] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const [clickedMarker, setClickedMarker] = useState(false);
	const [option, setOption] = useState("userPods");
	const [prevOption, setPrevOption] = useState("userPods");

	function error() {
		setIsLoaded(false); // Change the isLoaded property to false
		alert("Sorry, no position available.");
	}
	const options = {
		enableHighAccuracy: true,
		maximumAge: 30000,
		timeout: 27000,
	};

	async function getLocation() {
		const response = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		});

		setCorrds({
			latitude: response.coords.latitude,
			longitude: response.coords.longitude,
		});
		setIsLoaded(true);
	}

	// A useEffect without dependencies loads only on first componente load, otherwise a useEffect
	// with dependencies only runs when the object/s changes
	useEffect(() => {
		if (coords.latitude == null || coords.longitude == null) {
			return;
		}
	}, [coords]);

	useEffect(() => {
		getLocation();
	}, []);

	let backgroundStyle =
		ctx.pageStyle === "light"
			? { backgroundColor: "#ffffff" }
			: { backgroundColor: "#212529" };

	let sideMenuStyle =
		ctx.pageStyle === "light"
			? { backgroundColor: "#ffffff" }
			: { backgroundColor: "#424e5c" };

	return (
		<>
			{isLoaded ? (
				<div
					className="container-fluid px-0 align-items-center"
					style={{ height: "90vh" }}
				>
					<div
						className="row gx-2 flex-row flex-grow-1"
						style={{ height: "100%" }}
					>
						<React.Fragment>
							<div
								className="col-md-8 d-flex"
								style={{
									maxHeight: "100%",
									minHeight: "50%",
									backgroundColor: backgroundStyle.backgroundColor,
								}}
							>
								<Map
									coords={coords}
									display_name={display_name}
									markerEvent={(e) => {
										setOption("create");
										ctx.handleCreateMarker(true);
										setNewCoords(e);
									}}
								/>
							</div>
							<div
								className={`col-md-4 d-flex align-items-center ${styles.map_container}`}
								style={{ backgroundColor: backgroundStyle.backgroundColor }}
							>
								<div
									className={`dark ${styles.container_info}`}
									style={sideMenuStyle}
								>
									<SideMenu
										option={option}
										prevOption={prevOption}
										coords={newCoords}
										handleOption={(opt) => {
											if (
												opt !== "friends" &&
												opt !== "filter" &&
												opt !== "markerInfo" &&
												opt !== "create"
											) {
												setPrevOption(opt);
											}
											setOption(opt);
										}}
									/>
								</div>
							</div>
						</React.Fragment>
					</div>
				</div>
			) : (
				<div className="container-fluid px-0 text-center">
					<div
						className="d-flex justify-content-center"
						style={{ height: "100%" }}
					>
						<LoadingSpinner />
					</div>
				</div>
			)}
		</>
	);
};

export default MapContainer;
