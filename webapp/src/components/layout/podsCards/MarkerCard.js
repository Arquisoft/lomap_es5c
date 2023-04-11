import React, { useEffect } from "react";
import useInput from "../../../hooks/use-input";

import {
  addComment,
  addReviewScore,
  listScoreOfAUser,
} from "../../Pods/PodsFunctions";
import { useSession } from "@inrupt/solid-ui-react";

import styles from "./MarkerCard.module.css";

import img from "../../../images/test.png";

const MarkerCard = ({ marker }) => {
  const rating_color = {
    color: "#fbc634",
  };

  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  // useInput for each input
  const {
    value: enteredComment,
    isValid: validComment,
    hasError: commentInputHasError,
    valueChangeHandler: commentChangeHandler,
    inputBlurHandler: commentBlurHandler,
    reset: resetCommentInput,
  } = useInput((value) => value.trim() !== "");

  // useInput for each input
  const {
    value: enteredScore,
    isValid: validScore,
    hasError: scoreInputHasError,
    valueChangeHandler: scoreChangeHandler,
    inputBlurHandler: scoreBlurHandler,
    reset: resetScoreInput,
  } = useInput((value) => value.trim() !== "");

  // Check for global validity of the form
  let commentIsValid = false;

  if (validComment) {
    commentIsValid = true;
  }

  // Check for global validity of the form
  let scoreIsValid = false;

  if (validScore) {
    scoreIsValid = true;
  }

  // Commment form submission handler
  const formAddCommentHandler = (event) => {
    event.preventDefault();
    addComment(webId, session, enteredComment, marker.id);
    resetCommentInput();
  };

  // Score form submission handler
  const formAddScoreHandler = (event) => {
    event.preventDefault();
    addReviewScore(webId, session, enteredScore, marker.id);

    //Resets the radios selected value
    const radioButtons = document.getElementsByName("rating");
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].checked = false;
    }
    resetScoreInput();
  };

  if (marker.score !== undefined) {
    let listScore = marker.score;
    let meanScore;
    let acc = 0;

    for (var i = 0; i < listScore.length; i++) {
      acc += Number(listScore[i].score);
    }
    meanScore = acc / listScore.length;

    marker.rating = meanScore; // this should be obtained from the pod's rating
  }

  // Remember to calculate the rating of the pod and pass it to the marker object (int number)
  let stars = [];
  for (let i = 0.5; i < 5.5; ++i) {
    if (i < marker.rating) {
      stars.push(<i className="fa fa-star" style={rating_color} key={i}></i>);
    } else {
      stars.push(<i className="fa fa-star" key={i}></i>);
    }
  }

  return (
    <div className="card my-2 mx-2 ">
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
      {marker.id !== "" && marker.id !== undefined && (
        <>
          <form onSubmit={formAddCommentHandler} className={styles.commentText}>
            <div className="commentText">
              <textarea
                className={styles.commentTextArea}
                type="text"
                name="comment"
                id="comment"
                onChange={commentChangeHandler}
                value={enteredComment}
                maxLength="150"
              ></textarea>
            </div>

            <div className={styles.commentButton}>
              <button
                type="submit"
                className={styles.button}
                disabled={!commentIsValid}
              >
                Add Comment
              </button>
            </div>
          </form>

          <form onSubmit={formAddScoreHandler} className={styles.scoreGroup}>
            <div
              className={styles.rating}
              id="stars"
              onChange={scoreChangeHandler}
              value={enteredScore}
            >
              <input type="radio" name="rating" id="star5" value="5" />
              <label for="star5">☆</label>
              <input type="radio" name="rating" id="star4" value="4" />
              <label for="star4">☆</label>
              <input type="radio" name="rating" id="star3" value="3" />
              <label for="star3">☆</label>
              <input type="radio" name="rating" id="star2" value="2" />
              <label for="star2">☆</label>
              <input type="radio" name="rating" id="star1" value="1" />
              <label for="star1">☆</label>
            </div>

            <div className={styles.commentButton}>
              <button
                type="submit"
                className={styles.button}
                disabled={!scoreIsValid}
              >
                Add Score
              </button>
            </div>
          </form>
        </>
      )}
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
                    By:{" "}
                    {comment.author
                      .replace("https://", "")
                      .replace(".inrupt.net/profile/card#me", "")}{" "}
                    on {new Date(comment.date).toDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {marker.id !== "" && marker.id !== undefined && (
        <div className="card-body ratings">{stars}</div>
      )}
    </div>
  );
};

export default MarkerCard;
