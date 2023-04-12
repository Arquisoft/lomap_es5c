import {render} from "../../setupTests";
import About from "../../components/About/About";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import {screen} from '@testing-library/react';

test("The about page is rendered in English by default", async() => {
    i18n.changeLanguage("en");
    const {getByText} = render(<About/>);
    expect(getByText("LoMap team 5c ⭐️")).toBeInTheDocument();

    //MEMBER 1: JONY
    expect(getByText("Jonathan Arias Busto")).toBeInTheDocument();
    expect(getByText("React developer")).toBeInTheDocument();
    expect(getByText("Student and frontend developer")).toBeInTheDocument();
    expect(getByText("uo283586")).toBeInTheDocument();

    
    //MEMBER 2: LAURA
    expect(getByText("Laura Cordero Castrillo")).toBeInTheDocument();
    expect(getByText("Java Developer")).toBeInTheDocument();
    expect(getByText("Student and Java developer")).toBeInTheDocument();
    expect(getByText("uo275955")).toBeInTheDocument();

    //MEMBER 3: EDU
    expect(getByText("Eduardo Blanco Bielsa")).toBeInTheDocument();
    expect(getByText("Linux administrator")).toBeInTheDocument();
    expect(getByText("Student and cibersecurity lover")).toBeInTheDocument();
    expect(getByText("uo285176")).toBeInTheDocument();

    //MEMBER 4: FER
    expect(getByText("Fernando José González Sierra")).toBeInTheDocument();
    expect(getByText("Backend developer")).toBeInTheDocument();
    expect(getByText("Student and backend enthusiast")).toBeInTheDocument();
    expect(getByText("uo275955")).toBeInTheDocument();

    //MEMBER 5: XIN
    expect(getByText("Chen Xin Pan Wang")).toBeInTheDocument();
    expect(getByText("Software Developer")).toBeInTheDocument();
    expect(getByText("Stackoverflow lover")).toBeInTheDocument();
    expect(getByText("uo277938")).toBeInTheDocument();
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(15);
    
})

/*
test("The about page is rendered and now we change the language to spanish", async() => {
    i18n.changeLanguage("es");
    const {getByText} = render(
        <I18nextProvider i18n={i18n}>
            <About/>
        </I18nextProvider>
    );

    const spanishElement = getByText("Equipo LoMap 5c ⭐️")
    expect(spanishElement).toBeInTheDocument();

    //MEMBER 1: JONY
    expect(getByText("Jonathan Arias Busto")).toBeInTheDocument();
    expect(getByText("Desarrollador React")).toBeInTheDocument();
    expect(getByText("Estudiante y desarrollador frontend")).toBeInTheDocument();


    //MEMBER 2: LAURA 
    expect(getByText("Laura Cordero Castrillo")).toBeInTheDocument();
    expect(getByText("Desarrolladora Java")).toBeInTheDocument();
    expect(getByText("Estudiante y desarrolladora en Java")).toBeInTheDocument();

    //MEMBER 3: EDU
    expect(getByText("Eduardo Blanco Bielsa")).toBeInTheDocument();
    expect(getByText("Administrador Linux")).toBeInTheDocument();
    expect(getByText("Estudiante y amante de la ciberseguridad")).toBeInTheDocument();

    //MEMBER 4: FER
    expect(getByText("Fernando José González Sierra")).toBeInTheDocument();
    expect(getByText("Desarrollador backend")).toBeInTheDocument();
    expect(getByText("Estudiante y entusiasta del backend")).toBeInTheDocument();

    //MEMBER 5: XIN
    expect(getByText("Chen Xin Pan Wang")).toBeInTheDocument();
    expect(getByText("Desarrolladora software")).toBeInTheDocument();
    expect(getByText("Amante de Stackoverflow")).toBeInTheDocument();
});

*/