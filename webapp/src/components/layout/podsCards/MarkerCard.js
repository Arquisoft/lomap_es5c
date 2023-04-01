import React from "react";

import img from "../../../images/test.png";

const MarkerCard = ({ marker }) => {
  return (
    <div className="card my-2 mx-2 " style={{ width: "95%" }}>
      <img
        className="card-img-top"
        src={img}
        alt="Card image cap"
        style={{ maxWidth: "100px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{marker.title}</h5>
        <p className="card-text">{marker.description}</p>
      </div>
      {marker.category !== "" && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{marker.category}</li>
        </ul>
      )}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Latitude: {marker.coords.lat}</li>
        <li className="list-group-item">Longitude: {marker.coords.lng}</li>
      </ul>
    </div>
  );
};

export default MarkerCard;
