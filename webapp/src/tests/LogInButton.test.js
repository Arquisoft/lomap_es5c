import LogInButton from "../components/LogInButton";
import { fireEvent, screen} from "@testing-library/react";
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

    test("renders login dropdown button when not logged in", () => {
        const { getByText, queryByText } = render(<LogInButton isLoggedIn={false} />);
        const loginButton = getByText('LOGIN');
        fireEvent.click(loginButton);
        const inruptProvider = queryByText('https://inrupt.net/');
        expect(inruptProvider).toBeInTheDocument();
        expect(getByText("https://solidcommunity.net/")).toBeInTheDocument();
        expect(getByText("https://solidweb.org/")).toBeInTheDocument();
      });

    test("adds a new provider when user submits form", () => {
        const { getByText, getByPlaceholderText, queryByText } = render(<LogInButton isLoggedIn={false} />);
        const loginButton = getByText('LOGIN');
        fireEvent.click(loginButton);
        const providerInput = getByPlaceholderText('Other provider');
        fireEvent.change(providerInput, { target: { value: 'https://example.com/' } });
        const addButton = getByText('Add provider');
        fireEvent.click(addButton);
        const newProvider = queryByText('https://example.com/');
        expect(newProvider).toBeInTheDocument();
      });
    
});