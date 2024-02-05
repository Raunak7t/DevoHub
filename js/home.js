// firebase

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//   } else {
//     window.location.assign("../index.html");
//   }
// });

storiesDiv.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  storiesDiv.scrollLeft += evt.deltaY;
});
categoryBar.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  categoryBar.scrollLeft += evt.deltaY;
});
