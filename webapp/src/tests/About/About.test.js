import {render} from "@testing-library/react";
import About from "../../components/About/About";

test("The about page is rendered", async () => {

    const {getByText} = render(<About/>);
    expect(getByText("LoMap team ⭐️")).toBeInTheDocument();

    //We checked that in this page all of the members of the group appear

    //MEMBER 1: JONY
    expect(getByText("Jonathan Arias Busto")).toBeInTheDocument();
    expect(getByText("React developer")).toBeInTheDocument();
    expect(getByText("Student and frontend developer")).toBeInTheDocument();
    expect(getByText("uo283586")).toBeInTheDocument();


    //MEMBER 2: EDU
    expect(getByText("Eduardo Blanco Bielsa")).toBeInTheDocument();
    expect(getByText("Linux administrator")).toBeInTheDocument();
    expect(getByText("Student and cibersecurity lover")).toBeInTheDocument();
    expect(getByText("uo285176")).toBeInTheDocument();

    //MEMBER 3: LAURA
    expect(getByText("Laura Cordero Castrillo")).toBeInTheDocument();
    expect(getByText("Java developer")).toBeInTheDocument();
    expect(getByText("Student and Java developer")).toBeInTheDocument();
    expect(getByText("uo275955")).toBeInTheDocument();

    //MEMBER 4: FER
    expect(getByText("Fernando José González Sierra")).toBeInTheDocument();
    expect(getByText("Backend developer")).toBeInTheDocument();
    expect(getByText("Student and backend enthusiast")).toBeInTheDocument();
    expect(getByText("uo277938")).toBeInTheDocument();

    //MEMBER 5: XIN
    expect(getByText("Chen Xin Pan Wang")).toBeInTheDocument();
    expect(getByText("Software developer")).toBeInTheDocument();
    expect(getByText("Stackoverflow lover")).toBeInTheDocument();
    expect(getByText("uo276967")).toBeInTheDocument();

    

})