// Add Global Variables
var searchHistory = [];
// format weather api url
var weatherApiUrl = "https://api.openweathermap.org";
var apiKey = "9e9a3c70798d20916b97cab9a356da93";

// Add DOM Elements
var userFormEl = document.querySelector("#user-form");
var searchInput = document.querySelector("search-input");
var searchHistory = document.querySelector("#search-history");
var todayWeather = document.querySelector("#today-weather");
var forcastWeather = document.querySelector("weather-forcast");

// Need to add plugins for timezone

// Need function for displaying search history
function renderSearchHistory() {
   // start from bottom of array - count down in order to disploy most reacent search first
   // ' ' access city name when click handler event is invoked
}

// Need function to update local storage history - then update the display history
function appendToHistory(search) {}

// retrieve search histroy from localStorage
function initSearchHistory() {}

// Need function to fetch from weather api and display current weather
function renderCurrentWeather(city, weather, timezone) {
   // Create variables to store response data from fetch
   // createElements
   // setAttributes
}

// Need function to fetch data from weather api to display the daily forcast
function renderForecastCard(forecast, timezone) {
   // create variables for the data from the api
   // need to create card elements
   // Need to append elemnts to card
   // setAttribute
   // Need to add content to elements
}

// Need function to display a 5 day weather forcast
function renderForcast(dailyForcast, timezone) {}

// Need function to fetch weather based on geolocation and display current/future weather
function fetchWeather(location) {
   // latitude
   var { lat } = location;
   // longitude
   var { lon } = location;
   var city = location.name;
   var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

   fetch(apiUrl)
      .then(function (res) {
         return res.json();
      })
      .then(function (data) {
         renderItems(city, data);
      })
      .catch(function (err) {
         console.error(err);
      });
}
// Need function to fetch coordinates
function fetchCoords(search) {
   var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

   fetch(apiUrl)
      .then(function (res) {
         return res.json();
      })
      .then(function (data) {
         if (!data[0]) {
            alert("No location found");
         } else {
            appendToHistory(serach);
            fetchWeather(data[0]);
         }
      })
      .catch(function (err) {
         console.error(err);
      });
}
// Need function to handle search form submit
function handleFormSubmit(e) {}

// Need function to handle search history button
function handleSearchHistory(e) {}

// Need to initialize search histroy form
initSearchHistory();
