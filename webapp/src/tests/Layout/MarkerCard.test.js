import { fireEvent} from "@testing-library/react";
import MarkerCard from "../../components/layout/podsCards/MarkerCard";
import {render} from "../../setupTests";

describe("MarkerCard", () => {

    const marker = {
        title: "Test Marker",
        description: "Test Description",
        id: "12345",
        category: "Test Category",
        coords: {
            lat: 33.333,
            lng: -33.333,
        },
        score: [
            { score: 3 },
            { score: 4 },
            { score: 5 },
        ],
        rating: 4.0,
        comments: [ 
            {   author: "Tester",
                comment: "Test comment 1",
                date: "2023-04-12",
            },
            {
                author: "Tester2",
                comment: "Test comment 2",
                date: "2022-06-13",
            },
        ],
        pictures: [],
    };

    const mockSession = {
        info: "user1",
      };
    
    const mockHandleAddComment = jest.fn();
    const mockNeedsUpdate = jest.fn();

    beforeEach(() => {
    jest.clearAllMocks();
    });

    test("The marker card is rendered", async () => {
        const {getByText} = render(<MarkerCard marker={marker} session={{session: mockSession}}/>)
        expect(getByText("Test Marker")).toBeInTheDocument();
        expect(getByText("Test Description")).toBeInTheDocument();
        expect(getByText("Rating:")).toBeInTheDocument();



        expect(getByText("Comment")).toBeInTheDocument();

        expect(getByText("Score")).toBeInTheDocument();
        
    });

    test("The marker card latitude and longitude is rendered correctly", async () => {
        const {getByText} = render(<MarkerCard marker={marker}/>)
        expect(getByText("Latitude: 33.333")).toBeInTheDocument();
        expect(getByText("Longitude: -33.333")).toBeInTheDocument();      
    });

    test("The marker card comment is rendered correctly", async () => {
        const {getByText, getByTestId} = render(<MarkerCard marker={marker}/>)
        const commentTextArea = getByTestId("commentTextArea");

        fireEvent.change(commentTextArea, {target: {value:"Test comment"}});
        
        expect(getByText("Test comment")).toBeInTheDocument();
    });

    test("The marker card comment section is rendered correctly", async () => {
        const {getByText} = render(<MarkerCard marker={marker}/>)
        
        expect(getByText("Test comment 1")).toBeInTheDocument();
        expect(getByText("By: Tester on Wed Apr 12 2023")).toBeInTheDocument();

        expect(getByText("Test comment 2")).toBeInTheDocument();
        expect(getByText("By: Tester2 on Mon Jun 13 2022")).toBeInTheDocument();
    });
});

