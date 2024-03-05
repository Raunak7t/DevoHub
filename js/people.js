const usersDiv = document.querySelector(".users");
console.log(usersDiv);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((users) => {
        users.forEach((user) => {
          console.log(user.data());
          let card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
          <a href="user-profile.html?uid=${user.data()["uid"]}">
            <div class="card-image">
              <img src="${user.data()["profile-img"]}" alt="Profile image" />
            </div>
            <p class="name">${
              user.data()["first-name"] + " " + user.data()["last-name"]
            }</p>
            <p>${user.data()["profile-title"]}</p>
          </a>
          `;
          usersDiv.appendChild(card);
        });
      });
  }
});
