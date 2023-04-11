import {render} from "@testing-library/react";
import NotLoggedText from "../../components/UI/NotLoggedText";


/*describe(NotLoggedText, () => {
    it("The phrase saying that you need to log in to start is correct", () => {
        const NotLoggedText = render(<NotLoggedText/>)
        expect(NotLoggedText.container).toHaveTextContent('Not logged, please login!')
    })
})*/

test("The phrase saying that you need to log in to start is correct", async () => {
    const {getByText} = render(<NotLoggedText/>);
    expect(getByText('Not logged, please login!')).toBeInTheDocument();
})