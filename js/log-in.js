let logEmail = document.getElementById("logEmail");
let logPassword = document.getElementById("logPassword");
let loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(logEmail.value, logPassword.value)
    .then((userCredential) => {
      window.location = "./pages/home.html";
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
});
