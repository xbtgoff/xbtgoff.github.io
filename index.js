function getWeather() {
  var location = document.getElementById("location").value;
  if (location != "") {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=ee81ce813f90190bc192d957291399f4";
    fetch(url)
      // make sure to check 404 error
      .then((Response) => Response.json())
      .then((data) => {
        if (data.cod == "404") {
          invalidLocation();
        }
        else if (data.cod == "200") {
          console.log(data);
          document.getElementById("temp").innerHTML = (data.main.temp - 273.15).toFixed(2) + "°C";
          document.getElementById("humidity").innerHTML = data.main.humidity;
          document.getElementById("wind").innerHTML = (data.wind.speed * 3.6).toFixed(2) + "km/h";
          document.getElementById("description").innerHTML = data.weather[0].description;
          if ("temp" != "") {
            document.getElementById("temp-label").style.visibility = "visible";
          }
          if ("humidity" != "") {
            document.getElementById("humidity-label").style.visibility = "visible";
          }
          if ("wind" != "") {
            document.getElementById("wind-label").style.visibility = "visible";
          }
          if ("description" != "") {
            document.getElementById("description-label").style.visibility = "visible";
          }  
          document.getElementById("weather-form").style.visibility = "visible";
        }
      }).catch((err) => console.log("ERROR: " + err));
  } 
}

function clearData() {
  document.getElementById("weather-form").style.visibility = "hidden";
  document.getElementById("location").value = "";
  document.getElementById("temp").innerHTML = "";
  document.getElementById("humidity").innerHTML = "";
  document.getElementById("wind").innerHTML = "";
  document.getElementById("description").innerHTML = "";
  document.getElementById("temp-label").style.visibility = "hidden";
  document.getElementById("humidity-label").style.visibility = "hidden";
  document.getElementById("wind-label").style.visibility = "hidden";
  document.getElementById("description-label").style.visibility = "hidden";
}

function invalidLocation() {
  document.getElementById("location").style.backgroundColor = "lightcoral";
  setTimeout(function() {
    document.getElementById("location").style.backgroundColor = "white";
  }, 500);
}