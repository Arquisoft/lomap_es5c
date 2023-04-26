import LocationMarkers from "../../components/Map/LocateMarkers";
import { render } from "../../setupTests";
import { screen, fireEvent } from "@testing-library/react";
import { MapContainer } from "react-leaflet";
import InfoCard from "../../components/UI/InfoCard";
import {
	getOptionIcon,
	createCustomIcon,
} from "../../components/Map/LocateMarkers";
import iconMonument from "../../images/monument.png";
import iconLandscape from "../../images/landscape.png";
import iconShop from "../../images/shop.png";
import iconBar from "../../images/bar.png";
import iconSupermarket from "../../images/supermarket.png";
import iconHotel from "../../images/hotel.png";
import iconCinema from "../../images/cinema.png";
import iconAcademicInstitution from "../../images/academicInstitution.png";
import iconPublicInstitution from "../../images/publicInstitution.png";
import iconSportsClub from "../../images/sportsClub.png";
import iconMuseum from "../../images/museum.png";
import iconPark from "../../images/park.png";
import iconHospital from "../../images/hospital.png";
import iconPoliceStation from "../../images/policeStation.png";
import iconTransportCenter from "../../images/transportCenter.png";
import iconEntertainment from "../../images/entertainment.png";
import iconRestaurant from "../../images/restaurant.png";

import unknownIcon from "../../images/unknown.png";

//needed to load session
jest.mock("@inrupt/solid-ui-react", () => ({
	useSession: () => ({
		session: {
			info: {
				webId: "https://uo277938.inrupt.net/profile/card#me",
			},
		},
	}),
}));

describe("LocateMarker", () => {
	test("renders the component", async () => {
		const coords = { latitude: 37.7749, longitude: -122.4194 };
		render(
			<MapContainer center={[coords.latitude, coords.longitude]} zoom={13}>
				<LocationMarkers coords={coords} />
			</MapContainer>
		);
	});

	test("renders the marker from the database", async () => {
		const coords = { latitude: 40.7128, longitude: -74.006 };
		const dbMarkers = [
			{
				id: 1,
				name: "Marker 1",
				latitude: 42.7128,
				longitude: -74.006,
				type: "shop",
			},
		];
		jest.spyOn(global, "fetch").mockResolvedValue({
			json: jest.fn().mockResolvedValue(dbMarkers),
		});
		render(
			<MapContainer center={[coords.latitude, coords.longitude]} zoom={13}>
				<LocationMarkers coords={coords} />
			</MapContainer>
		);
		const marker1 = await screen.getByAltText("Marker");
		expect(marker1).toBeInTheDocument();
	});

	test("renders the marker info when clicked", async () => {
		const coords = { latitude: 40.7128, longitude: -74.006 };
		const dbMarkers = [
			{
				id: 1,
				name: "Marker 1",
				latitude: 42.7128,
				longitude: -74.006,
				type: "shop",
			},
		];
		jest.spyOn(global, "fetch").mockResolvedValue({
			json: jest.fn().mockResolvedValue(dbMarkers),
		});
		render(
			<MapContainer center={[coords.latitude, coords.longitude]} zoom={13}>
				<LocationMarkers coords={coords} />
			</MapContainer>
		);

		const marker1 = await screen.getByAltText("Marker");
		fireEvent.click(marker1);
		const { getByText } = render(
			<InfoCard position={dbMarkers[0].name}></InfoCard>
		);
		expect(getByText("Marker 1")).toBeInTheDocument();
	});

	test('returns bar icon for option "bar"', () => {
		const expectedIcon = createCustomIcon(iconBar, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("bar");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns monument icon for option "monument"', () => {
		const expectedIcon = createCustomIcon(iconMonument, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("monument");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns landscape icon for option "landscape"', () => {
		const expectedIcon = createCustomIcon(iconLandscape, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("landscape");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns shop icon for option "shop"', () => {
		const expectedIcon = createCustomIcon(iconShop, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("shop");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns supermarket icon for option "supermarket"', () => {
		const expectedIcon = createCustomIcon(iconSupermarket, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("supermarket");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns hotel icon for option "hotel"', () => {
		const expectedIcon = createCustomIcon(iconHotel, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("hotel");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns cinema icon for option "cinema"', () => {
		const expectedIcon = createCustomIcon(iconCinema, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("cinema");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns academic institution icon for option "academicInstitution"', () => {
		const expectedIcon = createCustomIcon(
			iconAcademicInstitution,
			[35, 35],
			[5, 30]
		);
		const actualIcon = getOptionIcon("academicInstitution");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns public institution icon for option "publicInstitution"', () => {
		const expectedIcon = createCustomIcon(
			iconPublicInstitution,
			[35, 35],
			[5, 30]
		);
		const actualIcon = getOptionIcon("publicInstitution");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns sports club icon for option "sportsClub"', () => {
		const expectedIcon = createCustomIcon(iconSportsClub, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("sportsClub");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns museum icon for option "museum"', () => {
		const expectedIcon = createCustomIcon(iconMuseum, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("museum");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns park icon for option "park"', () => {
		const expectedIcon = createCustomIcon(iconPark, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("park");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns hospital icon for option "hospital"', () => {
		const expectedIcon = createCustomIcon(iconHospital, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("hospital");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns policeStation icon for option "policeStation"', () => {
		const expectedIcon = createCustomIcon(iconPoliceStation, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("policeStation");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns transportCenter icon for option "transportCenter"', () => {
		const expectedIcon = createCustomIcon(
			iconTransportCenter,
			[35, 35],
			[5, 30]
		);
		const actualIcon = getOptionIcon("transportCenter");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns entertainment icon for option "entertainment"', () => {
		const expectedIcon = createCustomIcon(iconEntertainment, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("entertainment");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns restaurant icon for option "restaurant"', () => {
		const expectedIcon = createCustomIcon(iconRestaurant, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("restaurant");
		expect(actualIcon).toEqual(expectedIcon);
	});

	test('returns other icon for option "other"', () => {
		const expectedIcon = createCustomIcon(unknownIcon, [35, 35], [5, 30]);
		const actualIcon = getOptionIcon("other");
		expect(actualIcon).toEqual(expectedIcon);
	});
});
