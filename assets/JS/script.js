// search by city and return current and future conditions (5-day)

//  Weather results persist in History

// Results should be

// results should include a 5-day forcast

// When I click a city from the history then you are
// shown current and future conditions for that city.
var current = dayjs().format("dddd, MMMM D, YYYY h:mm A");

$(function currentTime() {
  var now = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A");
  window.setInterval(currentTime);
  $("#currentDay").text(now);
});

$("#getCity").click(function get(event) {
  event.preventDefault();
  getCity();
});

$("#getWeather").click(function get(event) {
  event.preventDefault();
  if ($("#latitude").val() == "") {
    alert("You must search for a city!");
  }
  getWeather();
});

function getCity() {
  var cityname = $("#txt").val();
  let cc = "US";
  let state = $("#txt1").val();
  let limit = "1";
  let key = "d15a75a7f0fb2c83503cf38ba5a847c7";
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${state},${cc}&limit=${limit}&appid=${key}`;
  fetch(requestUrl)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((data) => {
      const values = Object.values(data[0]);
      var latitude = values[2];
      var longitude = values[3];
      var city = values[0];
      var state = values[5];

      if (confirm(`You are searching for \n ${city} , ${state}?`) === true) {
        $("#latitude").val(latitude);
        $("#longitude").val(longitude);
        getWeather();
      } else {
        alert("You must specify both City and State!");
      }
    });
}

function getWeather() {
  var lat = $("#latitude").val();
  var lon = $("#longitude").val();
  var count = "";
  let key = "d15a75a7f0fb2c83503cf38ba5a847c7";
  var weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
  console.log("you're searching for weather");
  var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;

  fetch(currentWeather)
    .then((todayWeather) => {
      if (todayWeather.status === 200) {
        return todayWeather.json();
      } else {
        throw new Error("Something went wrong on the API server!");
      }
    })
    .then((today) => {
      console.log(today);
      var now = dayjs(today.dt * 1000).format("dddd, MMMM D, YYYY h:mm A");
      var weathericon = today.weather[0].icon;
      var sunrise = dayjs(today.sys.sunrise * 1000).format("h:mm-A");
      var sunset = dayjs(today.sys.sunset * 1000).format("h:mm-A");
      var windSpeed = today.wind.speed;
      var mainWeather = today.weather[0].main;
      var humidity = today.main.humidity;
      var tempHi = today.main.temp_max;
      var tempLow = today.main.temp_min;
      var here = today.name;
      var mainTemp = today.main.temp;

      var todayForecast = `<div class="col">
      <div class="card h-100">
        <img
          src="http://openweathermap.org/img/wn/${weathericon}@4x.png"
          alt="Weather info"
          width="100"
          height="100"
          class="d-inline-block align-text-top"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title">${here}</h5>
        <p class="card-text">${now}</p>
        <p class="card-text">Forecast: ${mainWeather}</p>
        <p class="card-text">Temp: ${mainTemp} f</p>
        <p class="card-text">Temp High: ${tempHi}</p>
        <p class="card-text">Temp Low: ${tempLow}</p>
        <p id="humidity" class="card-text">Humidity:${humidity}%</p>
        <p id="precip" class="card-text">WindSpeed: ${windSpeed} MPH</p>
        <p id="sunrise" class="card-text">SunRise: ${sunrise}</p>
        <p id="Sunset" class="card-text">SunSet: ${sunset}</p>
      </div>
    </div>
    
      `;
      $("#weatherMain").prepend(todayForecast);

      var savedCity = todayForecast;
      localStorage.setItem("where", savedCity);
    });

  fetch(weatherURL)
    .then((weather) => {
      if (weather.status === 200) {
        return weather.json();
      } else {
        throw new Error("Something went wrong on the API server!");
      }
    })
    .then((info) => {
      console.log(info);
      var days = info.list;
      for (var i = 0; i < days.length; i++) {
        var city = info.city.name;
        var time = dayjs(info.list[i].dt * 1000).format(
          "dddd, MMMM D, YYYY h:mm A"
        );
        var icon = info.list[i].weather[0].icon;
        var weatherNow = info.list[i].weather[0].main;
        var currtemp = info.list[i].main.temp;
        var humidity1 = info.list[i].main.humidity;
        var windSpeed1 = info.list[i].wind.speed;
        var weatherCard = `<div class="col">
        <div class="card-header h-100">
          <img
            src="http://openweathermap.org/img/wn/${icon}@4x.png"
            alt="Weather info"
            width="100"
            height="100"
            class="d-inline-block align-text-top"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">${city}</h5>
          <p class="card-text">${time}</p>
          <p class="card-text">Forecast: ${weatherNow}</p>
          <p class="card-text">Temp: ${currtemp} f</p>
          <p id="humidity" class="card-text">Humidity:${humidity1}%</p>
          <p id="precip" class="card-text">WindSpeed: ${windSpeed1} MPH</p>
        </div>
      </div>`;

        $("#forecast").append(weatherCard);

        var forecast5 = weatherCard;
        localStorage.setItem("future", forecast5);
      }
    });
}
// city name, date, icon that represents
//   current weather, the temperature, humidity and wind speed
// {/*  */}
$(function persist() {
  var keep = localStorage.getItem("where");
  var get5 = localStorage.getItem("future");
  $("#weatherMain").prepend(keep);
  $("#forecast").append(get5);
});
$(function gethistory() {
  var hist = localStorage.getItem("where");
  $("#history").append(hist);
});
