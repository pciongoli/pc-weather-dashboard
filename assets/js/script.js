// allow everything to load in at once



    // link api and api key
    var apiKey = "9e9a3c70798d20916b97cab9a356da93";
    var units = "imperial";

    var userFormEl = document.querySelector("#user-form");
    var searchHistory = document.querySelector("#recently-searched");
    var todaysWeather = document.querySelector("#todays-weather");

    // when search button is clicked, pull data for the searched city.
    var getCurrentWeather = function(city) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=latitude&=longitude&q=" + city + "&appid=" + apiKey;

            fetch(apiUrl).then(function(response) {
                if (response.ok) {
                response.json()
                } else {
                    alert('error')
                }
            });

    }



    // api call for single days weather
    

    // api call for 5 day forcast displayed as a card deck 

    // when a city has been searched, save the city and put into recently searched as a list element

