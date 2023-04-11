import React, { useEffect, useContext } from "react";

import UserCard from "./UserCard";

import styles from "./About.module.css";

import UserSessionContext from "../../store/session-context";
import {useTranslation} from "react-i18next";

const About = () => {
  const ctx = useContext(UserSessionContext);

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
    description: t("About.xin.description"),
    mail: "uo276967",
    githubLink: "https://github.com/iimxinn",
    twitterLink: "https://twitter.com/iimxinn",
    linkedinLink: "https://www.linkedin.com/in/chen-xin-pan-wang-4b5939233/",
  };

  const data = [jonathan, edu, laura, fer, xin];

  return (
    <React.Fragment>
      <div className="container-fluid py-2" style={{ height: "100%" }}>
        <h1 className={styles.h1}>{t("About.title")}</h1>
        <div
          className="d-flex flex-row flex-nowrap justify-self-center"
          style={{ overflowX: "auto", overflowY: "hidden", height: "100%" }}
        >
          {data.map((user, i) => (
            <div
              key={i}
              className="card card-body"
              style={{
                borderRadius: "15px",
                minHeight: "550px",
                maxHeight: "550px",
                minWidth: "350px",
                maxWidth: "350px",
                boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.1)",
                marginRight: "10px",
              }}
            >
              <div className="card-body text-center">
                <div className="mt-3 mb-4">
                  <img
                    src={require(`../../images/${user.alt}.png`)}
                    alt={user.alt}
                    className="rounded-circle img-fluid"
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <div style={{ minHeight: "225px", maxHeight: "300px" }}>
                  <h4 className="mb-2">{user.username}</h4>
                  <p className="text-muted mb-0">{user.userTitle}</p>
                  <p className="text-muted mb-0">{user.description}</p>
                  <p className="text-muted">{user.mail}</p>
                </div>
                <div className="mb-4 pb-2">
                  <a href={user.githubLink}>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-floating"
                    >
                      <i className="fab fa-github fa-lg"></i>
                    </button>
                  </a>
                  <a href={user.linkedinLink}>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-floating mx-2"
                    >
                      <i className="fab fa-linkedin-in fa-lg"></i>
                    </button>
                  </a>
                  <a href={user.twitterLink}>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-floating"
                    >
                      <i className="fab fa-twitter fa-lg"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>

    // <div classNameName={styles.main_container}>
    //   <h1 className={styles.h1}>LoMap team ⭐️</h1>
    //   <div className={styles.info_container}>
    //     {data.map((component, i) => (
    //       <UserCard key={i} user={component}></UserCard>
    //     ))}
    //   </div>
    // </div>
  );
};

export default About;
