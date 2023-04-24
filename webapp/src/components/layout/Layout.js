import React, { useContext, useEffect } from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";

import UserSessionContext from "../../store/session-context";

const Layout = ({ isLoggedIn }) => {
	const ctx = useContext(UserSessionContext);

	const [isChecked, setIsChecked] = React.useState(true);
	const [style, setStyle] = React.useState("dark");

	const handleStyle = () => {
		setIsChecked(!isChecked);
		setStyle(style === "dark" ? "light" : "dark");
		ctx.handleStyle(style === "dark" ? "light" : "dark");
		window.localStorage.setItem(
			"themeStyle",
			style === "dark" ? "light" : "dark"
		);
	};

	useEffect(() => {
		setStyle(ctx.pageStyle);
		setIsChecked(ctx.pageStyle === "dark" ? true : false);
	}, [ctx.pageStyle]);

	const backgroundStyle = {
		backgroundColor: style === "dark" ? "#212529" : "#f8f9fa",
	};

	return (
		<div
			style={{
				height: "100vh",
				backgroundColor: backgroundStyle.backgroundColor,
			}}
		>
			<div>
				<MainNavigation
					isLoggedIn={isLoggedIn}
					themeHandler={handleStyle}
					isChecked={isChecked}
					themeStyle={style}
				/>
			</div>
			<div
				className={styles.background}
				style={{
					minHeight: "90vh",
					height: "max-content",
					backgroundColor: backgroundStyle.backgroundColor,
				}}
			>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
