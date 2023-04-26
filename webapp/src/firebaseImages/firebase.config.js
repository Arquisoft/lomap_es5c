// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
