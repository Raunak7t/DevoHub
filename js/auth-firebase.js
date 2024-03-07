let uid;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    updateNav(uid);
  } else {
    // window.location.assign("../index.html");
  }
});
