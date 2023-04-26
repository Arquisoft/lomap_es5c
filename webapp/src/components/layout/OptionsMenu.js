import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import UserSessionContext from "../../store/session-context";

const OptionsMenu = ({ changeOption }) => {
	const ctx = useContext(UserSessionContext);

	const handleOptionChange = (option) => {
		changeOption(option);
	};

	const [t] = useTranslation("translation");

	return (
		<div className="card mx-2 my-2">
			<div className="container">
				<div className="row">
					<div
						className="d-flex col-sm align-items-center justify-content-center"
						style={{ textAlign: "center" }}
					>
						<Button
							id="userPods"
							className="btn my-2"
							onClick={() => handleOptionChange("userPods")}
							disabled={ctx.loaded ? false : true}
						>
							{t("OptionsMenu.markers")}
						</Button>
					</div>
					<div
						className="d-flex col-sm align-items-center justify-content-center"
						style={{ textAlign: "center" }}
					>
						<Button
							id="read"
							className="btn my-2"
							onClick={() => handleOptionChange("read")}
							disabled={ctx.loaded ? false : true}
						>
							{t("OptionsMenu.friendsMarkers")}
						</Button>
					</div>
					<div className="w-100"></div>
					<div
						className="d-flex col-sm align-items-center justify-content-center"
						style={{ textAlign: "center" }}
					>
						<Button
							id="friends"
							className="btn my-2"
							onClick={() => handleOptionChange("friends")}
						>
							{t("OptionsMenu.friends")}
						</Button>
					</div>
					<div
						className="d-flex col-sm align-items-center justify-content-center"
						style={{ textAlign: "center" }}
					>
						<Button
							id="filter"
							className="btn my-2"
							onClick={() => handleOptionChange("filter")}
							disabled={ctx.loaded ? false : true}
						>
							{t("OptionsMenu.filters")}
						</Button>
					</div>
				</div>
			</div>
			<div className=""></div>
		</div>
	);
};

export default OptionsMenu;
