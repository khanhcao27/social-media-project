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
  apiKey: "AIzaSyD3Ayps5a71m_sAOpvjZOx1Mn15Dm0plzs",
  authDomain: "crud-amazing.firebaseapp.com",
  databaseURL: "https://crud-amazing-default-rtdb.firebaseio.com",
  projectId: "crud-amazing",
  storageBucket: "crud-amazing.appspot.com",
  messagingSenderId: "223851297926",
  appId: "1:223851297926:web:8d30690d467cb323dba507",
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

// Hiển thị tên người dùng vừa đăng nhập thành công ra giao diện, đoạn này phải lấy dữ liệu được lưu trong localStorage ở khúc đăng nhập ra
let username_login = localStorage.getItem("username_login");
let userUID_login = localStorage.getItem("userUID_login");

if (username_login != "") {
  document.querySelector("#username_login").innerText = username_login;
  document.querySelector("#userUID_login").innerText = userUID_login;
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

  location.reload();
});

/////////////////////////////////////////////// upload image
// const fileInput = document.getElementById("fileInput"); // Input element for file selection
// const imageGallery = document.getElementById("imageGallery"); // Container for displaying images

// var imageURL = "";

// fileInput.addEventListener("change", async function (e) {
//   const file = e.target.files[0]; // Get the selected file

//   // Create a storage reference
//   const storageRef = dbRefImage(storage, "images/" + file.name);

//   try {
//     // Upload file to Firebase Storage
//     const snapshot = await uploadBytes(storageRef, file);

//     // Get the download URL after successful upload
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     imageURL = downloadURL;
//     console.log(downloadURL);

//     // Store downloadURL in Firebase Database for retrieval
//     const dbImagesRef = ref(database, "images");
//     push(dbImagesRef, {
//       imageURL: downloadURL,
//     });

//     // window.location.reload();
//   } catch (error) {
//     // Handle any errors while uploading
//     console.error(error);
//   }
// });

///////////////////////////////////////////// Create
add_user_btn.addEventListener("click", function () {
  // let userRef = ref(database, "users/" + user_name_input.value);

  const dbRef = ref(getDatabase());

  get(child(dbRef, `student/first_student`)).then((snapshot) => {
    // nếu tên người dùng bạn nhập trùng với tên có rồi trong firebase thì snap.exists() == true
    // => Lúc này mình thể add 1 user có tên như vậy nữa
    // nếu tên người dùng bạn nhập trùng ko với tên có rồi trong firebase thì snap.exists() == false
    // => Cho phép user đó đc add vào trong firebase
    if (snapshot.exists() == false) {
      set(ref(database, "student/first_student"), {
        userage: user_age_input.value,
        usefavor: ["Ăn", "Ngủ", "Nghỉ"],
        // user_avatar: imageURL,
      });

      alert("Tạo tài khoản thành công");
    } else {
      alert("Tên này đã được sử dụng, vui lòng nhập tên khác");
    }
  });
});

///////////////////////////////////////////////////// Read
read_data.addEventListener("click", function () {
  onValue(ref(database, `student/first_student`), (snap) => {
    let data = snap.val();
    console.log(data);
  });
});

/////////////////////////////////////////////////// Update
// arrayComment.push(djkfnsdkjfns);
update_btn.addEventListener("click", function () {
  update(ref(database, "student/first_student"), {
    userage: user_age_input.value,
    usefavor: ["Ăn", "Ngủ", "Nghỉ"],
    // user_avatar: imageURL,
  });
});

/////////////////////////////////////////////////////// Delete
delete_btn.addEventListener("click", function () {
  remove(ref(database, "users/" + userUID_login));
});
