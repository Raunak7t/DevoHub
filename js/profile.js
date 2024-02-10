const profileBox = document.querySelector(".profile-container");
const saveBtn = document.querySelector(".save-btn");
const editBtn = document.querySelector(".edit-btn");

const fieldKeyMap = {
  "last-name": "1",
  "first-name": "2",
  "profile-title": "3",
  "user-bio": `class="desc input-field"
  id="user-bio"
  placeholder="Summarize yourself - Bio"`,
  "skill-1": "5",
  "skill-2": "6",
  "skill-3": "7",
  "skill-4": "8",
  "skill-5": "9",
  "edu-year": "10",
  "edu-name": "",
  "edu-desc": "12",
  "cert-year": "13",
  "cert-name": "14",
  "cert-desc": "",
  portfolio: "16",
  "exp-year": "17",
  "exp-title": "18",
  "exp-desc": "19",
  "interest-1": "20",
  "interest-2": "21",
  "interest-3": "22",
  email: "23",
  mobile: "24",
};

let newData = {};

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
    newData[field.id] = field.value;
  });
  console.log(newData);
});

function populateForm() {
  for (let fieldId in fieldKeyMap) {
    if (document.getElementById(fieldId)) {
      document.getElementById(fieldId).value = fieldKeyMap[fieldId];
    }
  }
}
populateForm();
