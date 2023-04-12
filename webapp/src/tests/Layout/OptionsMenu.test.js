import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OptionsMenu from "../../components/layout/OptionsMenu";

describe("OptionsMenu", () => {
  test("calls changeOption function with correct argument when buttons are clicked", () => {
    // Mock the changeOption function
    const mockChangeOption = jest.fn();

    // Render the OptionsMenu component with the mock changeOption function
    const { getByText } = render(<OptionsMenu changeOption={mockChangeOption} />);

    // Get the buttons by their text content
    const markersButton = getByText("Markers");
    const friendsButton = getByText("Friends");
    const filtersButton = getByText("Filter");

    // Click the markers button
    fireEvent.click(markersButton);
    // Expect the changeOption function to be called with "userPods" as the argument
    expect(mockChangeOption).toHaveBeenCalledWith("userPods");

    // Click the friends button
    fireEvent.click(friendsButton);
    // Expect the changeOption function to be called with "friends" as the argument
    expect(mockChangeOption).toHaveBeenCalledWith("friends");

    // Click the filters button
    fireEvent.click(filtersButton);
    // Expect the changeOption function to be called with "filter" as the argument
    expect(mockChangeOption).toHaveBeenCalledWith("filter");
  });
});