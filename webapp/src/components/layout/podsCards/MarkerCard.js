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
        <h1 className="card-title">{marker.title}</h1>
        {marker.description !== "" && (
          <p className="card-text">{marker.description}</p>
        )}
      </div>
      {marker.category !== "" && marker.category !== undefined && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{marker.category}</li>
        </ul>
      )}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Latitude: {marker.coords.lat}</li>
        <li className="list-group-item">Longitude: {marker.coords.lng}</li>
      </ul>
      {marker.comments !== undefined && marker.comments.length !== 0 && (
        <div className="card-body">
          <h5 className="card-title">Comments</h5>
          {marker.comments.map((comment, i) => {
            console.log(comment);
            return (
              <div className="card mb-2">
                <div key={i} className="mx-2 my-2">
                  <p className="card-title" style={{ fontSize: "1.15rem" }}>
                    {comment.comment}
                  </p>
                  <p className="card-text" style={{ fontSize: "0.7rem" }}>
                    By: {comment.author} on{" "}
                    {new Date(comment.date).toDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MarkerCard;
