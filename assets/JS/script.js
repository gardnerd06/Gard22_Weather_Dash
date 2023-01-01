// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Create a Dashboard with form inputs

// search by city and return current and future conditions (5-day)

//  Weather results persist in History

// Results should be city name, date, icon that represents
//  current weather, the temperature, humidity and wind speed

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
  console.log("you've searched for a city");
  var cityname = $("#txt").val();
  console.log(cityname);
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
      console.log(Object.keys(data));
      const values = Object.values(data[0]);
      var latitude = values[2];
      var longitude = values[3];
      var city = values[0];
      var state = values[5];

      if (confirm(`You are searching for \n ${city} , ${state}?`) === true) {
        $("#latitude").val(latitude);
        $("#longitude").val(longitude);
      } else {
        alert("You must specify both City and State!");
      }

      console.log(values);
    });
}

function getWeather() {
  var lat = $("#latitude").val();
  var lon = $("#longitude").val();
  let key = "d15a75a7f0fb2c83503cf38ba5a847c7";
  var weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
  console.log("you're searching for weather");

  fetch(weatherURL)
    .then((weather) => {
      if (weather.status === 200) {
        return weather.json();
      } else {
        throw new Error("Something went wrong on the API server!");
      }
    })
    .then((data) => {
      console.log(data);
    });
}
