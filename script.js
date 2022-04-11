const weekday = document.querySelector(".weekday");
const month = document.querySelector(".month");

const now = new Date();
const options = {
  weekday: "long",
};
const locale = "en-US";
weekday.textContent = new Intl.DateTimeFormat(locale, options).format(now);

const now1 = new Date();
const options1 = {
  month: "long",
};

month.textContent = new Intl.DateTimeFormat(locale, options1).format(now1);
