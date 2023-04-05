import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

import LogInButton from "../LogInButton";

// import logo from "../../images/LoMap_logo.png";
//import logo from "../../images/test.png";
import logo from "../../images/logo.png";

const MainNavigation = ({
  isLoggedIn,
  themeHandler,
  isChecked,
  themeStyle,
}) => {
  const classTheme =
    themeStyle === "dark" ? { color: "#f8f9fa" } : { color: "#212529" };

  const viewBoxStyle = themeStyle === "light" ? "0 0 25 25" : "0 0 18 18";

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
        <Navbar.Toggle aria-controls="navbarExample01" className="mx-3" />
        <Navbar.Collapse id="navbaxExample01" className="mx-5">
          <Nav className="text-center justify-content-end align-items-center flex-grow-1 me-auto my-2 my-lg-0 ">
            <Nav.Link href="/" className="mx-4">
              HOME
            </Nav.Link>
            <Nav.Link href="about" className="mx-4">
              ABOUT
            </Nav.Link>
            <LogInButton isLoggedIn={isLoggedIn} />
            <div className="d-flex my-2">
              <Form.Check
                className=""
                type="switch"
                id="custom-switch"
                onChange={themeHandler}
                checked={isChecked}
              />

              <label class="form-check-label mx-2" for="custom-switch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-brightness-high"
                  style={classTheme}
                  viewBox={viewBoxStyle}
                >
                  {themeStyle === "light" ? (
                    <path d="M8.23129 2.24048C9.24338 1.78695 10.1202 2.81145 9.80357 3.70098C8.72924 6.71928 9.38932 10.1474 11.6193 12.3765C13.8606 14.617 17.3114 15.2755 20.3395 14.1819C21.2206 13.8637 22.2173 14.7319 21.7817 15.7199C21.7688 15.7491 21.7558 15.7782 21.7427 15.8074C20.9674 17.5266 19.7272 19.1434 18.1227 20.2274C16.4125 21.3828 14.3957 22.0001 12.3316 22.0001H12.3306C9.93035 21.9975 7.6057 21.1603 5.75517 19.6321C3.90463 18.1039 2.64345 15.9797 2.18793 13.6237C1.73241 11.2677 2.11094 8.82672 3.2586 6.71917C4.34658 4.72121 6.17608 3.16858 8.20153 2.25386L8.23129 2.24048Z" />
                  ) : (
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  )}
                </svg>
              </label>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <br /> */}
    </>
  );
};

export default MainNavigation;
