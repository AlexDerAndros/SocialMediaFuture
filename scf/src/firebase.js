// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo7LLVhYbxualvfwUwmfuHeXZqmN60SM8",
  authDomain: "socialmediafuture-12360.firebaseapp.com",
  projectId: "socialmediafuture-12360",
  storageBucket: "socialmediafuture-12360.firebasestorage.app",
  messagingSenderId: "395036525807",
  appId: "1:395036525807:web:aa221750bd5c8f6510c71a",
  measurementId: "G-G7VZF0WRXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)