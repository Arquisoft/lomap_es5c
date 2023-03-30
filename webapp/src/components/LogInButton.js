import React, { useState, useEffect } from "react";

import { LoginButton, LogoutButton } from "@inrupt/solid-ui-react";
import Button from "react-bootstrap/Button";

import {
  handleIncomingRedirect,
  onSessionRestore,
} from "@inrupt/solid-client-authn-browser";

// This component is used to login to inrupt provider via button
const LogInButton = ({ isLoggedIn }) => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
    console.log("LogInButton.js: ", currentUrl);
  }, [setCurrentUrl]);

  return (
    <>
      {!isLoggedIn ? (
        <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
          <Button variant="primary" className="mx-4">
            LOGIN
          </Button>
        </LoginButton>
      ) : (
        <LogoutButton>
          <Button variant="danger" className="mx-4">
            LOGOUT
          </Button>
        </LogoutButton>
      )}
    </>
  );
};

export default LogInButton;
