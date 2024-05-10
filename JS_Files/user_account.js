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

let post_name = document.getElementById("post_name");
let post_image = document.getElementById("post_image");
let post_author = document.getElementById("post_author");
let post_author_change = document.getElementById("post_author_change");
let post_content = document.getElementById("post_content");
let All_Posts_Container = document.querySelector(".All_Posts_Container");
let logoutBtn = document.getElementById("logout");
console.log(logoutBtn);
let saveBtn = document.getElementById("save_button");
console.log(saveBtn);
let postBtn = document.getElementById("post_button");
console.log(postBtn);
let post_interface = document.querySelector(".post_interface");
let postList = document.getElementById("post_list");
let post_UID = document.getElementById("postUID");
let post_name_change = document.getElementById("post_name_change");
let post_image_change = document.getElementById("post_image_change");
let post_content_change = document.getElementById("post_content_change");
let changeBtn = document.getElementById("save_change_button");
console.log(changeBtn);


logoutBtn.addEventListener("click", function () {
  localStorage.setItem("username_login", "");
  localStorage.setItem("userUID_login", "");

  location.reload();
  window.location.href = "../HTML_Files/signinandup.html";
});

// Tự động điền username vào ô post_author
post_author.value = username_login;
post_author_change.value = username_login;

function getSentence() {
  let sentences_interface = "";
  let sentences = post_content.value
    .split("\n")
    .filter((sentence) => sentence != "");
  console.log(sentences);
  for (let i = 0; i < sentences.length; i++) {
    sentences_interface += `${sentences[i]} <br/> <br/> `;
  }

  return sentences_interface;
}
saveBtn.addEventListener("click", function () {
  let date = new Date();
  let time = `${date.getUTCDate()} / ${
    date.getUTCMonth() + 1
  } / ${date.getUTCFullYear()}`;

  post_interface.innerHTML = `
  
  <div class="description">
  <div class="author">
    <u><i>${post_author.value}</i></u>
  </div>
    <div class="line1">
      <h3>${post_name.value}</h3>
      <div class="date">
        <i class="fa-solid fa-clock"></i><i> ${time}</i>
      </div>
    </div>
    
    <p>
      ${getSentence()}
    </p>
  </div>
    <img
        src="${post_image.value}"
        alt=""
        />

    `;
});

postBtn.addEventListener("click", function () {
  let date = new Date();
  let time = `${date.getUTCDate()} / ${
    date.getUTCMonth() + 1
  } / ${date.getUTCFullYear()}`;
  const newProductRef = push(ref(database, "All_Posts"));
  set(newProductRef, {
    post_UID: newProductRef.key,
    post_author: post_author.value,
    post_name: post_name.value,
    post_date: time,
    sentences_interface: getSentence(),
    post_image: post_image.value,
  });

  // Lấy ID duy nhất của bài viết mới được thêm vào
  const postId = newProductRef.key;
  console.log("New Posts ID:", postId);

    // Hiển thị thông báo sau khi thêm bài viết thành công
    alert("Bài viết đã được đăng thành công!");
    window.location.reload()
});

post_content.addEventListener("input", function () {
  // Tự động điều chỉnh chiều cao của textarea
  // post_content.style.height = "auto"; // Đặt chiều cao của khung textarea về mặc định
  post_content.style.height = post_content.scrollHeight + "px"; // Thiết lập chiều cao dựa trên nội dung
});

function renderAdminPosts() {
  onValue(ref(database, `All_Posts`), (snap) => {
    let data = snap.val();
    if (data) {
      data = Object.values(data);
      data = data.filter(e => e.post_author == localStorage.getItem("username_login"));
      // data = data.reverse();
      console.log(data)
      for (let i = data.length - 1; i >=0; i--) {
        if(data[i].post_author == localStorage.getItem("username_login")) {

        let div = document.createElement("div");
        div.className = "Each_Posts";
        div.innerHTML = `
        <div class="description">
        <button class="fix_posts">Sửa Bài Đăng</button>
        <button class="delete_posts">Xóa Bài Đăng</button>
        <div>${data[i].post_UID}</div>
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
      }
      let fix_posts = document.getElementsByClassName("fix_posts")
      let delete_posts = document.getElementsByClassName("delete_posts")
      console.log(fix_posts)
      console.log(delete_posts)
            data = data.reverse();
      for (let i = fix_posts.length -1; i>=0; i--) {
        fix_posts[i].addEventListener("click", function () {
          console.log(data[i])
          post_UID.innerText = data[i].post_UID
          post_name_change.value = data[i].post_name
          post_image_change.value = data[i].post_image
          post_content_change.value = data[i].sentences_interface//.replaceAll("<br/>", "\n")
          updatePosts(data[i].post_UID)
        })
      }
      for (let i = delete_posts.length -1; i>=0; i--) {
        delete_posts[i].addEventListener("click", function () {
          console.log(data[i])
          deletePosts(data[i].post_UID)
        })
      }
    } else {
      All_Posts_Container.innerHTML = "<h1>rỗng</h1>";
    }

  });
}
renderAdminPosts();

changeBtn.addEventListener("click", function(){
  updatePosts(post_UID.innerText);
  alert("Cập nhật bài viết thành công!")
  window.location.reload()
})

function updatePosts(postUID) {
  console.log(postUID)
  console.log(post_name_change.value)
  console.log(post_image_change.value)
  console.log(post_content_change.value)
  update(ref(database, `All_Posts/${postUID}`), {
          post_name: post_name_change.value,
          post_image: post_image_change.value,
          sentences_interface: post_content_change.value,
  })
}

function deletePosts(postUID) {
  remove(ref(database, `All_Posts/${postUID}` ));
  alert("Xóa bài viết thành công!")
  window.location.reload()
}