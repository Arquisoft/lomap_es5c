import React from "react";

import styles from "./NotLoggedText.module.css";

// This component is used when the user is not logged in
const NotLoggedText = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>NOT LOGGED IN, PLEASE LOGIN!</p>
    </div>
  );
};

export default NotLoggedText;
