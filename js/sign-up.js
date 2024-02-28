let regName = document.getElementById("regName");
let regEmail = document.getElementById("regEmail");
let regPassword = document.getElementById("regPassword");
let signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  firebase
    .auth()
    .createUserWithEmailAndPassword(regEmail.value, regPassword.value)
    .then((data) => {
      console.log(data.user.uid);
      let userData = {
        name: regName.value,
        email: regEmail.value,
        password: regPassword.value,
        portfolio: "",
        workingStatus: "",
        qualification: "",
        freeToWork: false,
        profilePic: "",
        bio: "I am happy!",
      };
      firebase
        .firestore()
        .collection("users")
        .doc(data.user.uid)
        .set(userData)
        .then((res) => {
          window.location.href = `${window.location.href}pages/home.html`;
        });
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
});
