import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

import LogInButton from "../LogInButton";

// import logo from "../../images/LoMap_logo.png";
//import logo from "../../images/test.png";
import logo from "../../images/logo.png";

import esp from "../../images/esp.svg";
import uk from "../../images/uk.png";
import {useTranslation} from "react-i18next"


const MainNavigation = ({
  isLoggedIn,
  themeHandler,
  isChecked,
  themeStyle,
}) => {
  const[t, i18n] = useTranslation("translation");
  return (
    <>
      <Navbar
        expand="lg"
        bg={themeStyle}
        variant={themeStyle}
        className="h-100"
        collapseOnSelect
      >
        <Navbar.Brand href="/" className="mx-5">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-center"
          />{" "}
          LoMap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarExample01" />
        <Navbar.Collapse id="navbaxExample01" className="mx-5">
          <Nav className="text-center justify-content-end align-items-center flex-grow-1 me-auto my-2 my-lg-0 ">
            <Nav.Link href="/" className="mx-4">
              HOME
            </Nav.Link>
            <Nav.Link href="about" className="mx-4">
              ABOUT
            </Nav.Link>
            <LogInButton isLoggedIn={isLoggedIn} />
            <Form.Check
              className="mx-4"
              type="switch"
              id="custom-switch"
              onChange={themeHandler}
              checked={isChecked}
            />
            <button onClick={()=> i18n.changeLanguage("es")}><img src={esp} alt="Español" /></button>
            <button onClick={()=> i18n.changeLanguage("en")}><img src={uk} alt="English" /></button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <br /> */}
    </>
  );
};

export default MainNavigation;
