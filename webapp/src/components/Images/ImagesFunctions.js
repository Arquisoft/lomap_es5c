import { LOCATIONS_BUCKET, storage } from "./firebase.config";

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { addPicture } from "../Pods/PodsFunctions";

//Function that uploads images to firebase storage and saves the url and the uploader user in the pod
export async function uploadImages(
  markerId,
  images,
  session,
  webId,
  //   callback,
  mapId = 1
) {
  try {
    console.log("uploadImages:", images);
    // const uploadPromises = images.map((image) => {
    const imgExtension = images.name.split(".").slice().pop();
    const imgId = Date.now();
    console.log("imgId:", imgId);
    console.log("before");
    console.log("test:", `${LOCATIONS_BUCKET}/${imgId}.${imgExtension}`);
    uploadBytes(
      ref(storage, `${LOCATIONS_BUCKET}/${imgId}.${imgExtension}`),
      images
    ).then((snapshot) => {
      console.log("after");
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        addPicture(markerId, downloadUrl, session, webId, mapId);
      });
    });
    // });
    // const savedPictures = await Promise.all(uploadPromises);
    // callback(savedPictures);
  } catch (err) {
    console.log(err);
  }
}
