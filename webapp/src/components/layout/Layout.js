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
    <React.Fragment>
      <MainNavigation
        isLoggedIn={isLoggedIn}
        themeHandler={handleStyle}
        isChecked={isChecked}
        themeStyle={style}
      />
      <main className={styles.main}>
        <Outlet />
        {/* <Footer themeStyle={style} /> */}
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Layout;
