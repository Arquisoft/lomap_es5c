import OptionsMenu from "../../components/layout/OptionsMenu";
import {render} from "../../setupTests";
import {screen, fireEvent, waitFor} from '@testing-library/react';
import i18n from "i18next";

//Por defecto es en inglés

describe("OptionsMenu", () => {
    test("The Options Menu is rendered and it is in english by default", async() => {
        const { getByText } = render(<OptionsMenu />);
        const buttons = screen.getAllByRole('button');

        expect(getByText("Markers")).toBeInTheDocument();
        expect(getByText("Friends Markers")).toBeInTheDocument();
        expect(getByText("Friends")).toBeInTheDocument();
        expect(getByText("Filter")).toBeInTheDocument();
        expect(buttons.length).toBe(4);
    })

    test("should call changeOption with correct value when the 'Friends Markers' button is clicked", () => {
      const changeOptionMock = jest.fn();
      const { getByText } = render(<OptionsMenu changeOption={changeOptionMock} />);
      
      fireEvent.click(getByText("Markers"));
      waitFor( () => {
        expect(changeOptionMock).toHaveBeenCalledWith("userPods");
      });
    })

    test("should call changeOption with correct value when the 'Marker' button is clicked", () => {
        const changeOptionMock = jest.fn();
        const { getByText } = render(<OptionsMenu changeOption={changeOptionMock} />);
        
        fireEvent.click(getByText("Friends Markers"));
        waitFor( () => {
          expect(changeOptionMock).toHaveBeenCalledWith("read");
        });
    })

    test("should call changeOption with correct value when the 'Friend' button is clicked", () => {
      const changeOptionMock = jest.fn();
      const { getByText } = render(<OptionsMenu changeOption={changeOptionMock} />);
      
      fireEvent.click(getByText("Friends"));
      waitFor( () => {
        expect(changeOptionMock).toHaveBeenCalledWith("friend");
      });
    })

    test("should call changeOption with correct value when the 'Filter' button is clicked", () => {
      const changeOptionMock = jest.fn();
      const { getByText } = render(<OptionsMenu changeOption={changeOptionMock} />);
      
      fireEvent.click(getByText("Filter"));
      waitFor( () => {
        expect(changeOptionMock).toHaveBeenCalledWith("filter");
      });
    })

    test("The Options Menu is rendered and it is in spanish", async() => {
      i18n.changeLanguage("es");
      const { getByText } = render(<OptionsMenu />);
      const buttons = screen.getAllByRole('button');

      expect(getByText("Marcadores")).toBeInTheDocument();
      expect(getByText("Marcadores de amigos")).toBeInTheDocument();
      expect(getByText("Amigos")).toBeInTheDocument();
      expect(getByText("Filtrar")).toBeInTheDocument();
      expect(buttons.length).toBe(4);
    })
})
