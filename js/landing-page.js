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
