// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBxNZkaEXv7R6hxJqGMpalVK3tO_QtmxA",
  authDomain: "todoapp-1779c.firebaseapp.com",
  projectId: "todoapp-1779c",
  storageBucket: "todoapp-1779c.appspot.com",
  messagingSenderId: "1017634396876",
  appId: "1:1017634396876:web:c5c26dffd16b455a52c069",
  measurementId: "G-75TDWWYDP9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export { db, auth };
