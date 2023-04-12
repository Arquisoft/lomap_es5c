import React, { useState, useContext } from "react";

import Button from "react-bootstrap/Button";

import UserSessionContext from "../../store/session-context";

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
    ctx.handleFilterOption(option);
    if (option !== "All") {
      setFilterOption(option);
      let filteredMarkers = [];
      ctx.markers.map((marker) => {
        if (marker.category === option.toLowerCase()) {
          filteredMarkers.push(marker);
        }
      });
      ctx.handleFilteredMarkers(filteredMarkers);
    } else {
      ctx.handleFilteredMarkers([]);
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
          Filter by category
        </Button>
        <div>
          <select>
            {filterOptions.map((option) => (
              <option
                key={option}
                onClick={() => {
                  handleFilter(option);
                }}
                selected={ctx.filterOption === option}
              >
                {" "}
                {option}
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
