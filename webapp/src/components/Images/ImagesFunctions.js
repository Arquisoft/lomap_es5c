import { LOCATIONS_BUCKET, storage } from "./firebase.config";

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { addPicture } from "../Pods/PodsFunctions";

//Function that uploads images to firebase storage and saves the url and the uploader user in the pod
export async function uploadImages(
	markerId,
	images,
	session,
	webId,
	callback,
	mapId = 1
) {
	try {
		const uploadPromises = images.map((image) => {
			const imgExtension = image.name.split(".").slice().pop();
			const imgId = webId + "%$%" + Date.now();
			return uploadBytes(
				ref(storage, `${LOCATIONS_BUCKET}/${imgId}.${imgExtension}`),
				image
			).then((snapshot) => {
				return getDownloadURL(snapshot.ref).then((downloadUrl) => {
					return addPicture(markerId, downloadUrl, session, webId, mapId);
				});
			});
		});
		const savedPictures = await Promise.all(uploadPromises);
		callback(savedPictures);
	} catch (err) {
		console.log(err);
	}
}
