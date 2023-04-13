import {render} from "../../setupTests";
import NotFound from "../../components/Pages/NotFound";
import i18n from "i18next";

//It is in english by default
test("The phrase saying that the page is not found is correct and by default in english", async () => {
    i18n.changeLanguage("en");
    const {getByText} = render(<NotFound/>);
    expect(getByText('Page not found!')).toBeInTheDocument();
});
