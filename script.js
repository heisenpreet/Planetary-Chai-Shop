const weekday = document.querySelector(".weekday");
const month = document.querySelector(".month");

weekday.textContent = new Intl.DateTimeFormat(navigator.language, {
  weekday: "long",
}).format(new Date());

month.textContent = new Intl.DateTimeFormat(navigator.language, {
  month: "long",
}).format(new Date());

const navbarBtn = document.querySelectorAll(".form-btn");
const body = document.querySelector(".body");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const popupleft = document.querySelector(".popup-left");
const popupbtn = document.querySelector(".popup__btn");

const showClose = function () {
  body.classList.toggle("inactive");
  overlay.classList.toggle("hidden");
  popup.classList.toggle("hidden");
  popupleft.classList.toggle("hidden");
};

navbarBtn.forEach((element, i) => {
  element.addEventListener("click", showClose);
});

overlay.addEventListener("click", showClose);
popupbtn.addEventListener("click", showClose);

document.addEventListener("keydown", function (esc) {
  if (esc.key === "Escape" && body.classList.contains("inactive")) {
    showClose(); //Here we need to call the fx
  }
});
