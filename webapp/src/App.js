import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import About from "./components/About/About";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/Pages/NotFound";
import Content from "./components/Pages/Content";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { useSession } from "@inrupt/solid-ui-react/dist";

import UserSessionContext from "./store/session-context";

function App() {
  const ctx = useContext(UserSessionContext);
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

  useEffect(() => {
    if (
      window.localStorage.getItem("themeStyle") !== null ||
      window.localStorage.getItem("themeStyle") !== undefined
    ) {
      ctx.handleStyle(window.localStorage.getItem("themeStyle"));
    }
    if (isLoggedIn) {
      window.localStorage.setItem("webId", session.info.webId);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // console.log("ctx.pageStyle", ctx.pageStyle);
    document.body.className = window.localStorage.getItem("themeStyle");
  }, [ctx.pageStyle]);

  useEffect(() => {
    ctx.handleStyle(window.localStorage.getItem("themeStyle"));
  }, []);

  return (
    <>
      <SessionProvider sessionId="log-in-example">
        <Routes>
          <Route element={<Layout isLoggedIn={isLoggedIn} />}>
            <Route index element={<Content isLoggedIn={isLoggedIn} />}></Route>
            {/* <Route path="/home" element={<Content />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SessionProvider>
    </>
  );
}

export default App;
