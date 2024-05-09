// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Hiển thị tên người dùng vừa đăng nhập thành công ra giao diện,
// đoạn này phải lấy dữ liệu được lưu trong localStorage ở khúc đăng nhập ra
let username_login = localStorage.getItem("username_login");
let password_login = localStorage.getItem("password_login");
let userUID_login = localStorage.getItem("userUID_login");

if (username_login != "") {
  document.querySelector("#username_login").innerText = username_login;
  // document.querySelector("#userUID_login").innerText = userUID_login;
} else {
  document.querySelector("#username_login").innerText =
    "Chưa có ai đăng nhập rồi";
  document.querySelector("#userUID_login").innerText = "ID rỗng";
}

let logoutBtn = document.getElementById("logout");
console.log(logoutBtn);

logoutBtn.addEventListener("click", function () {
    localStorage.setItem("username_login", "");
    localStorage.setItem("userUID_login", "");
  
    location.reload();
    window.location.href = "../HTML_Files/signinandup.html";
  });