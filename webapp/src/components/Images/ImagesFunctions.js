import { LOCATIONS_BUCKET, storage } from "./firebase.config";

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { addImage } from "../Pods/PodsFunctions";

export async function uploadImage(
	markerId,
	image,
	session,
	webId,
	mapId = 1,
	callback
) {
	const imgExtension = image.name.split(".").slice().pop();
	const imgId = randomId();

	try {
		uploadBytes(
			ref(storage, `${LOCATIONS_BUCKET}/${imgId}.${imgExtension}`),
			image
		).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((downloadUrl) => {
				console.log(downloadUrl);
				addPicture(mapId, markerId, downloadUrl, session, webId).then(
					(savedPicture) => {
						callback(savedPicture);
					}
				);
			});
		});
	} catch (err) {
		console.log(err);
	}
}
