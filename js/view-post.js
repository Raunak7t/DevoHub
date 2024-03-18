const urlParams = new URLSearchParams(window.location.search);
let postID = urlParams.get("id");
let uid;
let postData;
let userData;

const postUserDp = document.querySelector("#post-user-dp");
const postUserName = document.querySelector("#post-username");
const postCategory = document.querySelector(".post .category");
const postImgCon = document.querySelector(".main .img-container");
const postImg = document.querySelector(".post .img-container img");
const likeCount = document.querySelector(".like h4");
const likeBtn = document.querySelector(".like");
const commentCount = document.querySelector(".comment h4");
const postTitle = document.querySelector(".bottom h4");
const commentInput = document.querySelector("#comment-input");
const sendCommentBtn = document.querySelector(".send-btn");
const allComments = document.querySelector(".all-comments");

const postsDiv = document.querySelector(".posts");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .onSnapshot((data) => {
        postData = data.data();
        firebase
          .firestore()
          .collection("users")
          .doc(postData.uid)
          .onSnapshot((data) => {
            userData = data.data();
            fillPostData(postData, userData);
          });
        showPosts(postData["category"]);
      });
  } else {
    // window.location.assign("../index.html");
  }
});

function fillPostData(postData, userData) {
  postUserDp.src = userData["profile-img"];
  postUserName.innerHTML = `${userData["first-name"]} ${userData["last-name"]}`;

  postCategory.innerHTML = postData["category"];
  postImg.src = postData["imgURL"];
  postImgCon.style.backgroundImage = `linear-gradient(20deg, #dd61ff60, #6098ff60)
  , url(${postData["imgURL"]})`;

  likeCount.innerText = postData["likes"].length;

  for (let likeIndex = 0; likeIndex < postData["likes"].length; likeIndex++) {
    if (postData["likes"][likeIndex] === uid) {
      likeBtn.classList.add("liked");
    }
  }

  likeBtn.addEventListener("click", () => {
    let like = false;
    for (let likeIndex = 0; likeIndex < postData["likes"].length; likeIndex++) {
      if (postData["likes"][likeIndex] === uid) {
        like = true;
        postData["likes"].splice(likeIndex, 1);
        likeBtn.classList.remove("liked");
      }
    }
    if (!like) {
      postData["likes"].push(uid);
    }
    console.log(postData["likes"]);
    firebase.firestore().collection("posts").doc(postID).update({
      likes: postData["likes"],
    });
  });

  commentCount.innerText = postData["comments"].length;

  postTitle.innerText = postData["title"];

  fillComments(postData["comments"]);
}

function fillComments(commentarry) {
  if (commentarry.length !== 0) {
    allComments.innerHTML = "";
    for (
      let commentindex = 0;
      commentindex < commentarry.length;
      commentindex++
    ) {
      //user data
      firebase
        .firestore()
        .collection("users")
        .doc(commentarry[commentindex].uid)
        .get()
        .then((user) => {
          userData = user.data();
          let commentCard = document.createElement("div");
          commentCard.classList.add("comment-card");
          commentCard.innerHTML = `
            <div class="dp-name">
              <img src="${userData["profile-img"]}" />
              <h4>${userData["first-name"]} ${userData["last-name"]}</h4>
            </div>
            <div class="comment-text">
              ${commentarry[commentindex]["commentText"]}
            </div>
          `;
          allComments.appendChild(commentCard);
        });
    }
  }
}

sendCommentBtn.addEventListener("click", () => {
  if (commentInput.value == "") {
    alert("Please write something...!");
  } else {
    let commentdata = {
      commentText: commentInput.value,
      uid: uid,
    };
    postData["comments"].push(commentdata);
    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .update({
        comments: postData["comments"],
      })
      .then(() => {
        commentInput.value = "";
      });
  }
});

function showPosts(query) {
  if (query) {
    firebase
      .firestore()
      .collection("posts")
      .where("category", "==", query)
      .onSnapshot((posts) => {
        postsDiv.innerHTML = "";
        if (posts.docs.length > 1) {
          posts.forEach((post) => {
            getPostCreater(post.data());
          });
        } else {
          postsDiv.innerHTML = "<h1>No more related posts</h1>";
        }
      });
  } else {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("date", "desc")
      .onSnapshot((posts) => {
        postsDiv.innerHTML = "";
        posts.forEach((post) => {
          getPostCreater(post.data());
        });
      });
  }

  function getPostCreater(postData) {
    if (postData.id != postID) {
      firebase
        .firestore()
        .collection("users")
        .doc(postData.uid)
        .onSnapshot((user) => {
          addPostCard(user.data(), postData);
        });
    }
  }

  function addPostCard(userData, postData) {
    let postCard = document.createElement("div");
    postCard.classList.add("post-container");
    postCard.addEventListener("click", () => {
      expandPost(postData.id);
    });
    let isLiked = false;

    for (let likeIndex = 0; likeIndex < postData["likes"].length; likeIndex++) {
      if (postData["likes"][likeIndex] === uid) {
        isLiked = true;
      }
    }

    postCard.innerHTML = `
    <div class="top-row">
      <div class="dp-name">
        <img src="${userData["profile-img"]}" />
        <h3>${userData["first-name"]} ${userData["last-name"]}</h3>
      </div>
    </div>
    <div class="main-img">
      <img src="${postData["imgURL"]}" alt="post" />
    </div>
    <div class="down-row">
      <h4 class="title">
      ${postData["title"]}
      </h4>
      <div class="likes ${isLiked ? "liked" : ""}">
        <span class="material-symbols-outlined l-span"> relax </span>
        <span class="material-symbols-outlined n-span"> favorite </span>${
          postData["likes"].length
        }
      </div>
    </div>
    `;
    postsDiv.appendChild(postCard);
  }
  function expandPost(id) {
    window.location = "./view-post.html?id=" + id;
  }
}
