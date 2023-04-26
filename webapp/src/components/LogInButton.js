import React, { useState, useEffect } from "react";

import { LoginButton, LogoutButton } from "@inrupt/solid-ui-react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

import Dropdown from "react-bootstrap/Dropdown";

import { DropdownButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// This component is used to login to inrupt provider via button
const LogInButton = ({ isLoggedIn }) => {
	const [currentUrl, setCurrentUrl] = useState("https://localhost:3000/");

	const [radios, setRadios] = useState([
		{ name: "inrupt", value: "https://inrupt.net/" },
		{ name: "solidcommunity", value: "https://solidcommunity.net/" },
		{ name: "solidweb", value: "https://solidweb.org/" },
	]);

	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, [setCurrentUrl]);

	const [t] = useTranslation("translation");

	const [texto, setTexto] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		let newProvider = { name: texto, value: texto };
		setRadios([...radios, newProvider]);
		// Aquí podrías enviar el texto a algún servidor o hacer algo con él
	};

	const handleChange = (event) => {
		setTexto(event.target.value);
		event.target.value = "";
	};
	return (
		<>
			{!isLoggedIn ? (
				<>
					{
						<DropdownButton
							id="dropdown-button"
							title={t("LoginButton.in")}
							style={{ paddingRight: "1.2rem" }}
						>
							{radios.map((radio, idx) => (
								<Dropdown.Item key={idx} id={"drop-item-${idx}"}>
									<LoginButton
										oidcIssuer={radio.value}
										redirectUrl={currentUrl}
									>
										{radio.value}
									</LoginButton>
								</Dropdown.Item>
							))}
							<div className="dropdown-divider"></div>
							<Form
								className="d-flex flex-column"
								style={{ padding: "0.5rem" }}
								onSubmit={handleSubmit}
							>
								<Form.Control
									id="form-control"
									type="text"
									placeholder={t("LoginButton.other")}
									value={texto}
									onChange={handleChange}
								/>
								<Button variant="primary" type="submit">
									{t("LoginButton.add")}
								</Button>
							</Form>
						</DropdownButton>
					}
				</>
			) : (
				<LogoutButton>
					<Button variant="danger" className="mx-4">
						{t("LoginButton.out")}
					</Button>
				</LogoutButton>
			)}
		</>
	);
};

export default LogInButton;
