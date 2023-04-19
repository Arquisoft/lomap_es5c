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
import Form from 'react-bootstrap/Form';


// This component is used to login to inrupt provider via button
const LogInButton = ({ isLoggedIn }) => {

  //const [idp, setIdp] = useState("https://inrupt.net");
  //const [idp, setIdp] = useState("https://solidcommunity.net/");
  // const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000/");

  //const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('https://inrupt.net/');

  const [radios, setRadios] = useState([
    
    { name: 'inrupt', value: 'https://inrupt.net/' },
    { name: 'solidcommunity', value: 'https://solidcommunity.net/' },
    //{ name: 'auth.inrupt', value: 'https://auth.inrupt.com/' },
    { name: 'solidweb', value: 'https://solidweb.org/' },
    
  ])

  useEffect(() => {
    // window.localStorage.setItem("currentUrl", window.location.href);
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const[t, i18n] = useTranslation("translation");

  const [texto, setTexto] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    let newProvider = {name: texto, value: texto}
    setRadios([...radios, newProvider])

    console.log(radios.length)
    console.log(radios[radios.length-1])

    // Aquí podrías enviar el texto a algún servidor o hacer algo con él
  }

  const handleChange = (event) => {
    setTexto(event.target.value);
    event.target.value = "";
  }
  return (
    <>
    
      {!isLoggedIn ? (
        <>
        {<DropdownButton id="dropdown-button" title="Log In" style={{paddingRight: "1.2rem"}}>
            {radios.map( (radio, idx) => (
              <Dropdown.Item 
              key={idx}
              id={'drop-item-${idx}'}>
                <LoginButton oidcIssuer={radio.value} redirectUrl={currentUrl}>
                  {radio.value}
                </LoginButton>
              </Dropdown.Item>
          )) }
          <div className="dropdown-divider"></div>
          <Form className="d-flex flex-column" style={{padding: "0.5rem"}} onSubmit={handleSubmit}>
            <Form.Control  id="form-control" type="text" placeholder="Other" value={texto} onChange={handleChange} />
            <Button  variant="primary" type="submit">Add new provider</Button>
          </Form>
        </DropdownButton>}


        {/*
        <ButtonGroup style={{padding: "0.3rem"}}>
        {radios.map((radio, idx) => (
          <ToggleButton
            style={{fontSize:"0.8rem"}}
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
        </ButtonGroup> */}

      {/*<LoginButton oidcIssuer={radioValue} redirectUrl={currentUrl}>
          <Button variant="primary" className="mx-4" style={{fontSize:"0.8rem"}}>
            {t("LoginButton.in")}
          </Button>
        </LoginButton>
      */}
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
