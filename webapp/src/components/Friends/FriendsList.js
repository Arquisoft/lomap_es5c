import React, { useEffect, useState } from "react";
import { listFriends, getFriendInfo } from "../Pods/PodsFunctions";
import { useSession } from "@inrupt/solid-ui-react";

const FriendsList = ({ close }) => {
	const { session } = useSession(); // Hook for providing access to the session in the component
	const { webId } = session.info; // User's webId

	const [isLoaded, setIsLoaded] = useState(false);

	const [friendsWebIds, setFriendsWebIds] = useState([]);

	const [friends, setFriends] = useState([]);

	const getFriendsWebIds = async () => {
		setFriendsWebIds([]);
		setFriends([]);
		var auxFriends = await listFriends(webId);
		auxFriends.map((friend) => {
			setFriendsWebIds((prevValue) => [...prevValue, friend]);
			getFriendData(friend);
		});
	};

	const getFriendData = async (friendWebId) => {
		var friend = await getFriendInfo(friendWebId, session);
		setFriends((prevValue) => [...prevValue, friend]);
	};

	useEffect(() => {
		getFriendsWebIds();

		console.log(friends);
	}, []);

	return (
		<React.Fragment>
			<div className="d-flex justify-content-end mx-2 my-2">
				<button
					type="button"
					className="btn-close"
					style={{ fontSize: "1rem" }}
					aria-label="Close"
					// onClick={closeForm}
				></button>
			</div>
			<div className="mx-2">
				<h3>List of friends</h3>
			</div>
			<div className="my-2 mx-2" style={{ width: "95%" }}>
				{friends.map((friend, i) => {
					return (
						<div key={i} className="card mb-2">
							<div className="d-flex mx-2 my-2">
								{friend.imageUrl != null || friend.imageUrl != undefined ? (
									<img
										src={friend.imageUrl}
										style={{ maxWidth: "100px", borderRadius: "10px" }}
									></img>
								) : (
									<img
										src="https://www.w3schools.com/howto/img_avatar.png"
										style={{ maxWidth: "100px", borderRadius: "10px" }}
									></img>
								)}
								<p className="card-title mx-2" style={{ fontSize: "1.15rem" }}>
									{friend.name}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default FriendsList;
