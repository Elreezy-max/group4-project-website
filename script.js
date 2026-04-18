// NAVIGATION LINKS
const navLinks = document.querySelectorAll("nav a");

// SEARCH INPUT
const searchInput = document.querySelector("#search");

// SEARCHABLE ITEMS
const searchableItems = document.querySelectorAll(
    ".upcoming li, .tools .card, .jobs .card, .discounts .card"
);

// ACTIVE TAB HIGHLIGHT
navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        navLinks.forEach(item => {
            item.classList.remove("active");
            item.removeAttribute("aria-current");
        });

        this.classList.add("active");
        this.setAttribute("aria-current", "page");
    });
});

// SEARCH FILTERING
searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase().trim();

    searchableItems.forEach(item => {
        const itemText = item.textContent.toLowerCase();

        if (itemText.includes(searchValue)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});

// Student Discounts
let track = document.getElementById("track");
let index = 0;

let totalCards = document.querySelectorAll(".card").length;
let maxIndex = totalCards - 3; // show 3 at a time

document.getElementById("rightBtn").onclick = function () {
  if (index < maxIndex) {
    index++;
    updateSlider();
  }
};

document.getElementById("leftBtn").onclick = function () {
  if (index > 0) {
    index--;
    updateSlider();
  }
};

function updateSlider() {
  let cardWidth = document.querySelector(".card").offsetWidth + 15; // gap
  track.style.transform = "translateX(-" + (index * cardWidth) + "px)";
}