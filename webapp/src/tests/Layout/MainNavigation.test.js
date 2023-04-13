import {render} from "@testing-library/react";
import MainNavigation from "../../components/layout/MainNavigation";

describe("MainNavigation", () => {
    test("The main navigation bar is rendered", async () => {
        const {getByText} = render(<MainNavigation/>);
        expect(getByText("LoMap")).toBeInTheDocument();
    });
});
