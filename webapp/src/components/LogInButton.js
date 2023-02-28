import React, { useState, useEffect } from "react";

import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, FormGroup, Container } from "@material-ui/core";
import styles from "./LogInButton.module.css";

// This component is used to login to inrupt provider via button
const LogInButton = () => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <Container fixed className={styles.containerButton}>
      <FormGroup className={styles.formgroup}>
        <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
          <Button
            variant="contained"
            color="primary"
            className={styles.loginButton}
          >
            Login
          </Button>
        </LoginButton>
      </FormGroup>
    </Container>
  );
};

export default LogInButton;
