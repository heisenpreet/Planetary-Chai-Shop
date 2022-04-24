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
const navbar = document.querySelector(".navbar");

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
let timerRunning = false;
const welcomeMsg = function () {
  // This prevents the page from scrolling down to where it was previously.
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  // This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
  window.scrollTo(0, 0);

  let timer = 10;
  const startTimer = () => {
    setInterval(() => {
      if (timer > 0) {
        timer--;
        timeleft.textContent = String(timer).padStart(2, 0);
      } else {
        clearInterval();
      }
    }, 1000);
  };

  setTimeout(() => {
    startTimer();
  }, 800);

  messageTimer = setTimeout(() => {
    overlay.classList.toggle("hidden");
    Welcome.classList.toggle("hidden");
    body.classList.toggle("inactive");
    timerRunning = true;
  }, 11300); //IMPORTANT CHANGE TO 9000
};

welcomeMsg();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//POPUP FORM FUNCTIONS
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const showClose = function () {
  if (timerRunning) {
    body.classList.toggle("inactive");
    overlay.classList.toggle("hidden");
    popup.classList.toggle("hidden");
    popupleft.classList.toggle("hidden");
  }
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

const hideWelcomeMsg = function () {
  clearTimeout(messageTimer);
  overlay.classList.toggle("hidden");
  Welcome.classList.toggle("hidden");
  body.classList.toggle("inactive");
  timerRunning = true;
};

//using the dom button for funtion
document
  .querySelector(".Welcome-msg__btn")
  .addEventListener("click", hideWelcomeMsg);

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

navbar.addEventListener("click", function (e) {
  //Matching stretegy to check if the the elemtn contains our class or not
  if (e.target.classList.contains("navbar__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//smooth scrolling for footer button without event delegation as its a lone element

const footerbtn = document.querySelector(".footerbtn");
footerbtn.addEventListener("click", function (e) {
  e.preventDefault();
  document
    .querySelector(e.target.getAttribute("href"))
    .scrollIntoView({ behavior: "smooth" });
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//Tabbed Component
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const tabButtons = document.querySelectorAll(".tabbed__button"); //each tab button
const firstButton = document.querySelector(".tabbed__buttons-1");

const tabContainer = document.querySelector(".tabbed__buttons"); //container of buttons
const tabContent = document.querySelectorAll(".tabbed__content"); //content boxex

let bttn = firstButton;
const giggleBtn = (btn) => {
  btn.classList.toggle("tabbed__buttons-active"); // making the button move
};

// const tabmov = setInterval(() => {
//   giggleBtn(bttn);
// }, 900);

//using event delegation on tabContainer

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tabbed__button"); //will return the entire btn and not the child els of button
  if (!clicked) return; //Gurad Clause for null

  //tabs

  tabButtons.forEach((element) => {
    element.classList.remove("tabbed__buttons-active"); //removing from all
  });
  clicked.classList.add("tabbed__buttons-active"); // adding in one
  bttn = clicked;
  // content;
  tabContent.forEach((element) => {
    element.classList.add("tabbed__content-box-hidden");
  });
  document
    .querySelector(`.content-box-${clicked.dataset.tab}`)
    .classList.remove("tabbed__content-box-hidden");
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//nav elements fabe
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const hoverfade = function (e) {
  if (e.target.classList.contains("navbar__link")) {
    const navClFade = e.target;

    //seraching for all other siblings of e.target
    const navSiblings = navClFade
      .closest(".navbar")
      .querySelectorAll(".navbar__link");
    navSiblings.forEach((element) => {
      if (element != navClFade) element.style.opacity = this;
    });
  }
};

navbar.addEventListener("mouseover", hoverfade.bind(0.5));
navbar.addEventListener("mouseout", hoverfade.bind(1));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//Intersection observer API
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const tabbed = document.querySelector(".tabbed");
let tabmov;
const obsCallback = function (entrires) {
  entrires.forEach((element) => {
    if (element.isIntersecting) {
      tabmov = setInterval(() => {
        giggleBtn(bttn);
      }, 900);
    }
    if (!element.isIntersecting) {
      clearInterval(tabmov);
    }
  });
};

const obsOptions = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(tabbed);

///////////////////////////////////////
///////////////////////////////////////
//Revealing elements on scroll , intersection API
///////////////////////////////////////
///////////////////////////////////////
const drinks = document.querySelectorAll(".drink");

const revealSection = function (entrires, observer) {
  const [entry] = entrires;

  if (!entry.isIntersecting) return;

  // const classToRemove = [...entry.target.classList].pop();
  // entry.target.classList.remove(classToRemove);
  drinks.forEach((section) => {
    const classToRemove = [...section.classList].pop();
    section.classList.remove(classToRemove);
  });

  observer.unobserve(entry.target);
};

const drinksObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
drinksObserver.observe(drinks[0]);
drinks.forEach((section, key) => {
  section.classList.add(`fade-in-from-${key}`);
});

//another section

const spicy = document.querySelectorAll(".spicy");
let A = 1; //for the loop over class
const sectionRevel = function (entrires, observer) {
  const [entry] = entrires;

  if (!entry.isIntersecting) return;

  spicy.forEach((section, key) => {
    if (key <= A) {
      section.classList.remove("fade-in-up");
    }
  });
  A += 2;

  observer.unobserve(entry.target);
};
const spicyObserver = new IntersectionObserver(sectionRevel, {
  root: null,
  threshold: 0.15,
});

spicy.forEach((section) => {
  section.classList.add("fade-in-up");
  spicyObserver.observe(section);
});
///////////////////////////////////////
///////////////////////////////////////
//Lazy loading images
///////////////////////////////////////
///////////////////////////////////////

const imgTarget = document.querySelectorAll("img[data-src]");
const loadImg = function (entrires, observer) {
  const [entry] = entrires;
  if (!entry.isIntersecting) return;

  //Replace the src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("img-blur");
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "300px",
});

imgTarget.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////
///////////////////////////////////////
//Sliding window
///////////////////////////////////////
///////////////////////////////////////

const drinksMenuSlider = function () {
  const sliderMenu = document.querySelectorAll(".menu");
  const btnLeft = document.querySelector(".menu__btn-left");
  const btnRight = document.querySelector(".menu__btn-right");

  let currentSlide = 0;
  const maxSlides = sliderMenu.length - 2;

  const slideTo = function (slide) {
    sliderMenu.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  slideTo(0);
  const nextSlide = function (e) {
    e.preventDefault();
    if (currentSlide === maxSlides) {
      currentSlide -= 3;
    } else {
      currentSlide++;
    }
    slideTo(currentSlide);
  };
  btnRight.addEventListener("click", nextSlide);
  const prevSlide = function (e) {
    e.preventDefault();
    if (currentSlide === 0) {
      currentSlide += 3;
    } else {
      currentSlide--;
    }
    slideTo(currentSlide);
  };
  btnLeft.addEventListener("click", prevSlide);
  // //keyboard events
  // document.addEventListener("keydown", function (e) {
  //   e.key === "ArrowLeft" && prevSlide();
  //   e.key === "ArrowRight" && nextSlide();
  // });
};
drinksMenuSlider();
