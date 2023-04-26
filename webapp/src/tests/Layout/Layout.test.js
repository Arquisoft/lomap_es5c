import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Layout from "../../components/layout/Layout";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

import UserSessionContext from "../../store/session-context";

describe("Layout", () => {
	const mockContextValue = {
		pageStyle: "light",
		handleStyle: jest.fn(),
	};

	test("The layout of the page is rendered and charged in english", async () => {
		i18n.changeLanguage("en");
		const { getByText } = render(<Layout />);
		expect(getByText("LoMap")).toBeInTheDocument();
		expect(getByText("HOME")).toBeInTheDocument();
		expect(getByText("ABOUT")).toBeInTheDocument();
		expect(getByText("LOGIN")).toBeInTheDocument();
	});

	test("The layout of the page is rendered and charged in spanish", async () => {
		i18n.changeLanguage("es");
		const { getByText } = render(
			<I18nextProvider i18n={i18n}>
				<Layout />
			</I18nextProvider>
		);

		expect(getByText("LoMap")).toBeInTheDocument();
		expect(getByText("INICIO")).toBeInTheDocument();
		expect(getByText("NOSOTROS")).toBeInTheDocument();
		expect(getByText("INICIAR SESIÓN")).toBeInTheDocument();
	});

	test("toggles theme style when switch is clicked", () => {
		const { getByRole } = render(
			<UserSessionContext.Provider value={mockContextValue}>
				<Layout isLoggedIn={true} />
			</UserSessionContext.Provider>
		);

		const switchInput = getByRole("checkbox");
		expect(switchInput).toBeInTheDocument();

		fireEvent.click(switchInput);
		expect(mockContextValue.handleStyle).toHaveBeenCalledTimes(1);
	});

	  test('updates isChecked and style on button click', () => {
		const { getByRole } = render(
			<UserSessionContext.Provider value={mockContextValue}>
				<Layout isLoggedIn={true} />
			</UserSessionContext.Provider>
		);
		const button = getByRole("checkbox");
	  
		waitFor(() =>(expect(button).toHaveAttribute('checked', '')));
		waitFor(() => expect(button).toHaveAttribute('value', 'dark'));
	  
		fireEvent.click(button);
	  
		waitFor(() => (expect(button).not.toHaveAttribute('checked')));
		waitFor(() => expect(button).toHaveAttribute('value', 'light'));
	  });
});

