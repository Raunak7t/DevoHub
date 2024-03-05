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
        "profile-img": "http://www.placehold.co/50",
        "last-name": "LastName",
        "first-name": "FirstName",
        "profile-title": "",
        "user-bio": ``,
        "skill-1": "",
        "skill-2": "",
        "skill-3": "",
        "skill-4": "",
        "skill-5": "",
        "edu-year": "",
        "edu-name": "",
        "edu-desc": "",
        "cert-year": "",
        "cert-name": "",
        "cert-desc": "",
        portfolio:
          "https://i0.wp.com/mistudio.co/wp-content/uploads/2023/09/Blog-featured-image-portfolio-945x600-1.jpg?fit=945%2C600&ssl=1",
        "exp-year": "",
        "exp-title": "",
        "exp-desc": "",
        "interest-1": "",
        "interest-2": "",
        "interest-3": "",
        mobile: "",
      };
      firebase
        .firestore()
        .collection("users")
        .doc(data.user.uid)
        .set(userData)
        .then((res) => {
          window.location = "./pages/home.html";
        });
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
});
