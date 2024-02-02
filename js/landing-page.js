// typed text animation

var typed = new Typed(".typed-text", {
  strings: [
    "Share Posts",
    "Collaborate",
    "Showcase your Portfolio",
    "Personalized feed",
    "Connect with Professionals",
  ],
  typeSpeed: 100,
  shuffle: true,
  loop: true,
  loopCount: Infinity,
});

// login signup form

const formSide = document.querySelector(".right");
const buttons = document.querySelectorAll(".btn-wrapper");
const formCloseBtn = document.querySelector(".close-icon");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    formSide.classList.add("form-active");
    if (btn.classList.contains("signup-btn")) {
      formSide.classList.add("signup-mode");
    } else {
      formSide.classList.remove("signup-mode");
    }
  });
});

formCloseBtn.addEventListener("click", () => {
  formSide.classList.remove("form-active", "signup-mode");
});

// bg image changer

themeBtn.addEventListener("click", function () {
  location.reload();
});

let root, items, slider;

if (localStorage.getItem("lightmode") == "true") {
  root = document.querySelector(".light");
  slider = document.querySelector(".slider-light");
} else {
  root = document.querySelector(":root");
  slider = document.querySelector(".slider-dark");
}

items = slider.querySelectorAll(".item");

let countItem = items.length;
let itemActive = 0;

let refreshInterval = setInterval(() => {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  slide();
}, 3000);

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    itemActive = index;
    slide();
  });
});

function slide() {
  let itemActiveOld = slider.querySelector(".item.active");
  itemActiveOld.classList.remove("active");
  items[itemActive].classList.add("active");

  let imgURL = items[itemActive].querySelector("img").src;
  root.style.setProperty("--bg-img", `url(${imgURL})`);
}
