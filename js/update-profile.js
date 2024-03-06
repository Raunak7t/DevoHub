const saveBtn = document.querySelector(".save-btn");
const editBtn = document.querySelector(".edit-btn");

editBtn.addEventListener("click", () => {
  profileBox.classList.add("editable");

  inputFields.forEach((field) => {
    field.removeAttribute("disabled");
  });
});
let newData = {};
saveBtn.addEventListener("click", () => {
  profileBox.classList.remove("editable");
  inputFields.forEach((field) => {
    field.setAttribute("disabled", "true");
    newData[field.id] = field.value;
  });
  console.log(newData);
  firebase.firestore().collection("users").doc(uid).update(newData);
});
