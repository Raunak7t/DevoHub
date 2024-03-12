let imgFile;

function getImg(e) {
  imgFile = e.target.files[0];
  if (imgFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = function (e) {
      document.querySelector("#post-img-preview").src = e.target.result;
    };
  }
}

function createPost(e) {
  let title = document.querySelector("#post-title").value;
  let category = document.querySelector("#post-category").value;
  let desc = document.querySelector("#post-desc").value;

  if (uid) {
    let imgURL;
    let uniqueId = uuidv4();
    let uploadTask = firebase
      .storage()
      .ref()
      .child(`posts/${uniqueId}`)
      .put(imgFile);
    uploadTask.on(
      "state_changed",
      (progress) => {},
      (error) => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          imgURL = downloadURL;

          if (title !== "" || imgURL) {
            firebase
              .firestore()
              .collection("posts")
              .add({
                uuid: uniqueId,
                title,
                imgURL,
                category,
                desc,
                uid,
                likes: [],
                dislikes: [],
                comments: [],
                date: new Date().toLocaleDateString(),
              })
              .then((res) => {
                firebase
                  .firestore()
                  .collection("posts/")
                  .doc(res.id)
                  .update({
                    id: res.id,
                  })
                  .then(() => {
                    document.querySelector("#post-img-preview").src =
                      "../assets/upload-img.png";
                    document.querySelector("#post-title").value = "";
                    document.querySelector("#post-category").value = "";
                    document.querySelector("#post-desc").value = "";
                  });
              });
          }
        });
      }
    );
  } else {
    console.log("cant post");
  }
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
