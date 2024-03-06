const saveBtn = document.querySelector(".save-btn");
const editBtn = document.querySelector(".edit-btn");
let file;
let newDPurl;
editBtn.addEventListener("click", () => {
  profileBox.classList.add("editable");
  inputFields.forEach((field) => {
    if (field.id != "email") field.removeAttribute("disabled");
  });
});
let newData = {};
saveBtn.addEventListener("click", () => {
  profileBox.classList.remove("editable");
  inputFields.forEach((field) => {
    field.setAttribute("disabled", "true");
    newData[field.id] = field.value;
  });

  if (newDPurl) newData["profile-img"] = newDPurl;
  console.log(newData);

  firebase.firestore().collection("users").doc(uid).update(newData);
});

function updateProfileImg(e) {
  console.log(e.target.files[0]);
  file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      document.querySelector(".profile-img img").src = e.target.result;
    };
  }
  let uploadTask = firebase.storage().ref().child(`users/${uid}/dp`).put(file);
  uploadTask.on(
    "state_changed",
    (progress) => {},
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        newDPurl = downloadURL;
        console.log(newDPurl);
      });
    }
  );
}
