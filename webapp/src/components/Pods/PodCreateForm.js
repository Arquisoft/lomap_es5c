import React, { useEffect, useState } from "react";

import styles from "./PodCreateForm.module.css";

import useInput from "../../hooks/use-input";
import { insertNewMarker } from "../Pods/PodsFunctions";
import { useSession } from "@inrupt/solid-ui-react";
import {useTranslation} from "react-i18next"

const PodCreateForm = ({ coords, saveData, close }) => {

  const[t, i18n] = useTranslation("translation");

  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId
  //Url of the places that user has on his pod
  const podUrl = webId.replace(
    "/profile/card#me",
    "/justforfriends/locations.json"
  );
  // true until is there a problem creating a point
  const [correctPointCreation, setCorrectPointCreation] = useState(true);

  async function insertThing(coords, name, description, category) {
    {
      var result = insertNewMarker(
        coords,
        name,
        description,
        podUrl,
        session,
        webId,
        category //WE HAVE TO ADD THIS
      );
      // setInitial(!result);
      // if (result) setMarkers((prevValue) => [...prevValue, actualMarker]);
      return result;
    }
  }

  // useInput for each input
  const {
    value: enteredTitle,
    isValid: validTitle,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: validDescription,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCategory,
    isValid: validCategory,
    hasError: categoryInputHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategoryInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: validEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  // Check for global validity of the form
  let formIsValid = false;

  if (validTitle && validDescription) {
    formIsValid = true;
  }

  // Check validity for every input (css)
  const titleInputClasses = titleInputHasError
    ? "form-control invalid"
    : "form-control";

  const descriptionInputClasses = descriptionInputHasError
    ? "form-control invalid"
    : "form-control";

  const categoryInputClasses = categoryInputHasError
    ? "form-control invalid"
    : "form-control";

  // Form submission handler
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    //Check validity and log in case of error
    if (!validTitle) {
      console.log("Title is invalid");
      return;
    }

    if (!validDescription) {
      console.log("Description is invalid");
      return;
    }

    // console.log(coords);

    // We should save the data to pod in here
    insertThing(coords, enteredTitle, enteredDescription, enteredCategory).then(
      succes,
      failure
    );
  };

  function succes(resultado) {
    console.log("TODO BIEN: " + resultado);
    setCorrectPointCreation(true);
    // TODO: maybe update the whole list of markers and not just the one that we have created
    
    // Reset input fields
    resetTitleInput();
    resetDescriptionInput();
    resetCategoryInput();
  }

  function failure(error) {
    console.log(error);
    setCorrectPointCreation(false);
    //setShowForm(true);
  }

  useEffect(() => {
    resetTitleInput();
    resetDescriptionInput();
    resetCategoryInput();
    setCorrectPointCreation(true);
  }, [coords]);

  useEffect(() => {
    console.log(coords);
  }, []);

  const closeForm = () => {
    close("userPods");
  };

  return (
    <React.Fragment>
      {/* <div className={styles.mainContainer}> */}
      <div className={styles.infoContainer}>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            style={{ fontSize: "1rem" }}
            aria-label="Close"
            onClick={closeForm}
          ></button>
        </div>
        <h4 className={styles.header}>{t("PodCreateForm.create")}</h4>
        <form onSubmit={formSubmissionHandler}>
          <div className="control-group">
            <div className={titleInputClasses}>
              <label htmlFor="title">{t("PodCreateForm.title")}</label>
              <input
                type="text"
                id="title"
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
                value={enteredTitle}
              />
              {titleInputHasError && (
                <p className="error-text">{t("PodCreateForm.error-title")}</p>
              )}
            </div>

            <div className={descriptionInputClasses}>
              <label htmlFor="description">{t("PodCreateForm.description")}</label>
              <textarea
                type="text"
                name="description"
                id="description"
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
                value={enteredDescription}
                maxLength="150"
              ></textarea>
              {descriptionInputHasError && (
                <p className="error-text">{t("PodCreateForm.error-descrp")}</p>
              )}
            </div>

            <div className={categoryInputClasses}>
              <label htmlFor="category">{t("PodCreateForm.category.title")}</label>
              <select
                type="combo"
                name="category"
                id="category"
                className={styles.categoryContainer}
                onChange={categoryChangeHandler}
                onBlur={categoryBlurHandler}
                value={enteredCategory}
                required
              >
                <option value=""> </option>

                <option value="landscape">{t("PodCreateForm.category.landscape")}</option>
                <option value="monument">{t("PodCreateForm.category.monument")}</option>
                <option value="shop">{t("PodCreateForm.category.shop")}</option>
                <option value="bar">{t("PodCreateForm.category.bar")}</option>
                <option value="other">{t("PodCreateForm.category.other")}</option>
              </select>
            </div>
          </div>

          <div className={styles.submit}>
            <button
              type="submit"
              className={styles.button}
              disabled={!formIsValid}
            >
              {t("PodCreateForm.submit")}
            </button>
            {!correctPointCreation && (
              <p className={styles.error}>{t("PodCreateForm.error-submit")}</p>
            )}
          </div>
        </form>
      </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default PodCreateForm;
