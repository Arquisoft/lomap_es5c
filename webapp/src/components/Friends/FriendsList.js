import React, { useEffect, useState } from "react";
import {
  listFriends,
  getFriendInfo,
  deleteFriend,
  addNewFriend,
} from "../../podsFunctions/PodsFunctions";
import { useSession } from "@inrupt/solid-ui-react";
import { useTranslation } from "react-i18next";

import { Button } from "react-bootstrap";

import useInput from "../../hooks/use-input";

import defaultImage from "../../images/default_user.png";

const FriendsList = ({ close, handleLoad, handleMarkersload }) => {
  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  const [friendsWebIds, setFriendsWebIds] = useState([]);

  let formIsValid = false;

  const {
    value: enteredFriendWebId,
    isValid: validFriendWebId,
    valueChangeHandler: friendWebIdChangeHandler,
    reset: resetFriendWebIdInput,
  } = useInput((value) => value.trim() !== "");

  const getFriendsWebIds = async () => {
    setFriendsWebIds([]);

    var auxFriends = await listFriends(webId);

    auxFriends.map(async (friend) => {
      var friendData = await getFriendInfo(friend, session);
      setFriendsWebIds((prevValue) => [
        ...prevValue,
        {
          friend,
          friendData,
        },
      ]);
    });

    handleLoad(true);
  };

  const handleDeleteFriend = async (friendWebId) => {
    await deleteFriend(webId, session, friendWebId);
    getFriendsWebIds().catch((error) => {
      console.log(error);
    });
    handleMarkersload(false);
  };

  if (validFriendWebId) formIsValid = true;

  const addFriendHandler = async (event) => {
    event.preventDefault();
    // Check if the input is valid
    if (!validFriendWebId) {
      return;
    }

    handleLoad(false);
    handleMarkersload(false);

    // Add the new friend
    var exit = await addNewFriend(webId, session, enteredFriendWebId);

    if (exit) {
      getFriendsWebIds().catch((error) => {
        console.log(error);
      });
    } else {
      alert("Friend not added");
    }
    // Reset the input
    resetFriendWebIdInput();
  };

  useEffect(() => {
    getFriendsWebIds().catch((error) => {
      console.log(error);
    });
  }, []);

  const [t] = useTranslation("translation");

  let headerStyle =
    window.localStorage.getItem("themeStyle") === "dark" ? "#fff " : "#000 ";

  return (
    <>
      <div className="d-flex mx-2 justify-content-center">
        <h3 style={{ color: headerStyle }}>{t("FriendsList.add")}</h3>
      </div>
      <div className="my-2 mx-2" style={{ width: "95%" }}>
        <div className="card my-2">
          <div className="form-group mx-2 my-2">
            <form onSubmit={addFriendHandler}>
              <label htmlFor="inputFriendWebId">{t("FriendsList.enter")}</label>
              <input
                type="text"
                className="form-control"
                id="inputFriendWebId"
                aria-describedby="friendWebIdHelp"
                placeholder="webId"
                onChange={friendWebIdChangeHandler}
              />
              <Button
                type="submit"
                className={
                  formIsValid ? "btn-btn-primary" : "btn btn-secondary"
                }
                disabled={!formIsValid}
              >
                {t("FriendsList.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex mx-2 justify-content-center">
        <h3 style={{ color: headerStyle }}>{t("FriendsList.list")}</h3>
      </div>
      <div className="my-2 mx-2" style={{ width: "95%" }}>
        {friendsWebIds.map((friend, i) => {
          return (
            <div key={i} className="card mb-2">
              <div className="d-flex mx-2 my-2 align-items-center">
                {friend.friendData.imageUrl !== null &&
                friend.friendData.imageUrl !== undefined ? (
                  <img
                    src={friend.friendData.imageUrl}
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "6em",
                    }}
                  ></img>
                ) : (
                  <img
                    src={defaultImage}
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "6em",
                    }}
                  ></img>
                )}
                <div className="d-flex justify-content-start mx-2 mb-2 ">
                  <p
                    className="card-title"
                    style={{ fontSize: "1.175rem", marginBottom: 0 }}
                  >
                    {friend.friendData.name}
                  </p>
                </div>
                <div className="d-flex w-100 align-items-center justify-content-end mx-2">
                  <button
                    className="btn btn-danger btn-sm rounded-10"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    style={{ minWidth: "40px", minHeight: "40px" }}
                    onClick={() => {
                      handleDeleteFriend(friend.friend).catch((error) => {
                        console.log(error);
                      });
                    }}
                  >
                    <i className="fa fa-trash" style={{ fontSize: "20px" }}></i>
                  </button>{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FriendsList;
