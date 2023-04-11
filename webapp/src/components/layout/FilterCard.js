import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import FilterButton from "./FilterButton";

const Card = ({ title, content }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleClose = () => {
    setIsHidden(true);
    setShowButton(true);
  };

  const [showOptions, setShowOptions] = useState(false);
  const filterOptions = ["Other", "Landscape", "Monument", "Shop", "Bar"];

  const [info, setInfo] = useState("");

  if (isHidden) {
    return null;
  }

  const filter = () => {
    setInfo("Que pasa aqui");
  };

  return (
    <div className="card">
      <div className="card-header">{title}</div>

      <div className="card-body">
        <div className="d-flex justify-content-center align-items-center mx-4">
          <Button
            style={{ margin: "10px 0" }}
            color="primary"
            variant="contained"
            onClick="myPoints()"
          >
            My maps
          </Button>
        </div>

        <div className="d-flex justify-content-center align-items-center mx-4">
          <Button
            style={{ margin: "10px 0" }}
            color="primary"
            variant="contained"
            onClick="filter"
          >
            Filter by category
          </Button>
          <div>
            {!showOptions && (
              <select>
                {filterOptions.map((option) => (
                  <option key={option}> {option}</option>
                ))}
              </select>
            )}
          </div>
          <p>{info}</p>
        </div>
      </div>
      <div className="card-footer">
        <button
          className="d-flex justify-content-center align-items-center mx-4"
          onClick={handleClose}
        >
          {" "}
          Close{" "}
        </button>
      </div>
    </div>
  );
};

export default Card;
