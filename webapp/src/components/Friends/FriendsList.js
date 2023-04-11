import React, { useEffect, useState } from "react";
import {
  listFriends,
  getFriendInfo,
  deleteFriend,
} from "../Pods/PodsFunctions";
import { useSession } from "@inrupt/solid-ui-react";
import {useTranslation} from "react-i18next"

const FriendsList = ({ close, handleLoad }) => {
  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  const [friendsWebIds, setFriendsWebIds] = useState([]);

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
    getFriendsWebIds();
  };

  useEffect(() => {
    getFriendsWebIds();
  }, []);

  const[t, i18n] = useTranslation("translation");

  let headerStyle =
    window.localStorage.getItem("themeStyle") === "dark" ? "#fff " : "#000 ";
  
  return (
    <>
      <div className="d-flex mx-2 justify-content-center">
        <h3 style={{ color: headerStyle }}>{t("FriendsList.list")}</h3>
      </div>
      <div className="my-2 mx-2" style={{ width: "95%" }}>
        {friendsWebIds.map((friend, i) => {
          return (
            <div key={i} className="card mb-2">
              <div className="d-flex mx-2 my-2 align-items-center">
                {friend.friendData.imageUrl != null ||
                friend.friendData.imageUrl != undefined ? (
                  <img
                    src={friend.friendData.imageUrl}
                    style={{ maxWidth: "125px", borderRadius: "10px" }}
                  ></img>
                ) : (
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    style={{ maxWidth: "100px", borderRadius: "10px" }}
                  ></img>
                )}
                <div className="d-flex w-100 align-items-center justify-content-end mx-2">
                  <button
                    className="btn btn-danger btn-sm rounded-10"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    style={{ minWidth: "40px", minHeight: "40px" }}
                    onClick={() => {
                      handleDeleteFriend(friend.friend);
                    }}
                  >
                    <i className="fa fa-trash" style={{ fontSize: "20px" }}></i>
                  </button>{" "}
                </div>
              </div>
              <div className="d-flex justify-content-start mx-2 mb-2 ">
                <p
                  className="card-title"
                  style={{ fontSize: "1.175rem", marginBottom: 0 }}
                >
                  {friend.friendData.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FriendsList;
