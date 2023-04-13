import React from "react";
import { Button } from "react-bootstrap";

import { useTranslation } from "react-i18next";

const OptionsMenu = ({ changeOption }) => {
	const handleOptionChange = (option) => {
		changeOption(option);
	};

	const [t, i18n] = useTranslation("translation");

	return (
		<div className="card mx-2 my-2">
			<div className="container">
				<div className="row">
					<div
						className="d-flex col-sm align-items-center justify-content-center"
						style={{ textAlign: "center" }}
					>
						<Button
							className="btn my-2"
							onClick={() => handleOptionChange("userPods")}
						>
							{t("OptionsMenu.markers")}
						</Button>
					</div>
					<div
						className="d-flex col-sm align-items-center justify-content-center"
						style={{ textAlign: "center" }}
					>
						<Button
							className="btn my-2"
							onClick={() => handleOptionChange("read")}
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
							className="btn my-2"
							onClick={() => handleOptionChange("filter")}
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
