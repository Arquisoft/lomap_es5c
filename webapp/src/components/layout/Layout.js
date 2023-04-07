import React, { useContext } from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import UserSessionContext from "../../store/session-context";

const Layout = ({ isLoggedIn }) => {
  const ctx = useContext(UserSessionContext);

  const [isChecked, setIsChecked] = React.useState(true);
  const [style, setStyle] = React.useState("dark");

  const handleStyle = () => {
    console.log("handleStyle");
    setIsChecked(!isChecked);
    setStyle(style === "dark" ? "light" : "dark");
    ctx.handleStyle(style === "dark" ? "light" : "dark");
  };

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
      <div style={{ height: "91%", backgroundStyle }}>
        <Outlet />
      </div>
      {/* <Footer themeStyle={style} /> */}
      {/* </main> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
