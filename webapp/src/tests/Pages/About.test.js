import About from "../../components/Pages/About";
import {render} from "../../setupTests";

describe("About", () => {
    test("About page example is render by default in english", async() => {
        const {getByText} = render(<About/>);
        expect(getByText("EJEMPLO Y TEST")).toBeInTheDocument();
    })
});