import React from "react";

import UserCard from "./UserCard";

import styles from "./About.module.css";

import {useTranslation} from "react-i18next"



const About = () => {
  const[t, i18n] = useTranslation("translation");
  // Here we create all developers
  const jonathan = {
    alt: "jonathan",
    width: "10%",
    username: "Jonathan Arias Busto",
    userTitle: t("About.jonathan.userTitle"),
    description: t("About.jonathan.description"),
    mail: "uo283586",
    githubLink: "https://github.com/JonathanAriass",
    twitterLink: "https://twitter.com/_jonyy_",
    linkedinLink: "https://www.linkedin.com/in/jonathan-arias-busto-874a5b241/",
  };

  const edu = {
    alt: "edu",
    width: "10%",
    username: "Eduardo Blanco Bielsa",
    userTitle: t("About.edu.userTitle"),
    description: t("About.edu.description"),
    mail: "uo285176",
    githubLink: "https://github.com/gitblanc",
    twitterLink: "https://twitter.com/gitblanc",
    linkedinLink:
      "https://www.linkedin.com/in/eduardo-blanco-bielsa-408908233/",
  };

  const laura = {
    alt: "laura",
    width: "10%",
    username: "Laura Cordero Castrillo",
    userTitle: t("About.laura.userTitle"),
    description: t("About.laura.description"),
    mail: "uo275955",
    githubLink: "https://github.com/lauracc97",
    twitterLink: {},
    linkedinLink: {},
  };

  const fer = {
    alt: "fer",
    width: "10%",
    username: "Fernando José González Sierra",
    userTitle: t("About.fer.userTitle"),
    description: t("About.fer.description"),
    mail: "uo277938",
    githubLink: "https://github.com/UO277938",
    twitterLink: "https://twitter.com/FerJ0ta",
    linkedinLink: "https://www.linkedin.com/in/fer-glez-869844236/",
  };

  const xin = {
    alt: "xin",
    width: "10%",
    username: "Chen Xin Pan Wang",
    userTitle: t("About.xin.userTitle"),
    description: t("About.jonathan.description"),
    mail: "uo276967",
    githubLink: "https://github.com/iimxinn",
    twitterLink: "https://twitter.com/iimxinn",
    linkedinLink: "https://www.linkedin.com/in/chen-xin-pan-wang-4b5939233/",
  };

  const data = [jonathan, edu, laura, fer, xin];

  return (
    <div className={styles.main_container}>
      <h1 className={styles.h1}>LoMap team ⭐️</h1>
      <div className={styles.info_container}>
        {data.map((component, i) => (
          <UserCard key={i} user={component}></UserCard>
        ))}
      </div>
    </div>
  );
};

export default About;
