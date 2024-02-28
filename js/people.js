firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((users) => {
        users.forEach((user) => {
          console.log(user.data());
          
        });
      });
  }
});
