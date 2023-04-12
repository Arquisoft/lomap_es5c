import {render} from "../../setupTests";
import i18n from "i18next";
import Footer from "../../components/layout/Footer";

//It is in english by default
test("The phrase of the footer is correct and by default in english", async () => {
    i18n.changeLanguage("en");
    const {getByText} = render(<Footer/>);
    expect(getByText('LoMap application.')).toBeInTheDocument();
});