import {render} from "@testing-library/react";
import NotLoggedText from "../UI/NotLoggedText";



describe(NotLoggedText, () => {
    it("The phrase saying that you need to log in to start is correct", () => {
        const {NotLoggedText} = render(<NotLoggedText> </NotLoggedText>);
        expect(NotLoggedText.container).toHaveTextContent('Page not found!')
    })
})