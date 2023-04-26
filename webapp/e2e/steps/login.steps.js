import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import LogInButton from '../../src/components/LogInButton';
import { render, screen } from "@testing-library/react";


const feature = loadFeature('./features/login.feature');

defineFeature(feature, (scenario) => {
    let component;
    let isLoggedIn = false;

    beforeEach(() => {
        component = render(<LogInButton isLoggedIn={isLoggedIn}/>);
    })

    scenario('Display login button when not logged in',  ({given, when, then}) => {
        given('I am not logged in', () => {
            isLoggedIn = false;
        });

        when('I navigate to the page', () => {
            component = render(<LogInButton isLoggedIn={isLoggedIn}/>);
        });

        then('I should see the login button', () => {
            const loginButton = screen.getByText("Log in");
            expect(loginButton).toBeInTheDocument();
        })
    } );

    scenario('Add a custom login provider',  ({given, when, then}) => {
        given('the user is not logged in', () => {
            isLoggedIn = false;
        });

        when('I click on the login button', () => {
            const customProviderInput = screen.getByPlaceholderText("Other");
            fireEvent.change(customProviderInput, { target: { value: "https://example.com/" } });
            const addButton = screen.getByText("Add provider");
            fireEvent.click(addButton);
        });

        then('I should should be displayed in the login dropdown', () => {
            const customProviderOption = screen.getByText("https://example.com/");
             expect(customProviderOption).toBeInTheDocument();
        })
    } );

})


