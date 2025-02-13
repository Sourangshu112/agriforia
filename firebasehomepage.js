// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzYnlklqYjoh-n1q-bshcW4O6EE1g8fyA",
  authDomain: "logindatabase-e9253.firebaseapp.com",
  projectId: "logindatabase-e9253",
  storageBucket: "logindatabase-e9253.firebasestorage.app",
  messagingSenderId: "93347268514",
  appId: "1:93347268514:web:85e515e5412eee433794fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          /*Fname = userData.name;
          console.log("hello");
          console.log(Fname);*/
          document.getElementById("name").innerText =
            "Wellcome, " + userData.name;
        } else {
          console.log("no document found");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Error getting document");
      });
  } else {
    console.log("UserId not found in local storage");
  }
});
