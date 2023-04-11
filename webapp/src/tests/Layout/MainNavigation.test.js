import {render} from "@testing-library/react";
import MainNavigation from "../../components/layout/MainNavigation";

test("The main navigation bar is rendered", async () => {

    const {container} = render(<MainNavigation/>);
    expect(mainNavigation.container).toHaveTextContent('Home');
})
