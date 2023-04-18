import OptionsMenu from "../../components/layout/OptionsMenu";
import {render} from "../../setupTests";
import {screen, fireEvent} from '@testing-library/react';

//Por defecto es en inglés

describe("OptionsMenu", () => {
    test("The Options Menu is rendered and it is in english by default", async() => {
        const { getByText } = render(<OptionsMenu />);
        const buttons = screen.getAllByRole('button');

        expect(buttons.length).toBe(4);
    })

    test("should render four buttons with the correct text by default in english", () => {
        const { getByText } = render(<OptionsMenu />);
    
        expect(getByText("Markers")).toBeInTheDocument();
        expect(getByText("Friends Markers")).toBeInTheDocument();
        expect(getByText("Friends")).toBeInTheDocument();
        expect(getByText("Filter")).toBeInTheDocument();
      });

      /* test("should call changeOption with correct value when a button is clicked/is pushed correctly", () => {
        const changeOptionMock = jest.fn();
        const { getByText } = render(<OptionsMenu changeOption={changeOptionMock} />);
    
        fireEvent.click(getByText("Markers"));
    
        expect(changeOptionMock).toHaveBeenCalledWith("userPods");
      }); */
})
