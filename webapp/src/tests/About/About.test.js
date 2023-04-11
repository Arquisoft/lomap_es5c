import {render} from "../../setupTests";
import About from "../../components/About/About";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";


test("The about page is rendered in English by default", async() => {
    i18n.changeLanguage("en");
    const {getByText} = render(<About/>);
    expect(getByText("LoMap team ⭐️")).toBeInTheDocument();

    //MEMBER 1: JONY
    expect(getByText("Jonathan Arias Busto")).toBeInTheDocument();
    expect(getByText("React developer")).toBeInTheDocument();
    expect(getByText("Student and frontend developer")).toBeInTheDocument();


    //MEMBER 2: LAURA
    expect(getByText("Laura Cordero Castrillo")).toBeInTheDocument();
    expect(getByText("Java Developer")).toBeInTheDocument();
    expect(getByText("Student and Java developer")).toBeInTheDocument();

    //MEMBER 3: EDU
    expect(getByText("Eduardo Blanco Bielsa")).toBeInTheDocument();
    expect(getByText("Linux administrator")).toBeInTheDocument();
    expect(getByText("Student and cibersecurity lover")).toBeInTheDocument();

    //MEMBER 4: FER
    expect(getByText("Fernando José González Sierra")).toBeInTheDocument();
    expect(getByText("Backend developer")).toBeInTheDocument();
    expect(getByText("Student and backend enthusiast")).toBeInTheDocument();

    //MEMBER 5: XIN
    expect(getByText("Chen Xin Pan Wang")).toBeInTheDocument();
    expect(getByText("Software Developer")).toBeInTheDocument();
    expect(getByText("Stackoverflow lover")).toBeInTheDocument();
    
});

/*test("The about page is rendered and now we change the language to spanish", async() => {
    i18n.changeLanguage("es");
    render(
        <I18nextProvider i18n={i18n}>
            const {getByText} = render(<About/>);
        </I18nextProvider>
    );
    expect(getByText("Equipo LoMap ⭐️")).toBeInTheDocument();
}); */