import React, { useEffect, useState } from "react";
import useInput from "../../../hooks/use-input";

import {
	addComment,
	addReviewScore,
	listScoreOfAUser,
} from "../../Pods/PodsFunctions";
import { useSession } from "@inrupt/solid-ui-react";

import styles from "./MarkerCard.module.css";

import img from "../../../images/test.png";

import { useTranslation } from "react-i18next";

const MarkerCard = ({ marker }) => {
	const rating_color = {
		color: "#fbc634",
	};

  const { session } = useSession(); // Hook for providing access to the session in the component
  const webId = session.info;
  let webIdM;
  if(marker.id !== undefined)
    webIdM = marker.id.split("@")[0] // User's webId.
  else
    webIdM = webId


  const starsIds = ["star5", "star4", "star3", "star2", "star1"];

  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  let canScore = true;
  const [canScore2, setCanScore2] = useState(true)

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

	const [t, i18n] = useTranslation("translation");

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
    console.log(webIdM)
    addComment(webIdM, session, enteredComment, marker.id);
    resetCommentInput();
  };

  // Score form submission handler
  const formAddScoreHandler = (event) => {
    event.preventDefault();
    console.log("WEBIDM:"+ webIdM)
    addReviewScore(webIdM, session, enteredScore, marker.id);

    //Resets the radios selected value
    const radioButtons = document.getElementsByName("rating");
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].checked = false;
    }
    resetScoreInput();
    setCanScore2(false)
  };

  if (marker.score !== undefined) {
    let listScore = marker.score;
    let meanScore;
    let acc = 0;
    let ableToScore = true;

    for (var i = 0; i < listScore.length; i++) {
      acc += Number(listScore[i].score);
      if(listScore[i].author == webId.webId) {
        console.log("NO PUEDE SCORE")
        ableToScore = false;
      }
    }
    meanScore = acc / listScore.length;

    marker.rating = meanScore; // this should be obtained from the pod's rating
    console.log("llega asta el final")
    canScore = ableToScore
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

	const getLocalizatedOptionValue = (option) => {
		switch (option) {
			case "all":
				return "PodCreateForm.category.all";
			case "bar":
				return "PodCreateForm.category.bar";
			case "restaurant":
				return "PodCreateForm.category.restaurant";
			case "shop":
				return "PodCreateForm.category.shop";
			case "supermarket":
				return "PodCreateForm.category.supermarket";
			case "hotel":
				return "PodCreateForm.category.hotel";
			case "cinema":
				return "PodCreateForm.category.cinema";
			case "academicInstitution":
				return "PodCreateForm.category.academicInstitution";
			case "publicInstitution":
				return "PodCreateForm.category.publicInstitution";
			case "sportsClub":
				return "PodCreateForm.category.sportsClub";
			case "museum":
				return "PodCreateForm.category.museum";
			case "park":
				return "PodCreateForm.category.park";
			case "landscape":
				return "PodCreateForm.category.landscape";
			case "monument":
				return "PodCreateForm.category.monument";
			case "hospital":
				return "PodCreateForm.category.hospital";
			case "policeStation":
				return "PodCreateForm.category.policeStation";
			case "transportCenter":
				return "PodCreateForm.category.transportCenter";
			case "entertainment":
				return "PodCreateForm.category.entertainment";
			default:
				return "PodCreateForm.category.other";
		}
	};

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
          {canScore && canScore2 &&
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
                    <label htmlFor={id}>☆</label>
                  </>
                );
              })}
            </div>

            <div className={styles.commentButton}>
              <button
                type="submit"
                className={styles.button}
                disabled={!scoreIsValid }
              >
                {t("MarkerCard.score")}
              </button>
            </div>
          </form>
          }
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
    </div>
  );
};

export default MarkerCard;
