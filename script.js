// =========================================
// NAVIGATION — Active Tab Highlight
// =========================================
const navLinks = document.querySelectorAll("nav a");

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

// =========================================
// SEARCH — Filter Searchable Items
// =========================================
const searchInput = document.querySelector("#search");
const searchableItems = document.querySelectorAll(
    ".upcoming li, .tools .card, .jobs .card, .discount-card"
);

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchValue = this.value.toLowerCase().trim();

        searchableItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            item.style.display = itemText.includes(searchValue) ? "" : "none";
        });
    });
}

// =========================================
// ADD TASK — Toggle Section
// =========================================
function toggleTaskSection() {
    const section = document.getElementById("taskSection");

    if (!section) return;

    section.style.display =
        section.style.display === "none" || section.style.display === ""
            ? "block"
            : "none";

    if (section.style.display === "block") {
        document.getElementById("taskInput")?.focus();
    }
}

// =========================================
// ADD TASK — Create New Task
// =========================================
function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("taskDate");
    const list = document.getElementById("taskList");

    if (!input || !list || !input.value.trim()) return;

    const li = document.createElement("li");
    li.className = "task-item";

    const timeLabel =
        date && date.value
            ? new Date(date.value).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit"
              })
            : "";

    li.innerHTML = `
        <input type="checkbox" onchange="this.parentElement.classList.toggle('done', this.checked)">
        <label><b>${input.value}</b>${timeLabel ? " - " + timeLabel : ""}</label>
    `;

    list.appendChild(li);
    input.value = "";
    if (date) date.value = "";
    input.focus();
}

// Allow Enter key to add task
const taskInput = document.getElementById("taskInput");
if (taskInput) {
    taskInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
}

// =========================================
// STUDENT DISCOUNTS — Carousel Slider
// =========================================
const track = document.getElementById("track");
const discountCards = document.querySelectorAll(".discount-card");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
let index = 0;

function visibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function maxIndex() {
    return Math.max(0, discountCards.length - visibleCount());
}

function updateSlider() {
    if (!track || discountCards.length === 0) return;

    const cardWidth = discountCards[0].offsetWidth + 15;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    if (leftBtn) leftBtn.disabled = index === 0;
    if (rightBtn) rightBtn.disabled = index >= maxIndex();
}

if (rightBtn) {
    rightBtn.addEventListener("click", function () {
        if (index < maxIndex()) {
            index++;
            updateSlider();
        }
    });
}

if (leftBtn) {
    leftBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
            updateSlider();
        }
    });
}

window.addEventListener("resize", () => {
    index = Math.min(index, maxIndex());
    updateSlider();
});

// Init slider on page load
updateSlider();//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           //

