"use strict";

const weekday = document.querySelector(".weekday");
const month = document.querySelector(".month");
const navbarBtn = document.querySelectorAll(".form-btn");
const body = document.querySelector(".body");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const popupleft = document.querySelector(".popup-left");
const popupbtn = document.querySelector(".popup__btn");
const timeleft = document.querySelector(".Welcome-msg__timeleft");
const Welcome = document.querySelector(".Welcome-msg");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//passing month and day
/////////////////////////////////////////////////
/////////////////////////////////////////////////

weekday.textContent = new Intl.DateTimeFormat(navigator.language, {
  weekday: "long",
}).format(new Date());

month.textContent = new Intl.DateTimeFormat(navigator.language, {
  month: "long",
}).format(new Date());

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//WELCOME MESSGAGE
/////////////////////////////////////////////////
/////////////////////////////////////////////////

let messageTimer;
const welcomeMsg = function () {
  let timer = 5;
  const startTimer = () => {
    setInterval(() => {
      if (timer > 0) {
        timer--;
        timeleft.textContent = String(timer).padStart(2, 0);
      } else {
        clearInterval();
      }
    }, 1500);
  };

  setTimeout(() => {
    startTimer();
  }, 1000);

  messageTimer = setTimeout(() => {
    overlay.classList.toggle("hidden");
    Welcome.classList.toggle("hidden");
    body.classList.toggle("inactive");
  }, 9000); //IMPORTANT CHANGE TO 9000
};

welcomeMsg();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//POPUP FORM FUNCTIONS
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const showClose = function () {
  body.classList.toggle("inactive");
  overlay.classList.toggle("hidden");
  popup.classList.toggle("hidden");
  popupleft.classList.toggle("hidden");
};

navbarBtn.forEach((element) => element.addEventListener("click", showClose));

overlay.addEventListener("click", showClose);
popupbtn.addEventListener("click", showClose);

document.addEventListener("keydown", function (esc) {
  if (esc.key === "Escape" && body.classList.contains("inactive")) {
    showClose(); //Here we need to call the fx
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//CREATING AN DOM BUTTON TO SKIP THE WELCOME MESSAGE
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const skipButton = document.createElement("a");
skipButton.classList.add("btn", "btn-full", "Welcome-msg__btn");
skipButton.textContent = `Skip`;

//Inserting the dom button at the welcome class
Welcome.append(skipButton);

//using the dom button for funtion
document
  .querySelector(".Welcome-msg__btn")
  .addEventListener("click", function () {
    clearTimeout(messageTimer);
    overlay.classList.toggle("hidden");
    Welcome.classList.toggle("hidden");
    body.classList.toggle("inactive");
  });
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//SMOOTH SCROLLING FOR NAV LINKS
//using event delegation here , rather than putting a event listener to each navlink, we put the event listener to the common parent of the nav links
//CASE 1 EVENT DELEGATION
//STEPS:-
//1. Add event listner to common parent element
//2. Determine which element originated the event
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const navbar = document.querySelector(".navbar"); //selecting the entire navbar

navbar.addEventListener("click", function (e) {
  //Matching stretegy to check if the the elemtn contains our class or not
  if (e.target.classList.contains("navbar__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
