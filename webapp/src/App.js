import "./App.css";
import React from "react";

import About from "./components/About/About";

import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/Pages/NotFound";
import Content from "./components/Pages/Content";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Content />}></Route>
          <Route path="/home" element={<Content />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
