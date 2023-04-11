import React, { useState, useEffect } from "react";

import { LoginButton, LogoutButton } from "@inrupt/solid-ui-react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

import {
  handleIncomingRedirect,
  onSessionRestore,
} from "@inrupt/solid-client-authn-browser";

// This component is used to login to inrupt provider via button
const LogInButton = ({ isLoggedIn }) => {
  const [idp, setIdp] = useState("https://inrupt.net");
  // const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000/");

  useEffect(() => {
    // window.localStorage.setItem("currentUrl", window.location.href);
    console.log("LogInButton.js: ", currentUrl);
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const[t, i18n] = useTranslation("translation");

  return (
    <>
      {!isLoggedIn ? (
        // <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
        <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
          <Button variant="primary" className="mx-4">
            {t("LoginButton.in")}
          </Button>
        </LoginButton>
      ) : (
        <LogoutButton>
          <Button variant="danger" className="mx-4">
          {t("LoginButton.out")}
          </Button>
        </LogoutButton>
      )}
    </>
  );
};

export default LogInButton;
