// selecting pop box and overlay
var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addbutton = document.querySelector(".add-button");
var cancelbutton = document.getElementById("cancel-pop-up");

// Show popup
addbutton.addEventListener("click", function () {
  popupoverlay.style.display = "block";
  popupbox.style.display = "block";
});

// Hide popup
cancelbutton.addEventListener("click", function (event) {
  event.preventDefault();
  popupoverlay.style.display = "none";
  popupbox.style.display = "none";
});

// select book container
var container = document.querySelector(".container");
var addpopup = document.getElementById("add-pop-up");
var booktitle = document.getElementById("book-title");
var bookauthorinput = document.getElementById("book-author-input");
var bookdescriptioninput = document.getElementById("book-description-input");

// Load books from localStorage on page load
window.addEventListener("DOMContentLoaded", function () {
  var savedBooks = JSON.parse(localStorage.getItem("books")) || [];
  savedBooks.forEach(function (book) {
    createBookElement(book.title, book.author, book.description);
  });
});

// Function to create a book div and append
function createBookElement(title, author, description) {
  var div = document.createElement("div");
  div.setAttribute("class", "book-container");
  div.innerHTML = `
      <h2>${title}</h2>
      <h3>${author}</h3>
      <p>${description}</p>
      <button onclick="deletebok(event)">Delete</button>`;
  container.append(div);
}

// Add new book and save to localStorage
addpopup.addEventListener("click", function (event) {
  event.preventDefault();

  var title = booktitle.value.trim();
  var author = bookauthorinput.value.trim();
  var description = bookdescriptioninput.value.trim();

  if (title && author && description) {
    createBookElement(title, author, description);

    // Save to localStorage
    var savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    savedBooks.push({ title, author, description });
    localStorage.setItem("books", JSON.stringify(savedBooks));

    popupoverlay.style.display = "none";
    popupbox.style.display = "none";

    // Clear inputs
    booktitle.value = "";
    bookauthorinput.value = "";
    bookdescriptioninput.value = "";
  }
});

// Delete a book and update localStorage
function deletebok(event) {
  var bookDiv = event.target.parentElement;
  var title = bookDiv.querySelector("h2").innerText;
  bookDiv.remove();

  // Update localStorage
  var savedBooks = JSON.parse(localStorage.getItem("books")) || [];
  var updatedBooks = savedBooks.filter((book) => book.title !== title);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
}
