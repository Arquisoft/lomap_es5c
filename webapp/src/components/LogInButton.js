import React, { useState, useEffect } from "react";

import { LoginButton, LogoutButton } from "@inrupt/solid-ui-react";
import { Button, FormGroup, Container } from "@material-ui/core";
import styles from "./LogInButton.module.css";

// This component is used to login to inrupt provider via button
const LogInButton = ({ isLoggedIn }) => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <Container fixed className={styles.containerButton}>
      <FormGroup className={styles.formgroup}>
        {!isLoggedIn ? (
          <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
            <Button
              variant="contained"
              color="primary"
              className={styles.loginButton}
            >
              Login
            </Button>
          </LoginButton>
        ) : (
          <LogoutButton>
            <Button
              variant="contained"
              color="primary"
              className={styles.loginButton}
            >
              Logout
            </Button>
          </LogoutButton>
        )}
      </FormGroup>
    </Container>
  );
};

export default LogInButton;
