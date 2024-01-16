const cursor = document.getElementById("cursor");

document.body.addEventListener("mousemove", (e) => {
  cursor.style.opacity = 1;
  cursor.style.transform = `translate(calc(${e.clientX}px + -50%),calc(${e.clientY}px + -50%))`;
});
document.body.addEventListener("mouseleave", (e) => {
  cursor.style.opacity = 0;
});
