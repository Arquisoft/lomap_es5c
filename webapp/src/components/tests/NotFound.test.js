import {render} from "@testing-library/react";
import NotFound from "../Pages/NotFound";


describe(NotFound, () => {
    it("The phrase saying that the page not found", () => {
        const {NotFound} = render(<NotFound> </NotFound>);
        expect(NotFound.container).toHaveTextContent('Page not found!')
    })
});