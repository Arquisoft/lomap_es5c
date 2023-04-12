import LogInButton from "../components/LogInButton";
import {render, screen} from "@testing-library/react";

import React from 'react';

describe("LogInButton", () => {
    test("The login view is rendered before pushing the button", async () => {
        const {getByText}= render(<LogInButton isLoggedIn={false}/>);
        expect(getByText('LOGIN')).toBeInTheDocument();
    });

    test("The login view is rendered after pushing the button", async () => {
        const {getByText}= render(<LogInButton isLoggedIn={true}/>);
        expect(getByText('LOGOUT')).toBeInTheDocument();
    });
    
});