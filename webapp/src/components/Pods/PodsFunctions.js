import * as solid from "@inrupt/solid-client";

import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";

//Function that creates the file and saves it to the pod
async function createPlaces(file, path, session) {
	try {
		let savedFile = await solid.saveFileInContainer(path, file, {
			slug: file.name,
			contentType: file.type,
			fetch: session.fetch,
		});
	} catch (error) {
		console.log(error);
	}
}

//Function that instanciates a new JSON file
async function createFile() {
	var locations = {
		maps: [
			//maps of the user
			{
				id: 1,
				name: "default",
				locations: [
					//markers
				],
			},
		],
	};

	const blob = new Blob([JSON.stringify(locations, null, 2)], {
		type: "application/json",
	});

	var file = new File([blob], "locations.json", { type: blob.type });
	return file;
}

//Function that creates the file where places will be stored
async function createNewPlacesFile(podUrl, session, marker, mapId) {
	//Create the directory for friends
	await solid.createContainerAt(podUrl.replace("locations.json", ""), {
		fetch: session.fetch,
	});
	//Create the file
	const file = await createFile();
	//We create the file on path /private/ inside user's pod
	const path = podUrl.replace("locations.json", "");
	//Save the file
	await createPlaces(file, path, session);
	//Add the first marker
	return addNewMarker(file, podUrl, session, marker, mapId);
}

//Function that checks if locations.json file exists
async function checkIfPlacesFileExists(podUrl, session, marker, webId, mapId) {
	try {
		//file exists
		let file = await solid.getFile(podUrl, { fetch: session.fetch });
		await addNewMarker(file, podUrl, session, marker, mapId);
	} catch (error) {
		//file doesn't exist
		await createNewPlacesFile(podUrl, session, marker, mapId);
	}
}

//Function that obtains a complete list of friends of the user pod
export async function listFriends(webId) {
	// Get the Solid dataset of the profile
	const profileDataset = await solid.getSolidDataset(webId);

	const thing = solid.getThing(profileDataset, webId);

	// Get all the Things (resources) in the dataset that have the "knows" property
	const friends = solid.getUrlAll(thing, FOAF.knows);

	return friends;
}

//Funtion that updates the existing file of places on the user's pod
async function updatePlacesFile(newFile, podUrl, session) {
	try {
		var overwrittenFile = await solid.overwriteFile(podUrl, newFile, {
			contentType: newFile.type,
			fetch: session.fetch,
		});
		return true; //marker was inserted, so we say it to the frontend
	} catch (error) {
		console.log(error);
		return false; //marker was not inserted
	}
}

//Searches the position of the mark and returns it
function getMapValue(maps, mapId) {
	for (let i = 0; i < maps.length; i++) {
		if (maps[i].id == mapId) return i;
	}
	return -1;
}

//Function that adds a new marker to the pod
async function addNewMarker(file, podUrl, session, marker, mapId) {
	let jsonMarkers = JSON.parse(await file.text());

	const i = getMapValue(jsonMarkers.maps, mapId);

	jsonMarkers.maps[i].locations.push(marker);

	const blob = new Blob([JSON.stringify(jsonMarkers, null, 2)], {
		type: "application/json",
	});

	var newFile = new File([blob], "locations.json", { type: blob.type });

	return updatePlacesFile(newFile, podUrl, session); //returns true if everything was ok or false if there was an error
}

//Function that returns the file as JSON parsed
async function getPlacesFileAsJSON(podUrl, session) {
	try {
		let file = await solid.getFile(podUrl, { fetch: session.fetch });
		console.log("test");
		let jsonMarkers = JSON.parse(await file.text());
		return jsonMarkers;
	} catch (error) {
		return Error;
	}
}

//Function to save a new place into user's pod
export async function insertNewMarker(
	coords,
	name,
	description,
	podUrl,
	session,
	webId,
	category
) {
	//We create the new place in JSON format
	const marker = {
		id: Date.now(),
		name: name,
		category: category,
		latitude: coords.lat,
		longitude: coords.lng,
		description: description,
		comments: [], //comments that other users make on the marker
		reviewScores: [], //scores that other users give to the marker
		date: Date.now(),
	};

	//This is the map by default
	//Remove this if we implement multiple maps on the app
	const mapId = 1;

	//Check if is a new user or not -> creates a new places file if it is new OR adds the marker if exists
	return await checkIfPlacesFileExists(podUrl, session, marker, webId, mapId);
}

//Function that stablish permissions of the folder and the locations file
async function updatePermissions(session, webId) {
	await updatePermissionsOfFolder(session, webId);
	await updatePermissionsOfFile(session, webId);
}

async function givePermissionsToUser(friend, session, file, control) {
	let resourceAcl = solid.createAcl(file);

	const updatedAcl = solid.setAgentResourceAccess(resourceAcl, friend, {
		read: true,
		append: false,
		write: true,
		control: control,
	});

	await solid.saveAclFor(file, updatedAcl, { fetch: session.fetch });
}

//Function that modifies permissions of the locations file
async function updatePermissionsOfFile(session, webId) {
	const fileUrl = webId.replace(
		"/profile/card#me",
		"/justforfriends/locations.json"
	);
	//Get the friends of the user
	const friends = await listFriends(webId);
	try {
		let file = await solid.getFile(fileUrl, { fetch: session.fetch });
		givePermissionsToUser(webId, session, file, true); //give you permissions
		//Give your friends permissions
		for (var i in friends) {
			givePermissionsToUser(friends[i], session, file, false);
		}
	} catch (error) {
		console.log(error);
	}
}

//Function that modifies permissions only for friends
async function updatePermissionsOfFolder(session, webId) {
	const friends = await listFriends(webId);
	const folderUrl = webId.replace("/profile/card#me", "/justforfriends7/");
	const myDatasetWithAcl = await solid.getSolidDatasetWithAcl(folderUrl, {
		fetch: session.fetch,
	});

	// Obtain the SolidDataset's own ACL, if available,
	// or initialise a new one, if possible:
	let resourceAcl;
	if (!solid.hasResourceAcl(myDatasetWithAcl)) {
		if (!solid.hasAccessibleAcl(myDatasetWithAcl)) {
			throw new Error(
				"The current user does not have permission to change access rights to this Resource."
			);
		}
		if (!solid.hasFallbackAcl(myDatasetWithAcl)) {
			throw new Error(
				"The current user does not have permission to see who currently has access to this Resource."
			);
			// Alternatively, initialise a new empty ACL as follows,
			// but be aware that if you do not give someone Control access,
			// **nobody will ever be able to change Access permissions in the future**:
			// resourceAcl = createAcl(myDatasetWithAcl);
		}
		resourceAcl = solid.createAclFromFallbackAcl(myDatasetWithAcl);
	} else {
		resourceAcl = solid.getResourceAcl(myDatasetWithAcl);
	}

	// Give friends Control access to the given Resource:
	for (let i = 0; i < friends.length; i++) {
		const updatedAcl = solid.setAgentResourceAccess(
			resourceAcl,
			friends[i], //webId of a specific friend
			{ read: true, append: true, write: true, control: false } // permissions
		);

		// Now save the ACL:
		await solid.saveAclFor(myDatasetWithAcl, updatedAcl, {
			fetch: session.fetch,
		});
	}
	return true;
}

//Function that extracts all the locations added by a user of a concrete map
//If the extension of multiple maps is not implemented the default mapId is 1
export async function listLocationsOfAUser(webId, session, mapId = 1) {
	const podUrl = webId.replace(
		"/profile/card#me",
		"/justforfriends/locations.json"
	);
	console.log(podUrl);

	//We extract the file of the concrete user if exists
	const file = await getPlacesFileAsJSON(podUrl, session);
	//We extract the map that we want to show locations of it
	const i = getMapValue(file.maps, mapId);
	//We obtain locations of that specific map
	const locs = file.maps[i].locations;
	return locs;
}

//Function that returns in JSON the username, name, surname and image of a friend
export async function getFriendInfo(friendWebId, session) {
	try {
		const friendDataset = await solid.getSolidDataset(friendWebId, {
			fetch: session.fetch,
		});
		const friend = solid.getThing(friendDataset, friendWebId);
		const nameF = solid.getStringNoLocale(friend, FOAF.name.iri.value);
		const imageUrlF = solid.getUrl(friend, VCARD.hasPhoto.iri.value);
		const data = {
			name: nameF,
			imageUrl: imageUrlF,
		};
		return data;
	} catch (error) {
		console.log(error);
	}
}

//Function that adds a new review Score to an specific location
export async function addReviewScore(
	webId,
	session,
	score,
	idLocation,
	mapId = 1
) {
	if (score >= 0 && score <= 5) {
		const fileUrl = webId.replace(
			"/profile/card#me",
			"/justforfriends/locations.json"
		);
		let file = await solid.getFile(fileUrl, { fetch: session.fetch });
		let jsonMarkers = JSON.parse(await file.text());
		const x = getMapValue(jsonMarkers.maps, mapId);
		const locations = jsonMarkers.maps[x].locations;

		for (let i = 0; i < locations.length; i++) {
			if (locations[i].id == idLocation) {
				await modifyScoresContent(
					i,
					webId,
					session,
					score,
					jsonMarkers,
					x,
					fileUrl
				);
			}
		}
	} else {
		console.log("The score must be between 0 - 5");
	}
}

//Function that modifies the scores content of the user's pod adding a new score
async function modifyScoresContent(
	marker,
	webId,
	session,
	score,
	jsonMarkers,
	mapIdValue,
	podUrl
) {
	const newReviewScore = {
		author: webId,
		score: score,
		date: Date.now(),
	};
	jsonMarkers.maps[mapIdValue].locations[marker].reviewScores.push(
		newReviewScore
	);

	const blob = new Blob([JSON.stringify(jsonMarkers, null, 2)], {
		type: "application/json",
	});

	var newFile = new File([blob], "locations.json", { type: blob.type });

	return updatePlacesFile(newFile, podUrl, session); //returns true if everything was ok or false if there was an error
}

//Function that adds a new comment on a location that you specify
export async function addComment(
	webId,
	session,
	comment,
	idLocation,
	mapId = 1
) {
	const fileUrl = webId.replace(
		"/profile/card#me",
		"/justforfriends/locations.json"
	);
	let file = await solid.getFile(fileUrl, { fetch: session.fetch });
	let jsonMarkers = JSON.parse(await file.text());
	const x = getMapValue(jsonMarkers.maps, mapId);
	const locations = jsonMarkers.maps[x].locations;

	for (let i = 0; i < locations.length; i++) {
		if (locations[i].id == idLocation) {
			await modifyCommentsContent(
				i,
				webId,
				session,
				comment,
				jsonMarkers,
				x,
				fileUrl
			);
		}
	}
}

//Function that modifies the content of the user's pod adding a new comment
async function modifyCommentsContent(
	marker,
	webId,
	session,
	comment,
	jsonMarkers,
	mapIdValue,
	podUrl
) {
	const newComment = {
		author: webId,
		comment: comment,
		date: Date.now(),
	};
	jsonMarkers.maps[mapIdValue].locations[marker].comments.push(newComment);

	const blob = new Blob([JSON.stringify(jsonMarkers, null, 2)], {
		type: "application/json",
	});

	var newFile = new File([blob], "locations.json", { type: blob.type });

	return updatePlacesFile(newFile, podUrl, session); //returns true if everything was ok or false if there was an error
}

//Function that adds a new friend to the user's pod
async function addNewFriend(webId, session, friendWebId) {
	try {
		const friends = await listFriends(webId);
		//First check if the friend exists
		if (friends.some((friend) => friend === friendWebId)) {
			console.log("Friend already exists!");
		} else {
			// Get the Solid dataset of the profile
			let profileDataset = await solid.getSolidDataset(
				webId.replace("#me", "")
			);
			let thing = solid.getThing(profileDataset, webId);

			// Get all the Things (resources) in the dataset that have the "knows" property
			thing = solid.addUrl(thing, FOAF.knows, friendWebId);
			profileDataset = solid.setThing(profileDataset, thing);
			profileDataset = await solid.saveSolidDatasetAt(webId, profileDataset, {
				fetch: session.fetch,
			});
			console.log("New friend was added!");
			//We update the permissions of the folder where we will store the markers
			await updatePermissions(session, webId);
		}
	} catch (error) {
		console.log(error);
	}
}

//Function that deletes an existing friend of the user's pod
async function deleteFriend(webId, session, friendWebId) {
	try {
		const friends = await listFriends(webId);
		//First check if the friend exists
		if (friends.some((friend) => friend === friendWebId)) {
			// Get the Solid dataset of the profile
			let profileDataset = await solid.getSolidDataset(
				webId.replace("#me", "")
			);
			let thing = solid.getThing(profileDataset, webId);

			// Get all the Things (resources) in the dataset that have the "knows" property
			thing = solid.removeUrl(thing, FOAF.knows, friendWebId);
			profileDataset = solid.setThing(profileDataset, thing);
			profileDataset = await solid.saveSolidDatasetAt(webId, profileDataset, {
				fetch: session.fetch,
			});
			console.log("Friend was removed!");
			//We update the permissions of the folder where we will store the markers
			await updatePermissions(session, webId);
		} else {
			console.log("Friend doesn't exist!");
		}
	} catch (error) {
		console.log(error);
	}
}

//Function that filters user's pod by category
export async function filterByCategory(category, webId, session, mapId = 1) {
	let placesFiltered = [];
	//We get the locations file as a JSON
	const locationsMap = await listLocationsOfAUser(webId, session, mapId);
	//We filter the locations by category
	for (let i = 0; i < locationsMap.length; i++) {
		if (locationsMap[i].category == category) {
			placesFiltered.push(locationsMap[i]); //we add the location to the array
		}
	}

	return placesFiltered;
}
