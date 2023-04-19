import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSessionContext from "../../store/session-context";
import Card from "../../components/layout/FilterCard";


describe('Card', () => {
  test('renders filter options', () => {
    render(<Card />);

    const filterOptions = screen.getByRole('combobox');
    expect(filterOptions).toBeInTheDocument();
  });

  /* test('changes filter option', () => {
    const handleFilterOption = jest.fn();
    const handleChangedFilter = jest.fn();

    render(
      <UserSessionContext.Provider
        value={{
          filterOption: 'all',
          markers: [],
          filteredMarkers: [],
          handleFilterOption,
          handleChangedFilter,
        }}
      >
        <Card />
      </UserSessionContext.Provider>,
    );

    const filterOptions = screen.getByRole('combobox');
    fireEvent.change(filterOptions, { target: { value: 'Bar' } });

    expect(handleChangedFilter).toHaveBeenCalledTimes(1);
    expect(handleFilterOption).toHaveBeenCalledWith('Bar');
  });

  test('resets filter option', () => {
    const handleFilterOption = jest.fn();
    const handleChangedFilter = jest.fn();

    render(
      <UserSessionContext.Provider
        value={{
          filterOption: 'Bar',
          markers: [],
          filteredMarkers: [],
          handleFilterOption,
          handleChangedFilter,
        }}
      >
        <Card />
      </UserSessionContext.Provider>,
    );

    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);

    expect(handleChangedFilter).toHaveBeenCalledTimes(1);
    expect(handleFilterOption).toHaveBeenCalledWith('All');
  }); */
});