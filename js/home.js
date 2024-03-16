const storiesDiv = document.querySelector(".story-gallery");
const categoryBar = document.querySelector(".category-bar");

storiesDiv.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  storiesDiv.scrollLeft += evt.deltaY;
});
categoryBar.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  categoryBar.scrollLeft += evt.deltaY;
});

const postsDiv = document.querySelector(".posts");

let uid;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((data) => {
        updateCPS(data.data());
        showPosts();
      });
  } else {
    // window.location.assign("../index.html");
  }
});

function updateCPS(data) {
  document.getElementById("cps-dp").src = data["profile-img"];
  document.getElementById(
    "cps-username"
  ).innerText = `${data["first-name"]} ${data["last-name"]}`;
}

function showPosts() {
  firebase
    .firestore()
    .collection("posts")
    .onSnapshot((posts) => {
      postsDiv.innerHTML = "";
      posts.forEach((post) => {
        getPostCreater(post.data());
      });
    });

  function getPostCreater(postData) {
    firebase
      .firestore()
      .collection("users")
      .doc(postData.uid)
      .onSnapshot((user) => {
        addPostCard(user.data(), postData);
      });
  }

  function addPostCard(userData, postData) {
    let postCard = document.createElement("div");
    postCard.classList.add("post-container");
    postCard.addEventListener("click", () => {
      expandPost(postData.id);
    });
    postCard.innerHTML = `
    <div class="top-row">
      <div class="dp-name">
        <img src="${userData["profile-img"]}" />
        <h3>${userData["first-name"]} ${userData["last-name"]}</h3>
      </div>
      <div class="category">${postData["category"]}</div>
    </div>
    <div class="main-img">
      <img src="${postData["imgURL"]}" alt="post" />
    </div>
    <div class="down-row">
      <h4 class="title">
      ${postData["title"]}
      </h4>
      <div class="likes">
        <span class="material-symbols-outlined"> favorite </span>${postData["likes"].length}
      </div>
    </div>
    `;
    postsDiv.appendChild(postCard);
  }
  function expandPost(id) {
    window.location = "./view-post.html?id=" + id;
  }
}
