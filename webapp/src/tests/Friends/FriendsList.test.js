import FriendsList from "../../components/Friends/FriendsList";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  listFriends,
  getFriendInfo,
  deleteFriend,
  addNewFriend
} from "../../podsFunctions/PodsFunctions";
import React from "react";

//change the webId to mine that has no friends
jest.mock("@inrupt/solid-ui-react", () => ({
  useSession: () => ({
    session: {
      info: {
        webId: "https://ferjota.inrupt.net/profile/card#me",
      },
    },
  }),
}));

jest.mock("../../podsFunctions/PodsFunctions", () => ({
  listFriends: jest.fn(),
  getFriendInfo: jest.fn(),
  deleteFriend: jest.fn(),
  addNewFriend: jest.fn(),
}));

describe("FriendsList", () => {
  test("renders FriendsList component and it's calls", async () => {
    listFriends.mockResolvedValue(["friend1"]);
    getFriendInfo.mockResolvedValue({ name: "Friend1" });

    render(<FriendsList handleLoad={(r) => r} />); // Render the FriendsList component

    await waitFor(() => expect(listFriends).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getFriendInfo).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(deleteFriend).toHaveBeenCalledTimes(0));

    expect(screen.getByText("Friend1")).toBeInTheDocument();
  });

  test("renders add friend form", async () => {
    listFriends.mockResolvedValue(["friend1"]);
    getFriendInfo.mockResolvedValue({ name: "Friend1" });
    const { getByText } = render(<FriendsList handleLoad={(r) => r} />);

    await waitFor(() =>
      expect(getByText("Enter friend webId")).toBeInTheDocument()
    );
  });

  test("submits add friend form and resets input", async () => {
    listFriends.mockResolvedValue(["friend1"]);
    getFriendInfo.mockResolvedValue({ name: "Friend1" });
    const { getByLabelText, getByRole } = render(
      <FriendsList close={() => {}} handleLoad={() => {}} handleMarkersload={() => {}} />
    );

    fireEvent.change(getByLabelText("Enter friend webId"), { target: { value: "webId3" } });
    fireEvent.click(getByRole("button", { name: "Add" })); 

    expect(addNewFriend).toHaveBeenCalledTimes(1);
  });
 
  test("doesn't submit invalid add friend form", async () => {
    listFriends.mockResolvedValue(["friend1"]);
    getFriendInfo.mockResolvedValue({ name: "Friend1" });
    const { getByLabelText, getByRole, queryAllByRole } = render(
      <FriendsList close={() => {}} handleLoad={() => {}} handleMarkersload={() => {}} />
    );

    fireEvent.click(getByRole("button", { name: "Add" }));

    waitFor(() => expect(queryAllByRole("article")).toHaveLength(2));
  });

});
