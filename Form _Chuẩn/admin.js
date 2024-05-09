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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUVfVNg4itOtdvTb61kYp_k52dHEr5NL4",
  authDomain: "jsi27-8a433.firebaseapp.com",
  projectId: "jsi27-8a433",
  storageBucket: "jsi27-8a433.appspot.com",
  messagingSenderId: "766232863780",
  appId: "1:766232863780:web:8d232e2f2292b53eab24b1",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM
let create_course = document.getElementById("create_course");
let input_product_name = document.getElementById("product_name_update");
let input_product_price = document.getElementById("product_price_update");
let input_product_image = document.getElementById("product_image_update");
let input_product_detail = document.getElementById("product_detail_update");
let save_btn = document.getElementById("save");
let product_interface = document.querySelector(".product");

///////////////////////////////////////////// Create
create_course.addEventListener("click", function () {
  // let userRef = ref(database, "users/" + user_name_input.value);
  const dbRef = ref(getDatabase()); // path cua data
  get(child(dbRef, `All_Products/${input_product_name.value}`)).then(
    (snapshot) => {
      // nếu tên người dùng bạn nhập trùng với tên có rồi trong firebase thì snap.exists() == true
      // => Lúc này mình thể add 1 user có tên như vậy nữa
      // nếu tên người dùng bạn nhập trùng ko với tên có rồi trong firebase thì snap.exists() == false
      // => Cho phép user đó đc add vào trong firebase
      if (snapshot.exists() == false) {
        set(ref(database, `All_Products/${input_product_name.value}`), {
          product_name: input_product_name.value,
          product_price: input_product_price.value,
          product_image: input_product_image.value,
          product_details: input_product_detail.value,
        });
        alert("Tạo sản phẩm thành công");

        // Clear input
        input_product_name.value = "";
        input_product_price.value = "";
        input_product_image.value = "";
        input_product_detail.value = "";
        window.location.reload();
      } else {
        // exists == true
        alert("Tên này đã được sử dụng, vui lòng nhập tên sản phẩm khác");
      }
    }
  );
});

save_btn.addEventListener("click", function () {
  if (
    input_product_name &&
    input_product_image &&
    input_product_price &&
    input_product_detail
  ) {
    product_interface.innerHTML = `
          <img src="${input_product_image.value}" alt="" />
          <div class="product_name">${input_product_name.value}</div>
          <div class="product_price">
            <span>${input_product_price.value}</span>
            <span>VND</span>
          </div>
          `;
  } else {
    alert("Bạn đang điền thiếu thông tin vui lòng nhập lại");
  }
});
