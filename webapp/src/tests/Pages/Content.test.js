import { render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "@inrupt/solid-ui-react";
import Content from "../../components/Pages/Content";
import Map from "../../components/Map/Maps";
import MapContainer from "../../components/Map/MapContainer";

describe("Content", () => {
	test("renders NotLoggedText when not logged in", () => {
		render(
			<SessionProvider sessionId="test-session">
				<Content isLoggedIn={false} />
			</SessionProvider>
		);

		const notLoggedText = screen.getByText("Not logged, please login!");
		expect(notLoggedText).toBeInTheDocument();
	});

	test("renders MapContainer when isLoggedIn is true", () => {
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

	  test("renders MapContainer when logged in", () => {
		const { queryByRole } = render(
		  <SessionProvider sessionId="log-in-example">
			<Content isLoggedIn={true} />
		  </SessionProvider>
		);
		const mapContainer = queryByRole("figure");
		waitFor(() =>expect(mapContainer).toBeInTheDocument());
	  });

});



// import React from "react";
// import {render} from "../../setupTests";
// import { SessionProvider } from "@inrupt/solid-ui-react";

// import Content from "../../components/Pages/Content";
// import MapContainer from "../../components/Map/MapContainer";
// import NotLoggedText from "../../components/UI/NotLoggedText";

// jest.mock("@inrupt/solid-ui-react", () => {
//   const actual = jest.requireActual("@inrupt/solid-ui-react");
//   return {
//     ...actual,
//     useSession: jest.fn(),
//   };
// });

// describe("Content", () => {
//   test("should render NotLoggedText when not logged in", () => {
//    /*  const useSessionMock = jest.fn(() => ({ session: null }));
//     const { getByTestId } = render(
//       <SessionProvider sessionId="log-in-example">
//         <Content isLoggedIn={false} />
//       </SessionProvider>

//     );
//     expect(<NotLoggedText/>).toBeInTheDocument();
//     expect(useSessionMock).toHaveBeenCalled();
//   });

//   test("should render MapContainer when logged in", () => {
//     const useSessionMock = jest.fn(() => ({ session: {} }));
//     const { getByTestId } = render(
//       <SessionProvider sessionId="log-in-example">
//         <Content isLoggedIn={true} />
//       </SessionProvider>
//     );
//     expect(<MapContainer/>).toBeInTheDocument();
//     expect(useSessionMock).toHaveBeenCalled(); */
//   });
// });
