import React, { useContext, useDebugValue, useEffect } from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import backgroundImage from "../../images/wallpaper.jpg";

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
				// height: "100%",
				// maxHeight: "100%",
				// minHeight: "100vh",
				height: "100vh",
				backgroundColor: backgroundStyle.backgroundColor,
			}}
		>
			<div
			// className={style.header}
			// style={{ height: "11%", minHeight: 50 }}
			>
				<MainNavigation
					isLoggedIn={isLoggedIn}
					themeHandler={handleStyle}
					isChecked={isChecked}
					themeStyle={style}
				/>
			</div>
			{/* <main className={styles.main}> */}
			<div
				className={styles.background}
				style={{
					maxHeight: "90vh",
					minHeight: "90vh",
					height: "max-content",
					backgroundColor: backgroundStyle.backgroundColor,

					// 	backgroundImage: `url(${backgroundImage})`,
					// 	backgroundSize: "cover",
					// 	backgroundPosition: "center",
				}}
			>
				<Outlet />
			</div>
			{/* <Footer themeStyle={style} /> */}
			{/* </main> */}
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
