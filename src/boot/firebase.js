// // Firebase v. 8

// // Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from 'firebase/app';
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // Add the Firebase products that you want to use
// import 'firebase/auth';
// import 'firebase/firestore';

// const firebaseConfig = {
// 	apiKey: 'AIzaSyCYlIjblMI-F0sDDd9ckIZGSAsyIKHm3zM',
// 	authDomain: 'tweeter-dc2bb.firebaseapp.com',
// 	projectId: 'tweeter-dc2bb',
// 	storageBucket: 'tweeter-dc2bb.appspot.com',
// 	messagingSenderId: '705587753765',
// 	appId: '1:705587753765:web:a2656e7fbbe527bc1960cc',
// };

// firebase.initializeApp(firebaseConfig);

// let db = firebase.firestore();

// export default db;

// ---------------------------------------------------------- //

// // Cynthia Heyman (using Firebase v.9):
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseApp = initializeApp({
// 	// config stuff here
// });

// let db = getFirestore();

// export default db;

// -------------------------------------------------------------- //

// Firebase v. 9

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCYlIjblMI-F0sDDd9ckIZGSAsyIKHm3zM',
	authDomain: 'tweeter-dc2bb.firebaseapp.com',
	projectId: 'tweeter-dc2bb',
	storageBucket: 'tweeter-dc2bb.appspot.com',
	messagingSenderId: '705587753765',
	appId: '1:705587753765:web:a2656e7fbbe527bc1960cc',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
	const citiesCol = collection(db, 'cities');
	const citySnapshot = await getDocs(citiesCol);
	const cityList = citySnapshot.docs.map((doc) => doc.data());
	return cityList;
}

export default db;
