import React, { useEffect, useState, useContext } from "react";
import useInput from "../../../hooks/use-input";

import {
  addComment,
  addReviewScore,
  removeMarker,
} from "../../../podsFunctions/PodsFunctions";

import { uploadImages } from "../../../firebaseImages/ImagesFunctions";

import { useSession } from "@inrupt/solid-ui-react";

import styles from "./MarkerCard.module.css";

import { useTranslation } from "react-i18next";

import UserSessionContext from "../../../store/session-context";

import { Button, Carousel, Modal } from "react-bootstrap";

const MarkerCard = ({ marker, needsUpdate, canDelete }) => {
  const ctx = useContext(UserSessionContext);

  const rating_color = {
    color: "#fbc634",
  };

  const { session } = useSession(); // Hook for providing access to the session in the component
  const webId = session.info;
  let webIdM;
  if (marker.id !== undefined)
    webIdM = marker.id.split("@")[0]; // User's webId.
  else webIdM = webId;

  const starsIds = ["star5", "star4", "star3", "star2", "star1"];

  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  const [canScore, setCanScore] = useState(true);
  const [canScore2, setCanScore2] = useState(true);

  // useInput for each input
  const {
    value: enteredComment,
    isValid: validComment,
    valueChangeHandler: commentChangeHandler,
    reset: resetCommentInput,
  } = useInput((value) => value.trim() !== "");

  // useInput for each input
  const {
    value: enteredScore,
    isValid: validScore,
    valueChangeHandler: scoreChangeHandler,
    reset: resetScoreInput,
  } = useInput((value) => value.trim() !== "");

  const [t] = useTranslation("translation");

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

    addComment(webIdM, session, enteredComment, marker.id);
    resetCommentInput();

    ctx.handleAddComment(marker.id, {
      author: webId.webId,
      comment: enteredComment,
      date: new Date(),
    });
  };

  // Score form submission handler
  const formAddScoreHandler = async (event) => {
    event.preventDefault();

    await addReviewScore(webIdM, session, enteredScore, marker.id);

    //Resets the radios selected value
    const radioButtons = document.getElementsByName("rating");
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].checked = false;
    }
    resetScoreInput();
    setCanScore2(false);
    calculateRating();
    needsUpdate(true);
  };

  if (marker.score !== undefined && marker.rating === undefined) {
    let listScore = marker.score;
    let meanScore;
    let acc = 0;
    let ableToScore = true;

    for (let i = 0; i < listScore.length; i++) {
      acc += Number(listScore[i].score);
      if (listScore[i].author === webId.webId) {
        ableToScore = false;
      }
    }
    meanScore = acc / listScore.length;

    marker.rating = meanScore; // this should be obtained from the pod's rating

    setCanScore(ableToScore);
    console.log("ENTRA");
  }

  var stars = [];

  const calculateRating = () => {
    stars = [];
    for (let i = 0.5; i < 5.5; ++i) {
      if (i < marker.rating) {
        stars.push(<i className="fa fa-star" style={rating_color} key={i}></i>);
      } else {
        stars.push(<i className="fa fa-star" key={i}></i>);
      }
    }
  };

  calculateRating();

  const handleDeleteMarker = async () => {
    await removeMarker(webIdM, session, marker.id);
    needsUpdate(true);
  };

  const [file, setFile] = useState([]);

  const handleChange = (e) => {
    setFile([]);
    let aux = e.target.files;
    for (let i = 0; i < aux.length; i++) {
      setFile((files) => [...files, aux[i]]);
    }
  };

  const submitFile = async () => {
    await uploadImages(marker.id, file, session, webIdM);
    needsUpdate(true);
  };

  const [image, setImage] = useState(null);

  const handleImageModal = (image) => {
    setImage(null);
    setShow(true);
    setImage(image);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    ctx.handleFilterOption("All");
  };

  const ownMarker = marker.own !== undefined ? marker.own : false;
  return (
    <div className="card my-2 mx-2 " style={{ width: "95%" }}>
      <div className="d-flex mx-2 my-2 justify-content-center">
        {!ownMarker && marker.pictures.length > 0 && (
          <Carousel variant="dark" style={{ width: "200px" }}>
            {marker.pictures.map((image, i) => {
              return (
                <Carousel.Item
                  key={i}
                  onClick={() => {
                    handleImageModal(image.downloadUrl);
                  }}
                >
                  <img
                    src={image.downloadUrl}
                    alt={`Slide ${i}`}
                    style={{ height: "200px", width: "200px" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
        {show && image !== null && image !== undefined && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{t("MarkerCard.imageModalTitle")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-center">
                <img src={image} alt="Image modal" style={{ width: "100%" }} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                {t("MarkerCard.imageModalClose")}
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <div className="card-body">
        {ownMarker && (
          <h1 className="card-title" style={{ color: "#000" }}>
            {t("LocateMarkers.here")}
          </h1>
        )}
        {!ownMarker && (
          <h1 className="card-title" style={{ color: "#000" }}>
            {marker.title}
          </h1>
        )}

        {marker.description !== "" && (
          <p className="card-text" style={{ marginBottom: 0 }}>
            {marker.description}
          </p>
        )}
        {marker.id !== "" && marker.id !== undefined && (
          <div className="mt-2 ratings" aria-label="star">
            {t("MarkerCard.rating")} {stars}
          </div>
        )}
      </div>
      {marker.category !== "" && marker.category !== undefined && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{marker.category}</li>
        </ul>
      )}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {t("MarkerCard.lat")} {marker.coords.lat}
        </li>
        <li className="list-group-item">
          {t("MarkerCard.long")} {marker.coords.lng}
        </li>
        {!ownMarker && (
          <li className="list-group-item">
            <div className="my-2">
              <label className="form-label" htmlFor="customFile">
                {t("MarkerCard.uploadImage")}
              </label>

              <div className="d-flex align-items-center">
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  onChange={handleChange}
                  style={{ marginBottom: 0 }}
                  accept="image/*"
                  multiple
                />

                <Button
                  variant="primary"
                  className="mx-2"
                  onClick={submitFile}
                  aria-label="uploadFirebase"
                >
                  {t("MarkerCard.upload")}
                </Button>
              </div>
            </div>
          </li>
        )}
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
                data-testid="commentTextArea"
              ></textarea>
            </div>

            <div className={styles.commentButton}>
              <button
                type="submit"
                className={styles.button}
                disabled={!commentIsValid}
                data-testid="commentSubmit"
              >
                {t("MarkerCard.comment")}
              </button>
            </div>
          </form>
          {canScore && canScore2 && (
            <form onSubmit={formAddScoreHandler} className={styles.scoreGroup}>
              <div
                className={styles.rating}
                id="stars"
                onChange={scoreChangeHandler}
                value={enteredScore}
              >
                {starsIds.map((starId, i) => {
                  const id = randomId();
                  return (
                    <>
                      <input
                        type="radio"
                        name="rating"
                        id={id}
                        value={starId.charAt(4)}
                        key={i}
                      />
                      <label htmlFor={id} key={randomId}>
                        ☆
                      </label>
                    </>
                  );
                })}
              </div>

              <div className={styles.commentButton}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={!scoreIsValid}
                >
                  {t("MarkerCard.score")}
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {marker.comments !== undefined && marker.comments.length !== 0 && (
        <div className="card-body">
          <h5 className="card-title">{t("MarkerCard.inComm.title")}</h5>
          {marker.comments.map((comment, i) => {
            return (
              <div key={i} className="card mb-2">
                <div className="mx-2 my-2">
                  <p className="card-title" style={{ fontSize: "1.15rem" }}>
                    {comment.comment}
                  </p>
                  <p className="card-text" style={{ fontSize: "0.7rem" }}>
                    {t("MarkerCard.inComm.by")}{" "}
                    {comment.author
                      .replace("https://", "")
                      .replace(".inrupt.net/profile/card#me", "")}{" "}
                    {t("MarkerCard.inComm.on")}{" "}
                    {new Date(comment.date).toDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {canDelete && !ownMarker && marker.isOwnMarker && (
        <>
          <button
            className="btn btn-danger btn-sm mt-2"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            style={{
              minWidth: "40px",
              minHeight: "40px",
              borderRadius: "7px",
            }}
            onClick={() => {
              handleDeleteMarker();
            }}
          >
            <i className="fa fa-trash" style={{ fontSize: "20px" }}></i>
          </button>{" "}
        </>
      )}
    </div>
  );
};

export default MarkerCard;
