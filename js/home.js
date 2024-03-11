const storiesDiv = document.querySelector(".story-gallery");
const categoryBar = document.querySelector(".category-bar");

storiesDiv.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  storiesDiv.scrollLeft += evt.deltaY;
});
categoryBar.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  categoryBar.scrollLeft += evt.deltaY;
});

let uid;
let imgFile;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((data) => {
        updateCPS(data.data());
      });
  } else {
    // window.location.assign("../index.html");
  }
});

function updateCPS(data) {
  document.getElementById("cps-dp").src = data["profile-img"];
  document.getElementById(
    "cps-username"
  ).innerText = `${data["first-name"]} ${data["last-name"]}`;
}

function getImg(e) {
  imgFile = e.target.files[0];
  if (imgFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = function (e) {
      document.querySelector("#post-img-preview").src = e.target.result;
    };
  }
}
