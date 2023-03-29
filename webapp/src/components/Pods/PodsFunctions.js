import {
	overwriteFile,
	getSolidDataset,
	getThing,
	getUrlAll,
	getFile,
	saveFileInContainer,
	createContainerAt,
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
	await createContainerAt(podUrl.replace("locations.json", ""), {
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
		let file = await getFile(podUrl, { fetch: session.fetch });
		await addNewMarker(file, podUrl, session, marker, mapId);
		//We update the permissions of the folder where we will store the markers
		return await updatePermissions(session, webId);
	} catch (error) {
		//file doesn't exist
		await createNewPlacesFile(podUrl, session, marker, mapId);
		//We update the permissions of the folder where we will store the markers
		return await updatePermissions(session, webId);
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

	const mapId = 1;

	//Check if is a new user or not -> creates a new places file if it is new OR adds the marker if exists
	return await checkIfPlacesFileExists(podUrl, session, marker, webId, mapId);
}

//Function that creates a directory only for friends
async function updatePermissions(session, webId) {
	const friends = await listFriends(webId);
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

	// Give friends Control access to the given Resource:
	for (let i = 0; i < friends.length; i++) {
		const updatedAcl = setAgentResourceAccess(
			resourceAcl,
			friends[i], //webId of a specific friend
			{ read: true, append: true, write: true, control: false } // permissions
		);

		// Now save the ACL:
		await saveAclFor(myDatasetWithAcl, updatedAcl, { fetch: session.fetch });
	}return true;
}
