const profileBox = document.querySelector(".profile-container");
const viewPortfolioBtn = document.querySelector(".portfolio-btn");
const closePortfolioBtn = document.querySelector(".portfolio-container span");
const portfolioContainer = document.querySelector(".portfolio-container");

const inputFields = document.querySelectorAll(".input-field");
inputFields.forEach((field) => {
  field.setAttribute("disabled", "true");
});

const urlParams = new URLSearchParams(window.location.search);
let urlUid = urlParams.get("uid");
let uid;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = urlUid ? urlUid : user.uid;
    console.log(uid);
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((data) => {
        populateForm(data.data());
      });
  } else {
    // window.location.assign("../index.html");
  }
});

viewPortfolioBtn.addEventListener("click", () => {
  portfolioContainer.style.width = "76%";
});
closePortfolioBtn.addEventListener("click", () => {
  portfolioContainer.style.width = "0%";
});

function populateForm(fieldKeyMap) {
  document.querySelector(".profile-img img").src = fieldKeyMap["profile-img"];
  portfolioContainer.querySelector("iframe").src = fieldKeyMap["portfolio"];
  for (let fieldId in fieldKeyMap) {
    if (document.getElementById(fieldId)) {
      document.getElementById(fieldId).value = fieldKeyMap[fieldId];
    }
  }
}
// populateForm();
