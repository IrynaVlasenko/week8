function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
                <div class="col">${day}</div>
                <div class="col"><img src="https://cdn.icon-icons.com/icons2/2505/PNG/512/sun_weather_icon_150657.png"
                        alt="" width="100"></div>
                <div class="col"><span class="weather-forecast-temperature-max"> 18° </span>
                    <span class="weather-forecast-temperature-min"> 12° </span>
                </div>
            </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coodinates) {
  let apiKey = "fb4ad69a2bb4c6370849b9a18c3de8e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coodinates.lat}&lon=${coodinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#today");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconeElement = document.querySelector("#icone");
  iconeElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);

  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "fb4ad69a2bb4c6370849b9a18c3de8e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showsearch(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#search-text");
  search(cityInputElement.value);
}

function changeTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  celsTemp.classList.remove("active");
  fahrenTemp.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function changeTempBack(event) {
  event.preventDefault();
  celsTemp.classList.add("active");
  fahrenTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let clickButton = document.querySelector("#search-button");
clickButton.addEventListener("click", showsearch);

let showCity = document.querySelector("#city-search");
showCity.addEventListener("submit", showsearch);

let fahrenTemp = document.querySelector("#fahrenheit");
fahrenTemp.addEventListener("click", changeTemp);
search("Texas");

let celsTemp = document.querySelector("#celsius");
celsTemp.addEventListener("click", changeTempBack);
