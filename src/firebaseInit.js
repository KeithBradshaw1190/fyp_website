//import firebase from 'firebase'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/auth";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;