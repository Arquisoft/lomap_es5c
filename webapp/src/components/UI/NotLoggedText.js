import React, { useContext } from "react";

import UserSessionContext from "../../store/session-context";
import { useTranslation } from "react-i18next";
import backgroundImage from "../../images/wallpaper.jpg";

// This component is used when the user is not logged in
const NotLoggedText = () => {
	const ctx = useContext(UserSessionContext);

	const [t] = useTranslation("translation");

	let styleText = ctx.pageStyle === "light" ? "#000" : "#fff";  //NOSONAR

	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{
				minHeight: "90vh",
				height: "max-content",
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<p
				className="text-center"
				style={{ fontSize: "2rem", fontWeight: 550, color: styleText }}
			>
				{t("NotLoggedText")}
			</p>
		</div>
	);
};

export default NotLoggedText;
