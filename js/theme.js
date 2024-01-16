const button = document.querySelector(".theme-toggle");

let lsData = localStorage.getItem("lightmode");
if (!lsData) localStorage.setItem("lightmode", false);

button.addEventListener("click", function () {
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
  console.log("checked");
  if (localStorage.getItem("lightmode") == "true") {
    console.log("applied");
    document.body.classList.add("light");
  }
}
checkLightMode();
