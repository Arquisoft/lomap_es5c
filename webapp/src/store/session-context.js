import React, { createContext, useEffect, useState } from "react";

import { useSession } from "@inrupt/solid-ui-react/dist";

const UserSessionContext = createContext({
  session: {},
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const UserSessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useSession();

  //We have logged in
  session.onLogin(() => {
    setIsLoggedIn(true);
  });

  //We have logged out
  session.onLogout(() => {
    setIsLoggedIn(false);
  });

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("isLoggedIn"));
    // console.log("UserSessionContext: ", isLoggedIn);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("isLoggedIn", isLoggedIn);
    // console.log("UserSessionContext: ", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <UserSessionContext.Provider
      value={{
        session: session,
        isLoggedIn: isLoggedIn,
        onLogin: session.onLogin,
        onLogout: session.onLogout,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionContext;
