import { products } from "./data.js";
import templateSource from "./templates/products.hbs";

const productsContainer = document.querySelector(".products-container");
productsContainer.innerHTML = templateSource({ products });



// Форма Ім'я - Пароль

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const saveBtn = document.querySelector("#saveBtn");

const savedUsername = localStorage.getItem("username");
const savedPassword = localStorage.getItem("password");

if (savedUsername) usernameInput.value = savedUsername;
if (savedPassword) passwordInput.value = savedPassword;

saveBtn.addEventListener("click", () => {
  localStorage.setItem("username", usernameInput.value);
  localStorage.setItem("password", passwordInput.value);
  alert("Дані збережено!");
});


// Закладки

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

const bookmarkInput = document.querySelector("#bookmarkInput");
const addBookmarkBtn = document.querySelector("#addBookmarkBtn");
const bookmarkList = document.querySelector("#bookmarkList");

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function renderBookmarks() {
  bookmarkList.innerHTML = "";

  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    li.innerHTML = `
            <a href="${bookmark}" target="_blank">${bookmark}</a>
            <div>
                <button class="edit">Редагувати</button>
                <button class="delete">Видалити</button>
            </div>
        `;
    bookmarkList.appendChild(li);
  });
}

addBookmarkBtn.addEventListener("click", () => {
  const url = bookmarkInput.value.trim();
  if (url) {
    bookmarks.push(url);
    saveBookmarks();
    renderBookmarks();
    bookmarkInput.value = "";
  }
});

bookmarkList.addEventListener("click", (e) => {
  const target = e.target;
  const li = target.closest("li");
  const index = li.dataset.index;

  if (target.classList.contains("delete")) {
    bookmarks.splice(index, 1);
    saveBookmarks();
    renderBookmarks();
  }

  if (target.classList.contains("edit")) {
    const newUrl = prompt("Введіть нове посилання:", bookmarks[index]);
    if (newUrl) {
      bookmarks[index] = newUrl.trim();
      saveBookmarks();
      renderBookmarks();
    }
  }
});

renderBookmarks();
