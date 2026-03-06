import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCiUSxujT2CzvMR9ZDrr1UCM5Ya-h337c0",
    authDomain: "danielaguilar-8990b.firebaseapp.com",
    projectId: "danielaguilar-8990b",
    storageBucket: "danielaguilar-8990b.firebasestorage.app",
    messagingSenderId: "857537704032",
    appId: "1:857537704032:web:600fd0f3e5662f53295305",
    measurementId: "G-NB7E0PW2LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
