import {getByRole, render, fireEvent} from "@testing-library/react";
import MainNavigation from "../../components/layout/MainNavigation";
import i18n from "i18next";

describe("MainNavigation", () => {
    test("The main navigation bar is rendered", async () => {
        const {getByText} = render(<MainNavigation/>);
        expect(getByText("LoMap")).toBeInTheDocument();
    });

    test("displays the correct menu items", () => {
        const { getByText } = render(<MainNavigation />);
        expect(getByText("HOME")).toBeInTheDocument();
        expect(getByText("ABOUT")).toBeInTheDocument();
      });

    test("displays the button of language spanish", () => {
        const { getByAltText } = render(<MainNavigation />);
        const spanishButton = getByAltText("Español");
        expect(spanishButton).toBeInTheDocument();
        fireEvent.click(spanishButton);

        expect(i18n.language).toBe('es');
    });

    test("displays the button of language english", () => {
        const { getByAltText } = render(<MainNavigation />);
        const englishButton = getByAltText("English");

        expect(englishButton).toBeInTheDocument();

        fireEvent.click(englishButton);

        expect(i18n.language).toBe('en');
    })
});

