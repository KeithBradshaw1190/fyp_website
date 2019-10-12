import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
export const fb = firebase.initializeApp(firebaseConfig);