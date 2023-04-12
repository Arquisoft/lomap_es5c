import {render} from "../../setupTests";
import NotLoggedText from "../../components/UI/NotLoggedText";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

//It is in english by default
test("The phrase saying that you need to log in to start is correct and by default in english", async () => {
    const {getByText} = render(<NotLoggedText/>);
    expect(getByText('Not logged, please login!')).toBeInTheDocument();
});

//Now we change the language to spanish
test("The phrase saying that you need to log to start is correct and the lenaguge is changed", async () => {
    i18n.changeLanguage("es");
    const {getByText} = render(
      <I18nextProvider i18n={i18n}>
         <NotLoggedText />
      </I18nextProvider>

    );
    expect(getByText('¡No has iniciado sesión! Por favor, inicia sesión')).toBeInTheDocument();
});

