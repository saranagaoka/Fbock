import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCG-QbO95EFJFHjVxd-gJcWjztav-RAdps",
  authDomain: "fbock-913e3.firebaseapp.com",
  projectId: "fbock-913e3",
  storageBucket: "fbock-913e3.appspot.com",
  messagingSenderId: "782295629717",
  appId: "1:782295629717:web:24a5ad23e3503e1125809c",
  measurementId: "G-38LN5FKY22",
};

// const storageRef = firebase.storage().ref();

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const storage = getStorage(firebaseApp, "gs://my-custom-bucket");

export const storage = getStorage();
export { db, auth };
