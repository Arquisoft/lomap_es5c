import React, { useEffect, useState } from "react";

import styles from "./PodCreateForm.module.css";

import useInput from "../../hooks/use-input";

const PodCreateForm = ({ coords, saveData}) => {
  const [showForm, setShowForm] = useState(true);

  // true until is there a problem creating a point
  const [correctPointCreation, setCorrectPointCreation] = useState(true);

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

    // We should save the data to pod in here
    saveData(coords, enteredTitle, enteredDescription).then(succes, failure);
  };

  function succes(resultado) {
    console.log("TODO BIEN: " + resultado);
    setCorrectPointCreation(true);
    setShowForm(false);

    // Reset input fields
    resetTitleInput();
    resetDescriptionInput();
  }
  
  function failure(error) {
    console.log(error);
    setCorrectPointCreation(false);
    //setShowForm(true);
  }

  useEffect(() => {
    resetTitleInput();
    resetDescriptionInput();
    setCorrectPointCreation(true);
  }, [coords]);

  return (
    <React.Fragment>
      {showForm && (
        <div className={styles.mainContainer}>
          <div className={styles.infoContainer}>
            <h4>Create location</h4>
            <form onSubmit={formSubmissionHandler}>
              <div className="control-group">
                <div className={titleInputClasses}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    onChange={titleChangeHandler}
                    onBlur={titleBlurHandler}
                    value={enteredTitle}
                  />
                  {titleInputHasError && (
                    <p className="error-text">Title not valid!</p>
                  )}
                </div>

                <div className={descriptionInputClasses}>
                  <label htmlFor="description">Description</label>
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
                    <p className="error-text">Description not valid!</p>
                  )}
                </div>
              </div>

              <div className={styles.submit}>
                <button type="submit" className={styles.button} disabled={!formIsValid}>
                  SUBMIT
                </button>
                {!correctPointCreation && (
                  <p className={styles.error}>Error in POD addition!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PodCreateForm;
