import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/LoMap_logo.png";
import LogInButton from "../LogInButton";
import { SessionProvider } from "@inrupt/solid-ui-react";

// This is the header of the application which contains the logo and the nav
const Header = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_logo}>
        <div className={styles.header_logo_image}>
          <img
            className={styles.header_img}
            src={logo}
            alt="LoMap Logo Image"
          ></img>
        </div>
        <span className={styles.header_logo_sub}>LoMap</span>
      </div>
      <div className={styles.header_main}>
        <ul className={styles.header_links}>
          <li className={styles.links_wrapper}>
            <a className={styles.header_link}>HOME</a>
          </li>
          <li className={styles.links_wrapper}>
            <a className={styles.header_link}>ABOUT</a>
          </li>
          <li className={styles.links_wrapper}>
            <a className={styles.header_link}>CONTACT</a>
          </li>
          {/* <li className={styles.links_wrapper_login}>
            <a className={styles.header_link_login}>LOGIN</a>
          </li> */}
          <li className={styles.links_wrapper_login}>
            <SessionProvider sessionId="log-in-example">
              <LogInButton />
            </SessionProvider>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
