import {getByPlaceholderText, render } from "@testing-library/react"
import MainNavigation from "../layout/MainNavigation"

describe(MainNavigation, () => {
    it("Show the correct navigation tab", () => {
        const {MainNavigation} = render(<MainNavigation></MainNavigation>);
        const home = getByPlaceholderText("Home");
        expect(home.textContent).toEquals("");
    })
})