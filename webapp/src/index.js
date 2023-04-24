import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { UserSessionProvider } from "./store/session-context";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import "./locale/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<UserSessionProvider>
		<BrowserRouter>
			<I18nextProvider i18n={i18next}>
				<App />
			</I18nextProvider>
		</BrowserRouter>
	</UserSessionProvider>
);

reportWebVitals();
