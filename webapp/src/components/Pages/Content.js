import React, { useState } from "react";
import { useSession } from "@inrupt/solid-ui-react/dist";
import { SessionProvider } from "@inrupt/solid-ui-react";
import NotLoggedText from "../UI/NotLoggedText";
import MapContainer from "../Map/MapContainer";

const Content = ({ isLoggedIn }) => {
  return (
    <SessionProvider sessionId="log-in-example">
      {isLoggedIn ? <MapContainer /> : <NotLoggedText />}
    </SessionProvider>
  );
};

export default Content;
