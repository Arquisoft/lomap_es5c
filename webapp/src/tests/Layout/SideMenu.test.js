import {render} from "../../setupTests";
import SideMenu from "../../components/layout/SideMenu";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import {screen} from '@testing-library/react';
import UserSessionContext from "../../store/session-context";
import React from 'react';

//needed to load the podcreateform
jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
      session: {
        info: {
          webId: "https://iimxinnn.inrupt.net/profile/card#me",
        },
      },
    }),
  }));

describe("SideMenu", () => {
    test("The side menu is rendered in Engish by default and it should set loadedUserPods to true", async() => {
        //i18n.changeLanguage("en");
        //const {getByText} = render (<SideMenu/>)
        /* const handleMarkers = jest.fn();
        const ctx = { handleMarkers };
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
          json: () => [{ id: '123', name: 'Marker' }],
        });
        render(<SideMenu />, { wrapper: ({ children }) => <UserSessionContext.Provider value={ctx}>{children}</UserSessionContext.Provider> });
        await screen.findByText('LoadingSpinner');
        expect(ctx.handleMarkers).toHaveBeenCalledWith([[{ id: '123', name: 'Marker' }]]);
        expect(screen.queryByText('MarkerCard')).toBeInTheDocument();
        expect(screen.queryByText('LoadingSpinner')).not.toBeInTheDocument();
        expect(screen.queryByText('Friend')).not.toBeInTheDocument(); */
    })
})