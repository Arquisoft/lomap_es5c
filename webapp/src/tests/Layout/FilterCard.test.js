import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSessionContext from "../../store/session-context";
import Card from "../../components/layout/FilterCard";


describe("Filtercard", () => {
  const mockMarkers = [
    { id: 1, category: "Bar" },
    { id: 2, category: "Shop" },
    { id: 3, category: "Restaurant" },
  ];

  test("renders the filter options correctly", () => {
    render(
      <UserSessionContext.Provider
        value={{
          markers: mockMarkers,
          filterOption: "All",
          handleFilterOption: jest.fn(),
          handleFilteredMarkers: jest.fn(),
          handleChangedFilter: jest.fn(),
        }}
      >
        <Card/>
      </UserSessionContext.Provider>
    );

    const selectElement = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    expect(selectElement).toBeInTheDocument();
    expect(options).toHaveLength(19);
  });

  test("changes the filter when an option is selected", () => {
    const handleFilterOption = jest.fn();
    const handleFilteredMarkers = jest.fn();
    const handleChangedFilter = jest.fn();

    render(
      <UserSessionContext.Provider
        value={{
          markers: mockMarkers,
          filterOption: "All",
          handleFilterOption,
          handleFilteredMarkers,
          handleChangedFilter,
        }}
      >
        <Card />
      </UserSessionContext.Provider>
    );

    const selectElement = screen.getByRole("combobox");
    userEvent.selectOptions(selectElement, "Shop");

    expect(handleFilterOption).toHaveBeenCalledTimes(1);
    expect(handleFilterOption).toHaveBeenCalledWith("Shop");
    expect(handleChangedFilter).toHaveBeenCalledTimes(1);
    expect(handleChangedFilter).toHaveBeenCalledWith(true);
    expect(handleFilteredMarkers).toHaveBeenCalledTimes(1);
    expect(handleFilteredMarkers).toHaveBeenCalledWith([
      { id: 2, category: "Shop" },
    ]);
  });

  
});
