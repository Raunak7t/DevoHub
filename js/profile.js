const profileBox = document.querySelector(".profile-container");
const saveBtn = document.querySelector(".save-btn");
const editBtn = document.querySelector(".edit-btn");
const viewPortfolioBtn = document.querySelector(".portfolio-btn");
const closePortfolioBtn = document.querySelector(".portfolio-container span");
const portfolioContainer = document.querySelector(".portfolio-container");

viewPortfolioBtn.addEventListener("click",()=>{
  portfolioContainer.style.width = "76%";
})
closePortfolioBtn.addEventListener("click",()=>{
  portfolioContainer.style.width = "0%";
})

const fieldKeyMap = {
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
  "portfolio": "https://i0.wp.com/mistudio.co/wp-content/uploads/2023/09/Blog-featured-image-portfolio-945x600-1.jpg?fit=945%2C600&ssl=1",
  "exp-year": "",
  "exp-title": "",
  "exp-desc": "",
  "interest-1": "",
  "interest-2": "",
  "interest-3": "",
  "email": "username@gmail.com",
  "mobile": "",
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
  document.querySelector(".profile-img img").src = fieldKeyMap["profile-img"];
  portfolioContainer.querySelector("iframe").src = fieldKeyMap["portfolio"];
  for (let fieldId in fieldKeyMap) {
    if (document.getElementById(fieldId)) {
      document.getElementById(fieldId).value = fieldKeyMap[fieldId];
    }
  }
}
populateForm();
