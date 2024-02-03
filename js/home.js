// firebase

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  } else {
    window.location.assign("../index.html");
  }
});
