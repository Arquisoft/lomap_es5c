import React, { useEffect, useState, useContext } from "react";

import styles from "./PodCreateForm.module.css";

import useInput from "../../hooks/use-input";
import { insertNewMarker } from "../../podsFunctions/PodsFunctions";
import { useSession } from "@inrupt/solid-ui-react";
import { useTranslation } from "react-i18next";

import UserSessionContext from "../../store/session-context";

const PodCreateForm = ({ coords, prevOption, close, needsUpdate }) => {
	const ctx = useContext(UserSessionContext);
	const [t] = useTranslation("translation");

	const { session } = useSession(); // Hook for providing access to the session in the component
	const { webId } = session.info; // User's webId

	const [submited, setSubmited] = useState(false);

	//Url of the places that user has on his pod
	const podUrl = webId.replace("/profile/card#me", "/lomap/locations.json");
	// true until is there a problem creating a point
	const [correctPointCreation, setCorrectPointCreation] = useState(true);

	async function insertThing(coords, name, description, category) {
		var result = insertNewMarker(
			coords,
			name,
			description,
			podUrl,
			session,
			webId,
			category
		);
		return result;
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
		setSubmited(true);
		//Check validity and log in case of error
		if (!validTitle) {
			return;
		}

		if (!validDescription) {
			return;
		}

		// We should save the data to pod in here
		insertThing(coords, enteredTitle, enteredDescription, enteredCategory).then(
			succes,
			failure
		);
	};

	function succes(resultado) {
		setCorrectPointCreation(true);
		// TODO: maybe update the whole list of markers and not just the one that we have created

		// Reset input fields
		resetTitleInput();
		resetDescriptionInput();
		resetCategoryInput();

		//We reload the map
		ctx.handleCreateMarker(false);
		needsUpdate(true);
	}

	function failure(error) {
		setCorrectPointCreation(false);
		//setShowForm(true);
	}

	useEffect(() => {
		resetTitleInput();
		resetDescriptionInput();
		resetCategoryInput();
		setCorrectPointCreation(true);
	}, [coords]);

	const closeForm = () => {
		close(prevOption);
	};

	return (
		<React.Fragment>
			<div
				className="d-flex justify-content-center  mx-2"
				style={{ width: "95%", backgroundColor: "white", borderRadius: "10px" }}
			>
				<div
					className="mx-2 my-2"
					style={{ overflow: "auto", textAlign: "center" }}
				>
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
								<label htmlFor="description">
									{t("PodCreateForm.description")}
								</label>
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
									<p className="error-text">
										{t("PodCreateForm.error-descrp")}
									</p>
								)}
							</div>

							<div className={categoryInputClasses}>
								<label htmlFor="category">
									{t("PodCreateForm.category.title")}
								</label>
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
									<option value="other">
										{t("PodCreateForm.category.other")}
									</option>
									<option value="bar">{t("PodCreateForm.category.bar")}</option>
									<option value="restaurant">
										{t("PodCreateForm.category.restaurant")}
									</option>
									<option value="shop">
										{t("PodCreateForm.category.shop")}
									</option>
									<option value="supermarket">
										{t("PodCreateForm.category.supermarket")}
									</option>
									<option value="hotel">
										{t("PodCreateForm.category.hotel")}
									</option>
									<option value="cinema">
										{t("PodCreateForm.category.cinema")}
									</option>
									<option value="academicInstitution">
										{t("PodCreateForm.category.academicInstitution")}
									</option>
									<option value="publicInstitution">
										{t("PodCreateForm.category.publicInstitution")}
									</option>
									<option value="sportsClub">
										{t("PodCreateForm.category.sportsClub")}
									</option>
									<option value="museum">
										{t("PodCreateForm.category.museum")}
									</option>
									<option value="park">
										{t("PodCreateForm.category.park")}
									</option>
									<option value="landscape">
										{t("PodCreateForm.category.landscape")}
									</option>
									<option value="monument">
										{t("PodCreateForm.category.monument")}
									</option>
									<option value="hospital">
										{t("PodCreateForm.category.hospital")}
									</option>
									<option value="policeStation">
										{t("PodCreateForm.category.policeStation")}
									</option>
									<option value="transportCenter">
										{t("PodCreateForm.category.transportCenter")}
									</option>
									<option value="entertainment">
										{t("PodCreateForm.category.entertainment")}
									</option>
								</select>
							</div>
						</div>
						<div className="mb-2">
							<div className={styles.submit}>
								<button
									type="submit"
									className={styles.button}
									disabled={!formIsValid || submited}
								>
									{t("PodCreateForm.submit")}
								</button>
								{!correctPointCreation && (
									<p className={styles.error}>
										{t("PodCreateForm.error-submit")}
									</p>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
};

export default PodCreateForm;
