import {
	overwriteFile,
	getSolidDataset,
	getThing,
	getUrlAll,
	getFile,
	saveFileInContainer,
	//For acl permissions
	getSolidDatasetWithAcl,
	hasResourceAcl,
	hasFallbackAcl,
	hasAccessibleAcl,
	createAcl,
	createAclFromFallbackAcl,
	getResourceAcl,
	setAgentResourceAccess,
	saveAclFor,
} from "@inrupt/solid-client";

import { FOAF } from "@inrupt/lit-generated-vocab-common";

//Function that creates the file and saves it to the pod
async function createPlaces(file, path, session) {
	try {
		let savedFile = await saveFileInContainer(path, file, {
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
	var places = {
		markers: [],
	};

	const blob = new Blob([JSON.stringify(places, null, 2)], {
		type: "application/json",
	});

	var file = new File([blob], "places.json", { type: blob.type });
	return file;
}

//Function that creates the file where places will be stored
async function createNewPlacesFile(podUrl, session, marker) {
	//Create the file
	const file = await createFile();
	//We create the file on path /private/ inside user's pod
	const path = podUrl.replace("places.json", "");
	//Save the file
	await createPlaces(file, path, session);
	//Add the first marker
	addNewMarker(file, podUrl, session, marker);
}

//Function that checks if places.json file exists
async function checkIfPlacesFileExists(podUrl, session, marker) {
	try {
		//file exists
		let file = await getFile(podUrl, { fetch: session.fetch });
		addNewMarker(file, podUrl, session, marker);
	} catch (error) {
		//file doesn't exist
		createNewPlacesFile(podUrl, session, marker);
	}
}

//Function that obtains a complete list of friends of the user pod
async function listFriends(webId) {
	// Get the Solid dataset of the profile
	const profileDataset = await getSolidDataset(webId);

	const thing = getThing(profileDataset, webId);

	// Get all the Things (resources) in the dataset that have the "knows" property
	const friends = getUrlAll(thing, FOAF.knows);

	return friends;
}

//Funtion that updates the existing file of places on the user's pod
async function updatePlacesFile(newFile, podUrl, session) {
	try {
		var overwrittenFile = await overwriteFile(podUrl, newFile, {
			contentType: newFile.type,
			fetch: session.fetch,
		});
		return true; //marker was inserted, so we say it to the frontend
	} catch (error) {
		console.log(error);
		return false; //marker was not inserted
	}
}

//Function that adds a new marker to the pod
async function addNewMarker(file, podUrl, session, marker) {
	let jsonMarkers = JSON.parse(await file.text());
	jsonMarkers.markers.push(marker);

	const blob = new Blob([JSON.stringify(jsonMarkers, null, 2)], {
		type: "application/json",
	});

	var newFile = new File([blob], "places.json", { type: blob.type });

	return updatePlacesFile(newFile, podUrl, session); //returns true if everything was ok or false if there was an error
}

//Function that returns the file as JSON parsed
async function getPlacesFileAsJSON(podUrl, session) {
	try {
		let file = await getFile(podUrl, { fetch: session.fetch });
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
	webId
) {
	//We create the new place in JSON format
	const marker = {
		name: name,
		description: description,
		lat: coords[0].lat,
		lng: coords[0].lng,
	};

	//Check if is a new user or not -> creates a new places file if it is new OR adds the marker if exists
	await checkIfPlacesFileExists(podUrl, session, marker);

	createFriendsFolder(listFriends(webId), webId, session);
}

async function createFriendsFolder(friends, webId, session) {
	const folderUrl = webId.replace("/profile/card#me", "/justforfriends/");
	const myDatasetWithAcl = await getSolidDatasetWithAcl(folderUrl, {
		fetch: session.fetch,
	});

	// Obtain the SolidDataset's own ACL, if available,
	// or initialise a new one, if possible:
	let resourceAcl;
	if (!hasResourceAcl(myDatasetWithAcl)) {
		if (!hasAccessibleAcl(myDatasetWithAcl)) {
			throw new Error(
				"The current user does not have permission to change access rights to this Resource."
			);
		}
		if (!hasFallbackAcl(myDatasetWithAcl)) {
			throw new Error(
				"The current user does not have permission to see who currently has access to this Resource."
			);
			// Alternatively, initialise a new empty ACL as follows,
			// but be aware that if you do not give someone Control access,
			// **nobody will ever be able to change Access permissions in the future**:
			// resourceAcl = createAcl(myDatasetWithAcl);
		}
		resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
	} else {
		resourceAcl = getResourceAcl(myDatasetWithAcl);
	}

	// Give someone Control access to the given Resource:
	const updatedAcl = setAgentResourceAccess(
		resourceAcl,
		"https://arias.inrupt.net/profile/card#me",
		{ read: true, append: false, write: false, control: false } //just read permissions
	);

	// Now save the ACL:
	await saveAclFor(myDatasetWithAcl, updatedAcl, { fetch: session.fetch });
	console.log("worked!");
}
