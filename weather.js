var APIKey = 'Api Key';//api key from open weather api
var cel = false; //set as false as data is not in farenheit
var wd; // equal to the api data

function displayTemp(fTemp, c) {
  if (c) return Math.round((fTemp - 32) * (5 / 9)) + ' C';
  return Math.round(fTemp) + ' F';
} //function to change farenheit data to celsius on click of link

function render(wd, cel) {
  console.dir('dfg');
  var currentLocation = wd.name;
  var currentWeather = wd.weather[0].description;
  var currentTemp = displayTemp(wd.main.temp, cel);
  var high = displayTemp(wd.main.temp_max, cel);
  var low = displayTemp(wd.main.temp_min, cel);
  var icon = wd.weather[0].icon;
  var humidity = wd.main.humidity;
  var sea = wd.main.sea_level;
  var windSpeed = wd.wind.speed;
  var windDeg = wd.wind.deg;
  $('#humidity').html('Humidity: ' + humidity + '<br> Sea Level: ' + sea +
  '<br> Wind Speed: ' + windSpeed + '<br> Wind Direction in Degrees: ' + windDeg);
  $('#currentLocation').html(currentLocation);
  $('#currentTemp').html(currentTemp);
  $('#currentWeather').html(currentWeather);
  $('#high-low').html(high + ' High / Low ' + low).addClass('tempView');
  var iconSrc = 'http://openweathermap.org/img/w/' + icon + '.png';
  $('#currentTemp').prepend('<img src="' + iconSrc + '">');
}

//function getting specific data and inputting it into the HTML

$(function () {
  var loc;
  $.getJSON('https://ipinfo.io', function (d) {
        console.log(d);
        loc = d.loc.split(',');
        console.log(loc); // gets the loc coordinates to use in the api string

        //call to weather api after data set
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
        + loc[0] + '&lon='  + loc[1] + '&APPID=' + APIKey, function (apiData) {
            wd = apiData;
            render(apiData, cel);
          });

        $('#toggle').click(function () {
                cel = !cel;
                render(wd, cel);
              }); //toggles the temp from Farenheit to celsius

      });

});
