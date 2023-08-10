// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXNYweFNNdLel578edbq1p8HbvjlDBoAk",
    authDomain: "twitter-clone-6630d.firebaseapp.com",
    projectId: "twitter-clone-6630d",
    storageBucket: "twitter-clone-6630d.appspot.com",
    messagingSenderId: "729519758175",
    appId: "1:729519758175:web:409e3fab5b821b85d134ea",
    measurementId: "G-J7DFWBNV5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;