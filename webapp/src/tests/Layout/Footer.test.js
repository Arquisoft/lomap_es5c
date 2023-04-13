import {render} from "../../setupTests";
import i18n from "i18next";
import Footer from "../../components/layout/Footer";


describe("Footer", () => {
    //It is in english by default
    test("The phrase of the footer is correct and by default in english", async () => {
        i18n.changeLanguage("en");
        const {getByText} = render(<Footer/>);
        expect(getByText('LoMap application.')).toBeInTheDocument();
    });

    test("renders with themeStyle equal to dark", () => {
        const { container } = render(<Footer themeStyle="dark" />);
        expect(container.firstChild.classList.contains("bg-dark")).toBe(true);
      });

})