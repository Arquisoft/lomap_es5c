import LocationMarkers from "../../components/Map/LocateMarkers";
import {render} from "../../setupTests";
import {screen, fireEvent, waitFor} from '@testing-library/react';
import i18n from "i18next";
import { useSession } from "@inrupt/solid-ui-react";
import { MapContainer } from "react-leaflet";
import InfoCard from "../../components/UI/InfoCard";

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
        { id: 1, name: "Marker 1", latitude: 42.7128, longitude: -74.006, type: "shop" },
      ];
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(dbMarkers),
      });
      render(<MapContainer center={[coords.latitude, coords.longitude]} zoom={13}>
              <LocationMarkers coords={coords} />
            </MapContainer>);
      const marker1 = await screen.getByAltText("Marker");
      expect(marker1).toBeInTheDocument();
    }); 

    test("renders the marker info when clicked", async () => {
      const coords = { latitude: 40.7128, longitude: -74.006 };
      const dbMarkers = [
        { id: 1, name: "Marker 1", latitude: 42.7128, longitude: -74.006, type: "shop" },
      ];
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(dbMarkers),
      });
      render(<MapContainer center={[coords.latitude, coords.longitude]} zoom={13}>
              <LocationMarkers coords={coords} />
            </MapContainer>);
      
      const marker1 = await screen.getByAltText("Marker");
      fireEvent.click(marker1);
      const {getByText} = render(<InfoCard position={dbMarkers[0].name}></InfoCard>);
      expect(getByText("Marker 1")).toBeInTheDocument();
    }); 

    
});