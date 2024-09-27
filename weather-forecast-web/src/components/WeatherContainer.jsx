import LocationInput from "./LocationInput";
import CurrentDTM from "./CurrentDTM";
import { useEffect, useState } from "react";
import { currentWeather, forecastWeather } from "../utils/api/getWeather";
import { getLocation } from "../utils/location";

function WeatherContainer() {
  const [currentData, setCurrentData] = useState({
    city: "London",
  });
  const [forcastData, setForcastData] = useState({});
  const loadWeather = async () => {
    const loc = await getLocation();
    // const data = await currentWeather(loc.lat, loc.long);
    // console.log(data);
    // setCurrentData({
    //   city: data.name,
    //   humidity: data.main.humidity,
    //   temperature: data.main.temp,
    //   windspeed: data.wind.speed,
    //   weather: data.weather[0].main,
    //   icon: data.weather[0].icon,
    // });
    // console.log(weatherData);

    // const forecast = await forecastWeather(loc.lat, loc.long)
    // setForcastData({

    // })


    Promise.all([
      currentWeather(loc.lat, loc.long),
      forecastWeather(loc.lat, loc.long)
    ])
    .then(values => {
      const current = values[0];
      const forecast = values[1];
      setCurrentData({
        city: current.name,
        humidity: current.main.humidity,
        temperature: current.main.temp,
        windspeed: current.wind.speed,
        weather: current.weather[0].main,
        icon: current.weather[0].icon,
      });
      console.log(forecast)
    })
  };

  useEffect(() => {
    loadWeather();
  }, []);
  console.log(currentData);
  return (
    <div className="weather-container">
      <div className="header">
        <h1>Weather Forecast</h1>
      </div>
      <div className="Main">
        <div className="LeftSection">
          <LocationInput location={currentData?.city ?? ""} />
          <CurrentDTM location={location} />
          <div className="Left-Mid">
            <div className="Weather-Img"></div>
            <div className="Temperture">
              {currentData?.temperature ?? "0"}°C
            </div>
          </div>
          <div className="Condition">{currentData?.weather ?? ""}</div>
          <div className="HumWind">
            <div className="Humidity">
              <p>Humidity</p>
              {currentData?.humidity ?? "0"}%
            </div>
            <div className="WindSpeed">
              <p>Windspeed</p>
              {currentData?.windspeed ?? "0"} km/j
            </div>
          </div>
        </div>
        <div className="RightSection">
          <div className="Chart"></div>
          <div className="forcast">
            <div className="forcast-item"></div>
            <div className="forcast-item"></div>
            <div className="forcast-item"></div>
            <div className="forcast-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherContainer;
