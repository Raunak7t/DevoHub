const themeBtn = document.querySelector(".theme-toggle");

let lsData = localStorage.getItem("lightmode");
if (!lsData) localStorage.setItem("lightmode", false);

themeBtn.addEventListener("click", function () {
  let d = localStorage.getItem("lightmode");
  if (d == "false") {
    localStorage.setItem("lightmode", true);
    document.body.classList.add("light");
  } else {
    localStorage.setItem("lightmode", false);
    document.body.classList.remove("light");
  }
});

function checkLightMode() {
  if (localStorage.getItem("lightmode") == "true") {
    document.body.classList.add("light");
  }
}
checkLightMode();
