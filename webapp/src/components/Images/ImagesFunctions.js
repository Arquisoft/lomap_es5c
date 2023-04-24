import { LOCATIONS_BUCKET, storage } from "./firebase.config";

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { addPictures } from "../Pods/PodsFunctions";

//Function that uploads images to firebase storage and saves the url and the uploader user in the pod
export async function uploadImages(
	markerId,
	images,
	session,
	webId,
	mapId = 1
) {
	try {
		const promises = images.map((image) => {
			const imgExtension = image.name.split(".").slice().pop();
			const imgId = Date.now();
			const userName = webId.split(".")[0].replace("https://", "");
			return uploadBytes(
				ref(
					storage,
					`${LOCATIONS_BUCKET}/${userName}/${imgId}.${imgExtension}`
				),
				image
			).then((snapshot) => {
				return getDownloadURL(snapshot.ref);
			});
		});
		const urls = await Promise.all(promises);
		await addPictures(markerId, urls, session, webId, mapId);
	} catch (err) {
		console.log(err);
	}
}
