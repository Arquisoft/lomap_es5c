import React from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = ({ isLoggedIn }) => {
  const [isChecked, setIsChecked] = React.useState(true);
  const [style, setStyle] = React.useState("dark");

  const handleStyle = () => {
    console.log("handleStyle");
    setIsChecked(!isChecked);
    setStyle(style === "dark" ? "light" : "dark");
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className={style.header}
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
      <div style={{ height: "89%" }}>
        <Outlet />
      </div>
      {/* <Footer themeStyle={style} /> */}
      {/* </main> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
