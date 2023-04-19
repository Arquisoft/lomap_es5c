// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyB-gps4D8rZbSIgwycV9PZqb2Wj6_uBCnU",
	authDomain: "lomap5c.firebaseapp.com",
	projectId: "lomap5c",
	storageBucket: "lomap5c.appspot.com",
	messagingSenderId: "129146136894",
	appId: "1:129146136894:web:04f5302b23129e03fba46f",
	measurementId: "G-QVG7LYSC56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage(app);

// Obtain the url of locations
const LOCATIONS_BUCKET = `gs://${firebaseConfig.storageBucket}/locations`;

const locationsRef = ref(storage, LOCATIONS_BUCKET);

export {
	app,
	storage,
	locationsRef,
	getDownloadURL,
	uploadBytes,
	ref,
	LOCATIONS_BUCKET,
};
