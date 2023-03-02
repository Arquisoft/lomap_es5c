import React from "react";

import styles from "./InfoCard.module.css";

const InfoCard = ({ position }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <p>{position}</p>
      </div>
    </div>
  );
};

export default InfoCard;
