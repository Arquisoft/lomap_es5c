import React, { useState, useContext } from "react";

import Button from "react-bootstrap/Button";

import UserSessionContext from "../../store/session-context";

import { useTranslation } from "react-i18next";

const Card = ({ title, content }) => {
	const ctx = useContext(UserSessionContext);

	const [filterOption, setFilterOption] = useState("all");

	const filterOptions = [
		"All",
		"Bar",
		"Restaurant",
		"Shop",
		"Supermarket",
		"Hotel",
		"Cinema",
		"AcademicInstitution",
		"PublicInstitution",
		"SportsClub",
		"Museum",
		"Park",
		"Landscape",
		"Monument",
		"Hospital",
		"PoliceStation",
		"TransportCenter",
		"Entertainment",
		"Other",
	];

	const handleFilter = (option) => {
		ctx.handleChangedFilter(true);
		ctx.handleFilterOption(option.target.value);
		if (option.target.value !== "All") {
			setFilterOption(option.target.value);
			let filteredMarkers = [];
			ctx.markers.map((marker) => {
				if (
					marker.category == undefined ||
					marker.category == null ||
					marker.category == ""
				) {
					marker.category = "Other";
					filteredMarkers.push(marker);
				}
				if (
					marker.category.toLowerCase() === option.target.value.toLowerCase()
				) {
					filteredMarkers.push(marker);
				}
			});
			ctx.handleFilteredMarkers(filteredMarkers);
		} else {
			ctx.handleFilteredMarkers([]);
		}
	};

	const [t, i18n] = useTranslation("translation");

	const getLocalizatedOptionValue = (option) => {
		switch (option) {
			case "All":
				return "PodCreateForm.category.all";
			case "Bar":
				return "PodCreateForm.category.bar";
			case "Restaurant":
				return "PodCreateForm.category.restaurant";
			case "Shop":
				return "PodCreateForm.category.shop";
			case "Supermarket":
				return "PodCreateForm.category.supermarket";
			case "Hotel":
				return "PodCreateForm.category.hotel";
			case "Cinema":
				return "PodCreateForm.category.cinema";
			case "AcademicInstitution":
				return "PodCreateForm.category.academicInstitution";
			case "PublicInstitution":
				return "PodCreateForm.category.publicInstitution";
			case "SportsClub":
				return "PodCreateForm.category.sportsClub";
			case "Museum":
				return "PodCreateForm.category.museum";
			case "Park":
				return "PodCreateForm.category.park";
			case "Landscape":
				return "PodCreateForm.category.landscape";
			case "Monument":
				return "PodCreateForm.category.monument";
			case "Hospital":
				return "PodCreateForm.category.hospital";
			case "PoliceStation":
				return "PodCreateForm.category.policeStation";
			case "TransportCenter":
				return "PodCreateForm.category.transportCenter";
			case "Entertainment":
				return "PodCreateForm.category.entertainment";
			default:
				return "PodCreateForm.category.other";
		}
	};

	return (
		<div className="card my-2 mx-2">
			<div className="d-flex justify-content-center align-items-center mx-4">
				<Button
					style={{ margin: "10px 0" }}
					color="primary"
					variant="contained"
				>
					{t("FilterCard.category")}
				</Button>
				<div>
					<select defaultValue={ctx.filterOption} onChange={handleFilter}>
						{filterOptions.map((option) => (
							<option key={option} value={option}>
								{t(getLocalizatedOptionValue(option))}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="d-flex mx-2 my-2 justify-content-end">
				<Button
					className="btn btn-danger"
					onClick={() => {
						handleFilter("All");
					}}
				>
					Reset
				</Button>
			</div>
		</div>
	);
};

export default Card;
