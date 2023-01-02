// search by city and return current and future conditions (5-day)

//  Weather results persist in History

// Results should be

// results should include a 5-day forcast

// When I click a city from the history then you are
// shown current and future conditions for that city.
var current = dayjs();

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
  let key = "d15a75a7f0fb2c83503cf38ba5a847c7";
  var weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
  console.log("you're searching for weather");

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

      var city = info.city.name;
      var icon = info.list[0].weather[0].icon;
      var weatherNow = info.list[0].weather[0].main;
      var currtemp = info.list[0].main.temp;
      var tempHi = info.list[0].main.temp_max;
      var tempLow = info.list[0].main.temp_min;
      var humidity = info.list[0].main.humidity;
      var windSpeed = info.list[0].wind.speed;
      // var precip = "";
      var sunrise = dayjs(info.city.sunrise);
      console.log(sunrise);

      // var sunset = "";
      var weatherCard = `<div class="col">
      <div class="card h-100">
      <img
      src="http://openweathermap.org/img/wn/${icon}@4x.png"
      alt="Weather info"
      width="100"
      height="100"
      class="d-inline-block align-text-top"
      />
      <div class="card-body">
      <h5 class="card-title">${city}</h5>
      <p  class="card-text">${current}</p>
      <p  class="card-text">FORECAST:  ${weatherNow}</p>
      <p  class="card-text">CURR TEMP:  ${currtemp} f</p>
      <p  class="card-text">TODAY'S HIGH:  ${tempHi}</p>
      <p  class="card-text">TODAY'S LOW:  ${tempLow}</p>
      <p id ='humidity' class="card-text">HUMIDITY:${humidity}</p>
      <p id ='precip' class="card-text">  ${windSpeed} MPH</p>
      <p id ='sunrise' class="card-text"></p>
      <p id ='Sunset' class="card-text"></p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
      </div>
      `;
      // console.log(icon);
      // $("#weatherMain");
      // $("#weatherMain").text();
      $("#weatherMain").append(weatherCard);
    });
  //
}
// city name, date, icon that represents
//   current weather, the temperature, humidity and wind speed
