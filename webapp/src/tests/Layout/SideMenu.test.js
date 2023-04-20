import {render} from "../../setupTests";
import SideMenu from "../../components/layout/SideMenu";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import {screen, waitFor, fireEvent} from '@testing-library/react';
import UserSessionContext from "../../store/session-context";

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

  test('renders loading spinner when option is "userPods" and markers are not loaded yet', () => {
    const {container}= render(<SideMenu option="userPods" />);
    const element = container.getElementsByClassName('spinner')[0];
    expect(element).toBeInTheDocument(); 
  });

  test('renders no markers message when option is "userPods" and no markers are available', async () => {
    render(<SideMenu option="userPods" loadedUserPods={true} markers={[]} />);
    await waitFor(() => expect(screen.getByText('No markers found')).toBeInTheDocument());
  });

  test('renders PodCreateForm component when option is "create"', () => {
    const {getByText}= render(<SideMenu option="create" />);
    expect(getByText('Create location')).toBeInTheDocument(); 
  });
  
  test('renders no markers message when option is "read" and no markers are available',async () => {
    const {container} = render(<SideMenu option="read" />);

    const element = container.getElementsByClassName('spinner')[0];
    expect(element).toBeInTheDocument(); 
    
    await waitFor(() => expect(screen.getByText('No markers found')).toBeInTheDocument());
  });
/*
  test("loads markers of friends when 'read' option is selected", async () => {
    const { findByTestId, container } = render(<SideMenu />);
    container = container.querySelectorAll(".read")[0];

    fireEvent.click(container);

    const loadingElement = await findByTestId("loading-spinner");
    expect(loadingElement).toBeInTheDocument();

    const markerCardElements = await findByTestId("marker-card");
    expect(markerCardElements.length).toBeGreaterThan(0);
  });*/

    /*test("The side menu is rendered in Engish by default and it should set loadedUserPods to true", async() => {
        //i18n.changeLanguage("en");
        //const {getByText} = render (<SideMenu/>)
        const handleMarkers = jest.fn();
        const ctx = { handleMarkers };
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
          json: () => [{ id: '123', name: 'Marker' }],
        });
        render(<SideMenu />, { wrapper: ({ children }) => <UserSessionContext.Provider value={ctx}>{children}</UserSessionContext.Provider> });
        await screen.findByText('LoadingSpinner');
        expect(ctx.handleMarkers).toHaveBeenCalledWith([[{ id: '123', name: 'Marker' }]]);
        expect(screen.queryByText('MarkerCard')).toBeInTheDocument();
        expect(screen.queryByText('LoadingSpinner')).not.toBeInTheDocument();
        expect(screen.queryByText('Friend')).not.toBeInTheDocument(); 
    })*/

})