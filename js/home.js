// firebase

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//   } else {
//     window.location.assign("../index.html");
//   }
// });

const settingsMenu = document.querySelector(".setting-menu");
const storiesDiv = document.querySelector(".story-gallery");
const categoryBar = document.querySelector(".category-bar");

function settingsMenuToggle() {
  settingsMenu.classList.toggle("settings-menu-height");
}

storiesDiv.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  storiesDiv.scrollLeft += evt.deltaY;
});
categoryBar.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  categoryBar.scrollLeft += evt.deltaY;
});
