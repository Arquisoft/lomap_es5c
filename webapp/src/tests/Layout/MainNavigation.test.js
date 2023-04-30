import { getByRole, render, fireEvent } from "@testing-library/react";
import MainNavigation from "../../components/layout/MainNavigation";
import i18n from "i18next";

import defaultImage from "../../images/default_user.png";

describe("MainNavigation", () => {
  test("The main navigation bar is rendered", async () => {
    const { getByText } = render(<MainNavigation />);
    expect(getByText("LoMap")).toBeInTheDocument();
  });

  test("displays the correct menu items", () => {
    const { getByText } = render(<MainNavigation />);
    expect(getByText("HOME")).toBeInTheDocument();
    expect(getByText("ABOUT")).toBeInTheDocument();
  });

  test("displays the button of language spanish", () => {
    const { getByAltText } = render(<MainNavigation />);
    const spanishButton = getByAltText("Español");
    expect(spanishButton).toBeInTheDocument();
    fireEvent.click(spanishButton);

    expect(i18n.language).toBe("es");
  });

  test("displays the button of language english", () => {
    const { getByAltText } = render(<MainNavigation />);
    const englishButton = getByAltText("English");

    expect(englishButton).toBeInTheDocument();

    fireEvent.click(englishButton);

    expect(i18n.language).toBe("en");
  });

  test("renders the user's image when isLoggedIn is true", async () => {
    const userImage = defaultImage;
    const getFriendInfoMock = jest
      .fn()
      .mockResolvedValueOnce({ imageUrl: userImage });
    const session = { info: { webId: "https://example.com/user" } };
    const { getByAltText } = render(
      <MainNavigation
        isLoggedIn={true}
        session={session}
        getFriendInfo={getFriendInfoMock}
      />
    );
    const userImageElement = await getByAltText("userImage");
    expect(userImageElement).toBeInTheDocument();
    // expect(userImageElement).toHaveAttribute("src", userImage);
  });
});
