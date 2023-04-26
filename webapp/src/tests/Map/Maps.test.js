import { getByLabelText, render } from "@testing-library/react";
import Map from "../../components/Map/Maps";

describe("Map", () => {
	test("renders map container Leaflet", () => {
		const coords = { latitude: 51.505, longitude: -0.09 };
		const markerEvent = jest.fn();
		const { getByRole } = render(
			<Map coords={coords} markerEvent={markerEvent} />
		);
		const mapContainer = getByRole("link", { name: "Leaflet" });
		expect(mapContainer).toBeInTheDocument();
	});

	test("renders map container OpenStreetMap", () => {
		const coords = { latitude: 51.505, longitude: -0.09 };
		const markerEvent = jest.fn();
		const { getByRole } = render(
			<Map coords={coords} markerEvent={markerEvent} />
		);
		const mapContainer = getByRole("link", { name: "OpenStreetMap" });
		expect(mapContainer).toBeInTheDocument();
	});
});
