// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

//buyer or seller
const buyer = document.getElementById("buyer");
const seller = document.getElementById("seller");
const type = document.getElementById("userType");
var userType = "Buyer";
seller.style.color = "#024e1b";

type.addEventListener("click", (event) => {
  if (userType == "Buyer") {
    userType = "Seller";
    buyer.style.color = "#024e1b";
    seller.style.color = "white";
  } else {
    userType = "Buyer";
    seller.style.color = "#024e1b";
    buyer.style.color = "white";
  }
});

const signUp = document.getElementById("spin1");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const fullName = document.getElementById("fullname").value;
  const password = document.getElementById("mpassword").value;
  const cpassword = document.getElementById("cpassword").value;
  if (password == cpassword) {
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userType);
        const userData = {
          email: email,
          name: fullName,
          type: userType,
        };
        alert("Account created successfully");
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = "./index.html";
          })
          .catch((error) => {
            console.error("error writing document", error);
            alert(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if ((errorCode = "auth/email-already-in-use")) {
          alert("email address already exists");
        } else {
          alert("unable to create user");
        }
        alert(errorCode);
      });
  } else {
    alert("Password and confirm password does not match!!");
  }
});
