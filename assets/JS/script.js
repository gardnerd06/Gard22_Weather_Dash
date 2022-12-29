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

function getCity() {
  console.log("you've searched for a city");
}
