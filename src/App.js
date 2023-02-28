import "./App.css";
import { SessionProvider } from "@inrupt/solid-ui-react";
import React, { useState } from "react";
import ProfileViewer from "./components/ProfileViewer";
import { useSession } from "@inrupt/solid-ui-react/dist";
import NotLoggedText from "./components/UI/NotLoggedText";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useSession();

  //We have logged in
  session.onLogin(() => {
    setIsLoggedIn(true);
  });

  //We have logged out
  session.onLogout(() => {
    setIsLoggedIn(false);
  });

  return (
    <SessionProvider sessionId="log-in-example">
      {!isLoggedIn ? <NotLoggedText /> : <ProfileViewer />}
    </SessionProvider>
  );
}

export default App;
