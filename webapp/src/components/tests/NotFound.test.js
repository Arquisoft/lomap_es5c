import {render} from "@testing-library/react";
import NotFound from "../Pages/NotFound";
import NotLoggedText from "../UI/NotLoggedText";


test("The phrase saying that it´s not logged is rendered", async () => {

    const NotFound = render(
        <NotFound> </NotFound>
    )

    expect(NotLoggedText.container).toHaveTextContent('Page not found!')

});