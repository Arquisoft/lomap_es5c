import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSessionContext from "../../store/session-context";
import Card from "../../components/layout/FilterCard";

const mockCtx = {
  markers: [
    { category: "Bar" },
    { category: "Restaurant" },
    { category: "Shop" },
    { category: "Supermarket" },
    { category: "Other" },
  ],
  filteredMarkers: [],
  filterOption: "All",
  handleChangedFilter: jest.fn(),
  handleFilterOption: jest.fn(),
  handleFilteredMarkers: jest.fn(),
};

describe("Card", () => {
  test("renders filter options", () => {
    render(<Card />);

    const filterOptions = screen.getByRole("combobox");
    expect(filterOptions).toBeInTheDocument();
  });

  it("renders the filter options and handles filter changes", () => {
    render(
      <UserSessionContext.Provider value={mockCtx}>
        <Card />
      </UserSessionContext.Provider>
    );

    // Ensure all filter options are displayed
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select.children.length).toBe(19);

    // Test filtering by category
    fireEvent.change(select, { target: { value: "Bar" } });
    expect(mockCtx.handleChangedFilter).toHaveBeenCalledWith(true);
    expect(mockCtx.handleFilterOption).toHaveBeenCalledWith("Bar");
    expect(mockCtx.handleFilteredMarkers).toHaveBeenCalledWith([
      { category: "Bar" },
    ]);

    // Test resetting filter
    const resetBtn = screen.getByRole("button", { name: "Reset" });
    fireEvent.click(resetBtn);
    expect(mockCtx.handleFilterOption).toHaveBeenCalledWith("All");
    expect(mockCtx.handleFilteredMarkers).toHaveBeenCalledWith([]);

    // Test showing modal when no filtered markers
    fireEvent.change(select, { target: { value: "Other" } });
    expect(mockCtx.handleChangedFilter).toHaveBeenCalledWith(true);
    expect(mockCtx.handleFilterOption).toHaveBeenCalledWith("Other");
    expect(mockCtx.handleFilteredMarkers).toHaveBeenCalledWith([
      { category: "Other" },
    ]);
    expect(screen.queryByText("No results found")).toBeNull();

    fireEvent.change(select, { target: { value: "Shop" } });
    expect(mockCtx.handleChangedFilter).toHaveBeenCalledWith(true);
    expect(mockCtx.handleFilterOption).toHaveBeenCalledWith("Shop");
    expect(mockCtx.handleFilteredMarkers).toHaveBeenCalledWith([
      { category: "Shop" },
    ]);

    // Modal should be displayed when no filtered markers
    // expect(screen.getByText("No markers found")).toBeInTheDocument();
    // expect(screen.queryByText("Reset")).toBeNull();
  });

  /* test('changes filter option', () => {
    const handleFilterOption = jest.fn();
    const handleChangedFilter = jest.fn();

    render(
      <UserSessionContext.Providerw
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
