const profileBox = document.querySelector(".profile-container");
const saveBtn = document.querySelector(".save-btn");
const editBtn = document.querySelector(".edit-btn");

const inputFields = document.querySelectorAll(".input-field");
inputFields.forEach((field) => {
  field.setAttribute("disabled", "true");
});

editBtn.addEventListener("click", () => {
  profileBox.classList.add("editable");

  inputFields.forEach((field) => {
    field.removeAttribute("disabled");
  });
});

saveBtn.addEventListener("click", () => {
  profileBox.classList.remove("editable");
  inputFields.forEach((field) => {
    field.setAttribute("disabled", "true");
  });
});
