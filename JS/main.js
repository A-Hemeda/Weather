async function search(a) {
  let t = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
  );
  if (t.ok && 400 != t.status) {
    let a = await t.json();
    displayCurrent(a.location, a.current),
      displayAnother(a.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayCurrent(a, t) {
  if (null != t) {
    var e = new Date(t.last_updated.replace(" ", "T"));
    let n = `<div class="today forecast">\n    <div class="forecast-header"  id="today">\n    <div class="day">${
      days[e.getDay()]
    }</div>\n    <div class=" date">${
      e.getDate() + monthNames[e.getMonth()]
    }</div>\n    </div> \x3c!-- .forecast-header --\x3e\n    <div class="forecast-content" id="current">\n    <div class="location">${
      a.name
    }</div>\n    <div class="degree">\n        <div class="num">${
      t.temp_c
    }<sup>o</sup>C</div>\n      \n        <div class="forecast-icon">\n            <img src="https:${
      t.condition.icon
    }" alt="" width=90>\n        </div>\t\n    \n    </div>\n    <div class="custom">${
      t.condition.text
    }</div>\n    <span><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-compass.png" alt="">East</span>\n    </div>\n</div>`;
    document.getElementById("forecast").innerHTML = n;
  }
}
function displayAnother(a) {
  let t = "";
  for (let e = 1; e < a.length; e++)
    t += `\t<div class="forecast">\n        <div class="forecast-header">\n            <div class="day">${
      days[new Date(a[e].date.replace(" ", "T")).getDay()]
    }</div>\n        </div> \x3c!-- .forecast-header --\x3e\n        <div class="forecast-content">\n            <div class="forecast-icon">\n                <img src="https:${
      a[e].day.condition.icon
    }" alt="" width=48>\n            </div>\n            <div class="degree">${
      a[e].day.maxtemp_c
    }<sup>o</sup>C</div>\n            <small>${
      a[e].day.mintemp_c
    }<sup>o</sup></small>\n            <div class="custom">${
      a[e].day.condition.text
    }</div>\n        </div>\n        </div>`;
  document.getElementById("forecast").innerHTML += t;
}
search("cairo");
