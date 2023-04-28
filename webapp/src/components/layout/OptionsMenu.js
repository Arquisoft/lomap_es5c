import React, { useContext, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import UserSessionContext from "../../store/session-context";

const OptionsMenu = ({ changeOption }) => {
  const ctx = useContext(UserSessionContext);

  const handleOptionChange = (option) => {
    changeOption(option);
  };

  const [t] = useTranslation("translation");

  const [open, setOpen] = React.useState(false);

  return (
    <div className="card mx-2 my-2">
      <Button
        className="mx-2 my-2"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        MENU
      </Button>
      <Collapse in={open}>
        <div className="card-body">
          <div className="row">
            <div
              className="d-flex col-sm align-items-center justify-content-center"
              style={{ textAlign: "center" }}
            >
              <Button
                id="userPods"
                data-testid="userPods"
                className="btn my-2"
                onClick={() => {
                  handleOptionChange("userPods");
                  setOpen(false);
                }}
                disabled={ctx.loaded ? false : true}
              >
                {t("OptionsMenu.markers")}
              </Button>
            </div>
            <div
              className="d-flex col-sm align-items-center justify-content-center"
              style={{ textAlign: "center" }}
            >
              <Button
                id="read"
                data-testid="read"
                className="btn my-2"
                onClick={() => {
                  handleOptionChange("read");
                  setOpen(false);
                }}
                disabled={ctx.loaded ? false : true}
              >
                {t("OptionsMenu.friendsMarkers")}
              </Button>
            </div>
            <div className="w-100"></div>
            <div
              className="d-flex col-sm align-items-center justify-content-center"
              style={{ textAlign: "center" }}
            >
              <Button
                id="friends"
                data-testid="friends"
                className="btn my-2"
                onClick={() => {
                  handleOptionChange("friends");
                  setOpen(false);
                }}
              >
                {t("OptionsMenu.friends")}
              </Button>
            </div>
            <div
              className="d-flex col-sm align-items-center justify-content-center"
              style={{ textAlign: "center" }}
            >
              <Button
                id="filter"
                data-testid="filter"
                className="btn my-2"
                onClick={() => {
                  handleOptionChange("filter");
                  setOpen(false);
                }}
                disabled={ctx.loaded ? false : true}
              >
                {t("OptionsMenu.filters")}
              </Button>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default OptionsMenu;
