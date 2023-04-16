import React, { useState, useContext } from "react";

import Button from "react-bootstrap/Button";

import UserSessionContext from "../../store/session-context";

import { useTranslation } from "react-i18next";

const Card = ({ title, content }) => {
  const ctx = useContext(UserSessionContext);

  const [filterOption, setFilterOption] = useState("all");

  const filterOptions = [
    "All",
    "Other",
    "Landscape",
    "Monument",
    "Shop",
    "Bar",
  ];

  const handleFilter = (option) => {
    ctx.handleChangedFilter(true);
    ctx.handleFilterOption(option.target.value);
    if (option.target.value !== "All") {
      setFilterOption(option.target.value);
      let filteredMarkers = [];
      ctx.markers.map((marker) => {
        if (marker.category === option.target.value.toLowerCase()) {
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
      case "Other":
        return "FilterCard.other";
      case "Landscape":
        return "FilterCard.landscape";
      case "Monument":
        return "FilterCard.monument";
      case "Shop":
        return "FilterCard.shop";
      case "Bar":
        return "FilterCard.bar";
      default:
        return "FilterCard.all";
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
              <option
                key={option}
                value={option}
                // onClick={() => {
                // 	console.log(option);
                // 	handleFilter(option);
                // }}
                // selected={ctx.filterOption === option}
              >
                {" "}
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
