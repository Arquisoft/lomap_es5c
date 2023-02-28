import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/UI/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// We add the header tag to the ReactDOM
const header = ReactDOM.createRoot(document.getElementById("header"));
header.render(<Header />);

reportWebVitals();
