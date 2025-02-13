// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

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

const signIn = document.getElementById("spin");
signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("rpassword").value;
  const auth = getAuth();
  //console.log(email, password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login is successfull");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        alert("Incorrect Email or Password");
      } else {
        alert("Account does not exists...");
      }
    });
});
