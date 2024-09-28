import LocationInput from "./LocationInput";
import CurrentDTM from "./CurrentDTM";
import { useEffect, useState } from "react";
import { getLocation } from "../utils/location";
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
import { forecastWeatherApi } from "../utils/api/getWeatherapi";
function WeatherContainer() {
  const [currentData, setCurrentData] = useState({
    city: "London",
  });
  const [forecastData, setForcastData] = useState([]);
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

    Promise.all([forecastWeatherApi(loc.lat, loc.long)]).then((values) => {
      const weatherinfo = values[0];
      setCurrentData({
        city: weatherinfo.location.name,
        humidity: weatherinfo.current.humidity,
        temperature: weatherinfo.current.heatindex_c,
        windspeed: weatherinfo.current.wind_kph,
        weather: weatherinfo.current.condition.text,
        icon: weatherinfo.current.condition.icon,
      });
      const forecastinfo = weatherinfo.forecast.forecastday.map((item) => ({
        date: item.date,
        temp: item.day.avgtemp_c,
        humidity: item.day.avghumidity,
        weather: item.day.condition.text,
        icon: item.day.condition.icon,
      }));
      setForcastData(forecastinfo);
      console.log(currentData);
      console.log(forecastData);
    });
  };

  useEffect(() => {
    loadWeather();
    Chart.register(CategoryScale);
  }, []);

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
            <div className="Weather-Img">
              <img src={currentData.icon} alt={currentData.weather}></img>
            </div>
            <div className="Temperture">
              {currentData?.temperature ?? "0"}°C
            </div>
          </div>
          <div className="Condition"><p>{currentData?.weather ?? ""}</p></div>
          <div className="HumWind">
            <div className="Humidity">
              <p>Humidity</p>
              <p>{currentData?.humidity ?? "0"}%</p>
            </div>
            <div className="WindSpeed">
              <p>Windspeed</p>
              <p>{currentData?.windspeed ?? "0"} km/j</p>
            </div>
          </div>
        </div>
        <div className="RightSection">
          <div className="Chart">
            <Line
              data={{
                labels: forecastData.map((_) => ""),
                datasets: [
                  {
                    type: "line",
                    data: forecastData.map((data) => data.temp),
                    fill: true,
                    tension: 0.5,
                    pointStyle: "line",
                    borderColor: "rgb(85, 150, 246)",
                    backgroundColor: "rgb(238, 244, 254)",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: "Temperature",
                    align: "start",
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="forcast">
            <div className="forcast-item today">
              <p>Today</p>
              <p>{forecastData[0]?.temp} °C</p>
              <img src={forecastData[0]?.icon} alt={forecastData[0]?.weather} />
              <p>Humidity</p>
              <p>{forecastData[0]?.humidity}%</p>
            </div>
            <div className="forcast-item">
              <p>{forecastData[1]?.date}</p>
              <p>{forecastData[1]?.temp} °C</p>
              <img src={forecastData[1]?.icon} alt={forecastData[1]?.weather} />
              <p>Humidity</p>
              <p>{forecastData[1]?.humidity}%</p>
            </div>
            <div className="forcast-item">
              <p>{forecastData[2]?.date}</p>
              <p>{forecastData[2]?.temp} °C</p>
              <img src={forecastData[2]?.icon} alt={forecastData[2]?.weather} />
              <p>Humidity</p>
              <p>{forecastData[2]?.humidity}%</p>
            </div>
            <div className="forcast-item">
              <p>{forecastData[3]?.date}</p>
              <p>{forecastData[3]?.temp} °C</p>
              <img src={forecastData[3]?.icon} alt={forecastData[3]?.weather} />
              <p>Humidity</p>
              <p>{forecastData[3]?.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherContainer;
