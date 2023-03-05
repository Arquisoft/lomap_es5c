import React from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main className={styles.main}>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default Layout;
