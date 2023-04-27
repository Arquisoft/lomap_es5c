import OptionsMenu from "../../components/layout/OptionsMenu";
import {render} from "../../setupTests";
import {screen, fireEvent, waitFor} from '@testing-library/react';
import UserSessionContext from '../../store/session-context';
import i18n from "i18next";

//Por defecto es en inglés

const mockCtx = {
  handleChangedFilter: jest.fn(),
  handleFilterOption: jest.fn(),
  handleFilteredMarkers: jest.fn(),
  markers: [{ category: "bar" }, { category: "restaurant" }],
  filterOption: "All",
};

describe("OptionsMenu", () => {
  const changeOptionMock = jest.fn();
  const contextValues = { loaded: true };
  const setup = () => {
    return render(
      <UserSessionContext.Provider value={contextValues}>
        <OptionsMenu changeOption={changeOptionMock} />
      </UserSessionContext.Provider>
    );
  };

  test('renders without errors', () => {
    setup();
  });

  test("The Options Menu is rendered and it is in english by default", () => {
      const { getByText } = render(<OptionsMenu />);
      const buttons = screen.getAllByRole('button');

      expect(getByText("Markers")).toBeInTheDocument();
      expect(getByText("Friends Markers")).toBeInTheDocument();
      expect(getByText("Friends")).toBeInTheDocument(); 
      expect(getByText("Filter")).toBeInTheDocument();
      expect(buttons.length).toBe(4);
  });

  test('disables buttons when context is not loaded', () => {
    contextValues.loaded = false;
    setup();
    expect(screen.getByText("Markers")).toBeDisabled();
    expect(screen.getByText("Friends Markers")).toBeDisabled();
    expect(screen.getByText("Filter")).toBeDisabled();
  });

  test('calls changeOption with the correct option when a button is clicked', () => {
    contextValues.loaded = true;
    const { getByTestId } = setup();

    fireEvent.click(getByTestId("userPods"));
    expect(changeOptionMock).toHaveBeenCalledWith('userPods');

    fireEvent.click(getByTestId("read"));
    expect(changeOptionMock).toHaveBeenCalledWith('read');

    fireEvent.click(getByTestId("friends")); 
    expect(changeOptionMock).toHaveBeenCalledWith('friends');

    fireEvent.click(getByTestId("filter"));
    expect(changeOptionMock).toHaveBeenCalledWith('filter');
  });

  

});
