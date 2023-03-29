import {render} from "@testing-library/react";
import NotLoggedText from "../UI/NotLoggedText";


test("The phrase saying that it´s not logged is rendered", async () => {

    const NotLoggedText = render(
        <NotLoggedText> </NotLoggedText>
    )

    expect(NotLoggedText.container).toHaveTextContent('Not logged, please login!')

});