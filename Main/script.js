// Add Global Variables
var searchHistory = [];
// format weather api url
var weatherApiUrl = "https://api.openweathermap.org";
var apiKey = "9e9a3c70798d20916b97cab9a356da93";

// Add DOM Elements
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("search-input");
var todayForecast = document.querySelector("#today");
var forecastWeatherCont = document.querySelector("forecast");
var searchHistoryCont = document.querySelector("#history");

// Add plugins for timezone
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// Function to display the search history list.
function renderSearchHistory() {
   searchHistoryCont.innerHTML = "";

   // Start at bottom of array
   for (var i = searchHistory.length - 1; i >= 0; i--) {
      var btn = document.createElement("button");
      btn.setAttribute("type", "button");
      btn.setAttribute("aria-controls", "today forecast");
      btn.classList.add("history-btn", "btn-history");

      // `data-search` allows access to city name when click handler is invoked
      btn.setAttribute("data-search", searchHistory[i]);
      btn.textContent = searchHistory[i];
      searchHistoryCont.append(btn);
   }
}

// Function to update local storage history - then update the display history
function appendToHistory(search) {
   // return if there is no search
   if (searchHistory.indexOf(search) !== -1) {
      return;
   }
   searchHistory.push(search);

   localStorage.setItem("search-history", JSON.stringify(searchHistory));
   renderSearchHistory();
}

// Retrieve search histroy from localStorage
function initSearchHistory() {
   var storedHistory = localStorage.getItem("search-history");
   if (storedHistory) {
      searchHistory = JSON.parse(storedHistory);
   }
   renderSearchHistory();
}

// Function to fetch from weather api and display current weather
function renderCurrentWeather(city, weather, timezone) {
   var date = dayjs().tz(timezone).format("M/D/YYYY");

   // Create variables to store response data from fetch
   var tempF = weather.temp;
   var windMph = weather.wind_speed;
   var humidity = weather.humidity;
   var uvi = weather.uvi;
   var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
   var iconDescription = weather.weather[0].description || weather[0].main;

   // createElements
   var card = document.createElement("div");
   var cardBody = document.createElement("div");
   var heading = document.createElement("h2");
   var weatherIcon = document.createElement("img");
   var tempEl = document.createElement("p");
   var windEl = document.createElement("p");
   var humidityEl = document.createElement("p");
   var uvEl = document.createElement("p");
   var uviBadge = document.createElement("button");

   // setAttributes
   card.setAttribute("class", "card");
   cardBody.setAttribute("class", "card-body");
   card.append(cardBody);

   heading.setAttribute("class", "h3 card-title");
   tempEl.setAttribute("class", "card-text");
   windEl.setAttribute("class", "card-text");
   humidityEl.setAttribute("class", "card-text");

   heading.textContent = `${city} (${date})`;
   weatherIcon.setAttribute("src", iconUrl);
   weatherIcon.setAttribute("alt", iconDescription);
   weatherIcon.setAttribute("class", "weather-img");
   heading.append(weatherIcon);
   tempEl.textContent = `Temp: ${tempF}°F`;
   windEl.textContent = `Wind: ${windMph} MPH`;
   humidityEl.textContent = `Humidity: ${humidity} %`;
   cardBody.append(heading, tempEl, windEl, humidityEl);

   uvEl.textContent = "UV Index: ";
   uviBadge.classList.add("btn", "btn-sm");

   if (uvi < 3) {
      uviBadge.classList.add("btn-success");
   } else if (uvi < 7) {
      uviBadge.classList.add("btn-warning");
   } else {
      uviBadge.classList.add("btn-danger");
   }

   uviBadge.textContent = uvi;
   uvEl.append(uviBadge);
   cardBody.append(uvEl);

   todayForecast.innerHTML = "";
   todayForecast.append(card);
}

// Function to fetch data from weather api to display the daily forecast
function renderForecastCard(forecast, timezone) {
   // create variables for the data from the api
   var unixTs = forecast.dt;
   var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
   var iconDescription = forecast.weather[0].description;
   var tempF = forecast.temp.day;
   var { humidity } = forecast;
   var windMph = forecast.wind_speed;

   // create card elements
   var col = document.createElement("div");
   var card = document.createElement("div");
   var cardBody = document.createElement("div");
   var cardTitle = document.createElement("h5");
   var weatherIcon = document.createElement("img");
   var tempEl = document.createElement("p");
   var windEl = document.createElement("p");
   var humidityEl = document.createElement("p");

   // Need to append elemnts to card
   col.append(card);
   card.append(cardBody);
   cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

   // setAttribute
   col.setAttribute("class", "col-md");
   col.classList.add("five-day-card");
   card.setAttribute("class", "card bg-primary h-100 text-white");
   cardBody.setAttribute("class", "card-body p-2");
   cardTitle.setAttribute("class", "card-title");
   tempEl.setAttribute("class", "card-text");
   windEl.setAttribute("class", "card-text");
   humidityEl.setAttribute("class", "card-text");

   // Need to add content to elements
   cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format("M/D/YYYY");
   weatherIcon.setAttribute("src", iconUrl);
   weatherIcon.setAttribute("alt", iconDescription);
   tempEl.textContent = `Temp: ${tempF} °F`;
   windEl.textContent = `Wind: ${windMph} MPH`;
   humidityEl.textContent = `Humidity: ${humidity} %`;

   forecastWeatherCont.append(col);
}

// Need function to display a 5 day weather forecast
function renderForecast(dailyForecast, timezone) {
   var startDt = dayjs().tz(timezone).add(1, "day").startOf("day").unix();
   var endDt = dayjs().tz(timezone).add(6, "day").startOf("day").unix();

   var headingCol = document.createElement("div");
   var heading = document.createElement("h4");

   headingCol.setAttribute("class", "col-12");
   heading.textContent = "5-Day Forecast:";
   headingCol.append(heading);

   forecastWeatherCont.innerHTML = "";
   forecastWeatherCont.append(headingCol);
   for (var i = 0; i < dailyForecast.length; i++) {
      if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
         renderForecastCard(dailyForecast[i], timezone);
      }
   }
}

function renderItems(city, data) {
   renderCurrentWeather(city, data.current, data.timezone);
   renderForecast(data.daily, data.timezone);
}

// Need function to fetch weather based on geolocation and display current/future weather
function fetchWeather(location) {
   // latitude
   var { lat } = location;
   // longitude
   var { lon } = location;
   var city = location.name;
   var apiUrl = `${weatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;

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
   var apiUrl = `${weatherApiUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

   fetch(apiUrl)
      .then(function (res) {
         return res.json();
      })
      .then(function (data) {
         if (!data[0]) {
            alert("No location found");
         } else {
            appendToHistory(search);
            fetchWeather(data[0]);
         }
      })
      .catch(function (err) {
         console.error(err);
      });
}
// Need function to handle search form submit
function handleSearchFormSubmit(e) {
   // Don't continue if there is nothing in the search form
   if (!searchInput.value) {
      return;
   }

   e.preventDefault();
   var search = searchInput.value.trim();
   fetchCoords(search);
   searchInput.value = "";
}

function handleSearchHistory(e) {
   // Don't do search if current elements is not a search history button
   if (!e.target.matches(".btn-history")) {
      return;
   }

   var btn = e.target;
   var search = btn.getAttribute("data-search");
   fetchCoords(search);
}

// initialize search history
initSearchHistory();
searchForm.addEventListener("submit", handleSearchFormSubmit);
searchHistoryCont.addEventListener("click", handleSearchHistory);
