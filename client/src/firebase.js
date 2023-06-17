// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore, setDoc, doc, getDoc, collection,addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcFK4cNNnRW0f4IHBxi8GXALfbLtMKlBQ",
  authDomain: "final-project-38a4b.firebaseapp.com",
  projectId: "final-project-38a4b",
  storageBucket: "final-project-38a4b.appspot.com",
  messagingSenderId: "36712329663",
  appId: "1:36712329663:web:4b397c6581ad0d6a50b10a"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(Firebase);

// export const db = getFirestore(Firebase);