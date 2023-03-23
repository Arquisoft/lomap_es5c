import React, { useState, useEffect } from "react";

import styles from "./NotLoggedText.module.css";

// This component is used when the user is not logged in
const NotLoggedText = () => {
  return (
    <div className={styles.notLoggedTextContainer}>
      <p>Not logged, please login!</p>
    </div>
  );
};

export default NotLoggedText;
