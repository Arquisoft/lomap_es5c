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

  const [data, setData] = useState();

  const handleFetch = async () => {
    const response = await fetch("http://localhost:5000/place/list").then(
      (res) => res.json()
    );
    //.then((data) => (setData(data.message)))

    console.log(response);
  };
  useEffect(() => {
    handleFetch();
  }, []);

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
          <Route element={<Layout />}>
            <Route index element={<Content />}></Route>
            <Route path="/home" element={<Content />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SessionProvider>
    </>
  );
}

export default App;
