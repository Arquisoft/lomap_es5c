import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";
import LogInButton from "../LogInButton";
//import LogInButton from "react-bootstrap/Button";

// import logo from "../../images/LoMap_logo.png";
// import logo from "../../images/test.png";
import logo from "../../images/logo.png";

const MainNavigation = ({ isLoggedIn }) => {
  return (
    <div className={styles.header_container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.header_logo_image}>
            <img
              className={styles.header_img}
              src={logo}
              alt="LoMap Logo Image"
            ></img>
          </div>
          <p>LoMap</p>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="/" className={styles.active}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={styles.active}>
                About
              </NavLink>
            </li>
            <li>
              <LogInButton isLoggedIn={isLoggedIn} />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainNavigation;
