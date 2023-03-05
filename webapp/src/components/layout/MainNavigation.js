import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";
import LogInButton from "../LogInButton";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>LoMap</div>
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
