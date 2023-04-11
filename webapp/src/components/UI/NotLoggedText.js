import React, { useState, useEffect } from "react";

import styles from "./NotLoggedText.module.css";
import {useTranslation} from "react-i18next";

// This component is used when the user is not logged in
const NotLoggedText = () => {
  const[t, i18n] = useTranslation("translation");
  return (
    <div className={styles.notLoggedTextContainer}>
      <p>{t("NotLoggedText")}</p>

      {/* <div className={styles.waviy}>
        <span style={{ "--i": 1 }}>N</span>
        <span style={{ "--i": 2 }}>o</span>
        <span style={{ "--i": 3 }}>t</span>
        <span style={{ "--i": 4 }}> </span>
        <span style={{ "--i": 5 }}>l</span>
        <span style={{ "--i": 6 }}>o</span>
        <span style={{ "--i": 7 }}>g</span>
        <span style={{ "--i": 8 }}>g</span>
        <span style={{ "--i": 9 }}>e</span>
        <span style={{ "--i": 10 }}>d</span>
        <span style={{ "--i": 11 }}>,</span>
        <span style={{ "--i": 12 }}> </span>
        <span style={{ "--i": 13 }}>p</span>

        <span style={{ "--i": 14 }}>l</span>
        <span style={{ "--i": 15 }}>e</span>
        <span style={{ "--i": 16 }}>a</span>
        <span style={{ "--i": 17 }}>s</span>
        <span style={{ "--i": 18 }}>e</span>
        <span style={{ "--i": 19 }}> </span>
        <span style={{ "--i": 20 }}>l</span>
        <span style={{ "--i": 21 }}>o</span>
        <span style={{ "--i": 22 }}>g</span>
        <span style={{ "--i": 23 }}>i</span>
        <span style={{ "--i": 24 }}>n</span>
        <span style={{ "--i": 25 }}>!</span>
      </div> */}
      {/* <h1 className={styles.header}>
        <span>Not logged, please login!</span>
        <div className={styles.message}>
          <div className={styles.word1}> login!</div>
        </div>
      </h1> */}
    </div>
  );
};

export default NotLoggedText;
