// allow everything to load in at once
$(document).ready(function() {


    // link api and api key
    var apiKey = "9e9a3c70798d20916b97cab9a356da93";
    var units = "imperial";

    var userFormEl = document.querySelector("#user-form");
    var searchHistory = document.querySelector("#recently-searched");
    var todaysWeather = document.querySelector("#todays-weather");
    var futureForcast = document.querySelector("#5-day-weather");

    // when search button is clicked, pull data for the searched city.
    $("#search-btn").on("click", function() {
        fetch ('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=9e9a3c70798d20916b97cab9a356da93')
        .then(response => response.json() {
        .then(data => {
          console.log(data);  
        })
        });

    });

    // api call for single days weather
    

    // api call for 5 day forcast displayed as a card deck 

    // when a city has been searched, save the city and put into recently searched as a list element


});