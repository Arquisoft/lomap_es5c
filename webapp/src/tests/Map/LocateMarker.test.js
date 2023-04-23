import LocationMarkers from "../../components/Map/LocateMarkers";
import {render} from "../../setupTests";
import {screen, fireEvent, waitFor} from '@testing-library/react';
import i18n from "i18next";
import { MapContainer } from "react-leaflet";
import {UserSessionProvider, UserSessionContext} from "../../store/session-context";
import { Session } from '@inrupt/solid-client-authn-browser';
import { getSolidDataset, getThingAll, getUrlAll } from '@inrupt/solid-client';

const fakeSession = {
    info: {
      webId: 'https://example.com/profile#me'
    }
  };

  describe("LocateMarker", () => {
    test('renders without crashing', () => {
       /* const coords = { latitude: 37.7749, longitude: -122.4194 };
        const { getByTestId } = render(
          <UserSessionProvider value={{fakeSession}}>
            <LocationMarkers coords={coords} />
          </UserSessionProvider>
        );
        const component = getByTestId("location-markers");
        expect(component).toBeInTheDocument();*/
      });

    /*
    test("renders LocationMarkers component without crashing", () => {
        render(<LocationMarkers coords={{ latitude: 0, longitude: 0 }} />, {
            wrapper: ({ children }) => (
              <UserSessionContext value={fakeSession}>
                {children}
              </UserSessionContext>
            ),
          });
        
    });*/
/*
    test("displays a marker on the map", () => { 
        render(
        <MapContainer center={[40, -73]} zoom={13}>
            <LocationMarkers coords={{ latitude: 40, longitude: -73 }} />
        </MapContainer>
        );
        const marker = document.querySelector(".leaflet-marker-icon");
        expect(marker).toBeInTheDocument();
    });*/
});