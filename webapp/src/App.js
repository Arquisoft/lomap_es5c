import "./App.css";
import React, { useState, useEffect } from "react";
import About from "./components/About/About";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/Pages/NotFound";
import Content from "./components/Pages/Content";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { useSession } from "@inrupt/solid-ui-react/dist";

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
