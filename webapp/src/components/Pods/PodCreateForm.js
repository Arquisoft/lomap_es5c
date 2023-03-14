import React, { useEffect } from "react";

import styles from "./PodCreateForm.module.css";

import useInput from "../../hooks/use-input";

const PodCreateForm = ({ coords }) => {
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

    console.log(enteredDescription, enteredTitle, coords.slice(-1));

    // Reset input fields
    resetTitleInput();
    resetDescriptionInput();
  };

  useEffect(() => {
    resetTitleInput();
    resetDescriptionInput();
  }, [coords]);

  return (
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

          <div className="form-actions">
            <button className={styles.button} disabled={!formIsValid}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PodCreateForm;
