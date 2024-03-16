const mainData = JSON.parse(sessionStorage.getItem("postData"));
console.log(mainData);

function fillPostData() {
  document.querySelector("#post-user-dp").src =
    mainData.userData["profile-img"];
}
fillPostData();
