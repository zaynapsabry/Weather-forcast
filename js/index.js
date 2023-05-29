// =====================Global Variables======================
const documentHTML = document;
const search = documentHTML.getElementById("search");
const submit = documentHTML.getElementById("submit");
let currentDay = documentHTML.getElementById("currentDay");
let left1 = documentHTML.querySelector(".left1");
let center1 = documentHTML.querySelector(".center1");
let right1 = documentHTML.querySelector(".right1");
let left2 = documentHTML.querySelector(".left2");
let center2 = documentHTML.querySelector(".center2");
let right2 = documentHTML.querySelector(".right2");
let dateNow = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let forecast;
let current;
let data;

// =====================Functions======================
async function weather(city) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`
  );
  data = await response.json();
  current = data.current;
  forecast = data.forecast.forecastday;
  displayData();
}

function displayData() {
  left1.innerHTML = `
  <div class="day">${day[dateNow.getDay()]}</div>
  <div class="date">${dateNow.getDate()} February</div>
  `;
  left2.innerHTML = `
  <p class="location">${data.location.name}</p>
  <div
    class="temp-info d-flex justify-content-between align-items-center"
  >
    <p class="temp">${current.temp_c}<sup>o</sup>C</p>
    <span class="temp-icon"
      ><img src="${current.condition.icon}"/>
      </span>
  </div>
  <p class="custom">${current.condition.text}</p>
  <span class="me-4"
    ><img src="img/icon-umberella.png" alt="logo" /> 20%</span
  >
  <span class="me-4"
    ><img src="img/icon-wind.png" alt="logo" /> 18Km/h</span
  >
  <span><img src="img/icon-compass.png" alt="logo" /> East</span>
  `;
  center1.innerHTML = `
  <div class="day">${day[dateNow.getDay() + 1]}</div>
  `;
  center2.innerHTML = `
  <span class="temp-icon"><img src="${forecast[1].day.condition.icon}"/></span>
              <div class="temp-info">
                <p class="temp">${forecast[1].day.maxtemp_c}<sup>o</sup>C</p>
              </div>
              <p class="temp">${forecast[1].day.mintemp_c}<sup>o</sup>C</p>
              <p class="custom">${forecast[1].day.condition.text}</p>
  `;
  right1.innerHTML = `
  <div class="day">${day[dateNow.getDay() + 2]}</div>
  `;
  right2.innerHTML = `
  <span class="temp-icon"><img src="${forecast[2].day.condition.icon}"/></span>
  <div class="temp-info">
    <p class="temp">${forecast[2].day.maxtemp_c}<sup>o</sup>C</p>
  </div>
  <p class="temp">${forecast[2].day.mintemp_c}<sup>o</sup>C</p>
  <p class="custom">${forecast[2].day.condition.text}</p>
  `;
}

function searchData() {
  let searchValue = search.value.toLowerCase();
  weather(searchValue);
}

weather("cairo");

// =====================Events======================
search.addEventListener("input", searchData);
