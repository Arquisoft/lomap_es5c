import LogInButton from "../components/LogInButton";
import { screen} from "@testing-library/react";
import React from 'react';
import {render} from "../setupTests";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

//Por defecto es en inglés
describe("LogInButton", () => {
    test("The login view is rendered before pushing the button and is in English by default", async () => {

        const {getByText}= render(<LogInButton isLoggedIn={false}/>);
        expect(getByText('LOGIN')).toBeInTheDocument();
    });

    test("The login view is rendered after pushing the button", async () => {
 
        const {getByText}= render(<LogInButton isLoggedIn={true}/>);
        expect(getByText('LOGOUT')).toBeInTheDocument();
    });
    
});