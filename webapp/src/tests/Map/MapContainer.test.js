import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MapContainer from "../../components/Map/MapContainer";

describe("MapContainer", () => {
	test("renders map and side menu after fetching location data", async () => {
		const mockGeolocation = {
			getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
				Promise.resolve(
					success({
						coords: {
							latitude: 37.7749,
							longitude: -122.4194,
						},
					})
				)
			),
		};
		global.navigator.geolocation = mockGeolocation;

		render(<MapContainer />);

		// Check that loading spinner is not visible
		expect(screen.queryByTestId("loading-spinner")).toBeNull();

		waitFor(() => {
			expect(screen.getByLabelText("Map")).toBeInTheDocument();
			expect(
				screen.getByRole("heading", { name: "Side Menu" })
			).toBeInTheDocument();
		});
	});

	test("renders loading spinner while fetching location data", () => {
		render(<MapContainer />);
		expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
	});
});
