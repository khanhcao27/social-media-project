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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth();

let user_name_input = document.getElementById("user_name");
let user_age_input = document.getElementById("user_age");
let user_favor_input = document.getElementById("user_favor");
let add_user_btn = document.getElementById("add_user");
let read_data = document.getElementById("read_data");
let update_btn = document.getElementById("update");
let delete_btn = document.getElementById("delete");
let All_Posts_Container = document.querySelector(".All_Posts_Container");
let useracc = document.getElementById("useracc");


// Hiển thị tên người dùng vừa đăng nhập thành công ra giao diện, 
// đoạn này phải lấy dữ liệu được lưu trong localStorage ở khúc đăng nhập ra
let username_login = localStorage.getItem("username_login");
let userUID_login = localStorage.getItem("userUID_login");

if (username_login != "") {
  document.querySelector("#username_login").innerText = username_login;
  useracc.innerText = username_login
  // document.querySelector("#userUID_login").innerText = userUID_login;
} else if (username_login == "") {
  document.querySelector("#username_login").innerText =
    "Chưa có ai đăng nhập rùi";

  document.querySelector("#userUID_login").innerText = "ID rỗng";
}


// Nút đăng xuất
/**
 * Ở đoạn này sau khi đăng xuấ
 *
 */
let logout_btn = document.querySelector("#logout");
logout_btn.addEventListener("click", function () {
  localStorage.setItem("username_login", "");
  localStorage.setItem("userUID_login", "");
  window.location.href = "../index.html";
});


function renderAdminPosts() {
  onValue(ref(database, `All_Posts`), (snap) => {
    let data = snap.val();
    if (data) {
      data = Object.values(data);

      for (let i = data.length - 1; i >=0; i--) {
        let div = document.createElement("div");
        div.className = "Each_Posts";
        div.innerHTML = `
        <div class="description">
                    <u><i>${data[i].post_author}</i></u>
                    <div class="line1">
                      <h3>${data[i].post_name}</h3>
                      <div class="date">
                        <i class="fa-solid fa-clock"></i><i> ${data[i].post_date}</i>
                      </div>
                    </div>

                    <p>
                    ${data[i].sentences_interface}
                    </p>
                  </div>
                  <img
                    src="${data[i].post_image}"
                    alt=""
                    />
                  <hr />
                    <button>Bình luận</button>
        `;
        All_Posts_Container.appendChild(div);
      }
    } else {
      All_Posts_Container.innerHTML = "<h1>rỗng</h1>";
    }
  });
}
renderAdminPosts();

