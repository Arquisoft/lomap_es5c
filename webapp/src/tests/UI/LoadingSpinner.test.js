import LoadingSpinner from "../../components/UI/LoadingSpinner";
import {render} from "../../setupTests";
import classes from "./LoadingSpinner.module.css";

describe("LoadingSpinner", () => {
    // aquí se escribirán las pruebas

    test("renders with class spinner", () => {
        const { container } = render(<LoadingSpinner />);
        expect(container.firstChild.classList.contains(classes.spinner)).toBe(true);
      });
  });