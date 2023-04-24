import { render, fireEvent } from "@testing-library/react";
import FilterButton from "../../components/layout/FilterButton";

describe("FilterButton component", () => {
  test("should render button with title initially", () => {
    const { getByText } = render(<FilterButton title="Test" content="Test Content" />);
    const buttonElement = getByText("Test");
    expect(buttonElement).toBeInTheDocument();
  });

  test("should render FilterCard when button is clicked", () => {
    const { getByText, getAllByRole } = render(<FilterButton title="Test" content="Test Content" />);
    const buttonElement = getByText("Test");
    fireEvent.click(buttonElement);
    expect(getByText("Filter by category")).toBeInTheDocument();

    const options = getAllByRole("option");
    expect(options[0].textContent).toBe("All");
    expect(options.length).toBe(19);

  });

});