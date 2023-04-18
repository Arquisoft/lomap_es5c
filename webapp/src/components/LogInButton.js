import React, { useState, useEffect } from "react";

import { LoginButton, LogoutButton } from "@inrupt/solid-ui-react";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

import {
  handleIncomingRedirect,
  onSessionRestore,
} from "@inrupt/solid-client-authn-browser";
import { DropdownButton } from "react-bootstrap";


// This component is used to login to inrupt provider via button
const LogInButton = ({ isLoggedIn }) => {

  //const [idp, setIdp] = useState("https://inrupt.net");
  const [idp, setIdp] = useState("https://solidcommunity.net/");
  // const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000/");

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('https://inrupt.net/');

  const radios = [
    { name: 'inrupt.net', value: 'https://inrupt.net/' },
    { name: 'solidcommunity.net', value: 'https://solidcommunity.net/' },
    { name: 'auth.inrupt.com', value: 'https://auth.inrupt.com/login?response_type=code&client_id=291nuca1atm91cstojs8ndsbkh&scope=openid+openid+profile&redirect_uri=https%3A%2F%2Flogin.inrupt.com%2Fcallback&state=fab89d25-6d8c-41f1-b496-e3a398fe37d3' },
    { name: 'solidweb.org', value: 'https://solidweb.org/' },
  ];

  useEffect(() => {
    // window.localStorage.setItem("currentUrl", window.location.href);
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const[t, i18n] = useTranslation("translation");

  return (
    <>
      {!isLoggedIn ? (
        <>
        <DropdownButton
            title="Log In"
          >
            {radios.map( (radio, idx) => {
              <Dropdown.Item key={idx} id={'drop-${idx}'}>
                <LoginButton oidcIssuer={radio.value} redirectUrl={currentUrl}>
                  <Button variant="primary" className="mx-4">
                   {t("LoginButton.out")}
                  </Button>
                </LoginButton>
              </Dropdown.Item>
          }) }
          </DropdownButton>


        <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <LoginButton oidcIssuer={radioValue} redirectUrl={currentUrl}>
          <Button variant="primary" className="mx-4">
            {t("LoginButton.in")}
          </Button>
        </LoginButton>
         
      </>
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
