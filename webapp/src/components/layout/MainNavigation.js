import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";
import LogInButton from "../LogInButton";

import logo from "../../images/LoMap_logo.png";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.header_logo_image}>
            <img
              className={styles.header_img}
              src={logo}
              alt="LoMap Logo Image"
            ></img>
          </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/home" className={styles.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={styles.active}>
              About
            </NavLink>
          </li>
          <li>
            <LogInButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
