import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAvJC-PVpXWNt1v0rvT6XxvPAXAzLDZO-Y",
    authDomain: "planhub-a3fdd.firebaseapp.com",
    projectId: "planhub-a3fdd",
    storageBucket: "planhub-a3fdd.appspot.com",
    messagingSenderId: "367199388919",
    appId: "1:367199388919:web:d5923d5cf7e97c6a72fff2"
};

firebase.initializeApp(firebaseConfig);

// init services to interact with Firestore db
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp }