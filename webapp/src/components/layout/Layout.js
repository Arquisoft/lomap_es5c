import React from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";

const Layout = ({ isLoggedIn }) => {
  return (
    <React.Fragment>
      <MainNavigation isLoggedIn={isLoggedIn} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default Layout;
