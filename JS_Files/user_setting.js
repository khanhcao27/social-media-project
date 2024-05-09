// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as dbRefImage,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";
import {
  get,
  getDatabase,
  set,
  ref,
  onValue,
  update,
  remove,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhD79Fqj9ExJ8sgmAPbwITLstllqFxoFc",
  authDomain: "social-media-project-2024a.firebaseapp.com",
  databaseURL: "https://social-media-project-2024a-default-rtdb.firebaseio.com",
  projectId: "social-media-project-2024a",
  storageBucket: "social-media-project-2024a.appspot.com",
  messagingSenderId: "368532712658",
  appId: "1:368532712658:web:ab781bb70ef755ffa7510b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
 
var email = "...@gmail.com";
var password = "...";
 
function signIn() {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Sign In SuccessFul!");
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}
 
function showUserProfile1() {
    const user = firebase.auth().currentUser;
 
    if (user !== null) {
        user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
    }
}
 
// Method to update the password
function UpdatePassword() {
    const user = firebase.auth().currentUser;
    const newPassword = document.getElementById('newPassword').value;
 
    user.updatePassword(newPassword).then(() => {
        // Update successful.
 
        console.log('Update SuccessFul');
 
    }).catch((error) => {
        // An error occurred
        // ...
    });
}