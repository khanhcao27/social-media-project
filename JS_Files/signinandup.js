//////////////////////////////////////////////////////////////////////////// Import CHUNG

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

// Dùng DOM
let username_login = document.getElementById("username_input_login");
let password_login = document.getElementById("password_input_login");
let username_register = document.getElementById("username_input_register");
let password_register = document.getElementById("password_input_register");
let login_btn = document.getElementById("login_btn");
let register_btn = document.getElementById("register_btn");

//////////////////////////////////////////////////////// Đăng ký 1 tài khoản
register_btn.addEventListener("click", function () {
  let username = username_register.value;
  let password = password_register.value;

  createUserWithEmailAndPassword(auth, username, password) // Check xem cái user này tồn tại chưa
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        username: username,
        password: password,
      });

      alert("Tạo tài khoản thành công");
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMess = err.message;

      alert(errorMess);
    });
});

//////////////////////////////////////////////////////// Đăng nhập 1 tải khoản có sẵn
login_btn.addEventListener("click", function () {
  let username = username_login.value;
  let password = password_login.value;

  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      let date = new Date();
      update(ref(database, "users/" + user.uid), {
        lastLogin: date,
      });

      //   Đoạn này anh lưu 2 thông tin quan trong nhất của 1 user khi đăng nhập
      //   thành công đó là username và user uid
      localStorage.setItem("username_login", username);
      localStorage.setItem("password_login", password);
      localStorage.setItem("userUID_login", user.uid);

      // Sau khi đăng nhập thành công xong có thể sử chuyển đối sang 1 trang khác
      alert("Đăng nhập thành công");

      setTimeout(() => {
        // ở đây a chuyển sang trang home để làm mẫu CRUD cho các em
        window.location.href = "../HTML_Files/home.html";
      }, 2000);
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMess = err.message;

      alert(errorMess);
    });
});
