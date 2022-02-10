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

export default db;
