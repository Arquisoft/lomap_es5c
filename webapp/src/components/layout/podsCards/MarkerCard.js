import React, { useEffect } from "react";

import img from "../../../images/test.png";

const MarkerCard = ({ marker }) => {
  const rating_color = {
    color: "#fbc634",
  };

  marker.rating = 3; // this should be obtained from the pod's rating

  // Remember to calculate the rating of the pod and pass it to the marker object (int number)
  let stars = [];
  for (let i = 0; i < 5; ++i) {
    if (i < marker.rating) {
      stars.push(<i className="fa fa-star" style={rating_color} key={i}></i>);
    } else {
      stars.push(<i className="fa fa-star" key={i}></i>);
    }
  }

  return (
    <div className="card my-2 mx-2 " style={{ width: "95%" }}>
      <img
        className="card-img-top mt-2 mx-2"
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
            return (
              <div key={i} className="card mb-2">
                <div className="mx-2 my-2">
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
      <div className="card-body ratings">{stars}</div>
    </div>
  );
};

export default MarkerCard;
