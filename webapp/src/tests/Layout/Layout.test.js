import {render} from "@testing-library/react";
import Layout from "../../components/layout/Layout"; 
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

describe("Layout", () => {
    test("The layout of the page is rendered and charged in english", async () => {
        i18n.changeLanguage("en");
        const {getByText} = render(<Layout/>);
        expect(getByText('LoMap')).toBeInTheDocument();
        expect(getByText('HOME')).toBeInTheDocument();
        expect(getByText('ABOUT')).toBeInTheDocument();
        expect(getByText('LOGIN')).toBeInTheDocument();
    });

    test("The layout of the page is rendered and charged in spanish", async() => {
        i18n.changeLanguage("es");
        const {getByText} = render(
            <I18nextProvider i18n={i18n}>
                <Layout/>
            </I18nextProvider>
        );

        expect(getByText('LoMap')).toBeInTheDocument();
        expect(getByText('INICIO')).toBeInTheDocument();
        expect(getByText('NOSOTROS')).toBeInTheDocument();
        expect(getByText('INICIAR SESIÓN')).toBeInTheDocument();
    });
});