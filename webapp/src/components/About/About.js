import React, { useContext } from "react";

import styles from "./About.module.css";

import UserSessionContext from "../../store/session-context";

import { useTranslation } from "react-i18next";

const About = () => {
  const ctx = useContext(UserSessionContext);

  const [t] = useTranslation("translation");

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

  const data = [jonathan, edu, fer, xin];

  let headerStyle = ctx.pageStyle === "light" ? "#000" : "#fff";
  console.log("bck", ctx.pageStyle);

  return (
    <React.Fragment>
      <div className="container-fluid py-2">
        <h1 style={{ textAlign: "center", color: headerStyle }}>
          {t("About.title")}
        </h1>
        <div className="d-flex justify-content-center">
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-github"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        {/* <i className="fab fa-github fa-lg"></i> */}
                      </button>
                    </a>
                    <a href={user.linkedinLink}>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-floating mx-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-linkedin"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                        {/* <i className="fab fa-linkedin-in fa-lg"></i> */}
                      </button>
                    </a>
                    <a href={user.twitterLink}>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-floating"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-twitter"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                        {/* <i className="fab fa-twitter fa-lg"></i> */}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
