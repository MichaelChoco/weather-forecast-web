function GetWeather(lat, long){
  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "4a620d94c3b38a4c1b4e8ed3dee10877";
  let url = api + "?lat=" + lat + "?long=" + long + "&appid=" + apiKey + "&units=metric";

  fetch(url).then(respone => Response.json()).then(data => {
    console.log(data)
  })
}