import LocationMarkers from "../../components/Map/LocateMarkers";
import {render} from "../../setupTests";
import {screen, fireEvent, waitFor} from '@testing-library/react';
import i18n from "i18next";
import { MapContainer } from "react-leaflet";

const fakeSession = {
    info: {
      webId: 'https://example.com/profile#me'
    }
  };

describe("LocateMarker", () => {

    test("renders LocationMarkers component without crashing", () => {
        render(<LocationMarkers coords={{ latitude: 40, longitude: -73 }} />);
    });

    test("displays a marker on the map", () => { 
        render(
        <MapContainer center={[40, -73]} zoom={13}>
            <LocationMarkers coords={{ latitude: 40, longitude: -73 }} />
        </MapContainer>
        );
        const marker = document.querySelector(".leaflet-marker-icon");
        expect(marker).toBeInTheDocument();
    });
});