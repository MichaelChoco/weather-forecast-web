import LocationInput from "./LocationInput";
import CurrentDTM from "./CurrentDTM";
import { useState } from "react";
import GetLocation from "../utli/location";

function WeatherContainer() {
  const [location, setLocation] = useState("London");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const locations = GetLocation();

  return (
    <div className="weather-container">
      <div className="header">
        <h1>Weather Forecast</h1>
      </div>
      <div className="Main">
        <div className="LeftSection">
          <LocationInput
            location={location}
            handleChange={handleLocationChange}
          />
          <CurrentDTM location={location} />
          <div className="Left-Mid">
            <div className="Weather-Img"></div>
            <div className="Temperture"></div>
          </div>
          <div className="Condition"></div>
          <div className="HumWind">
            <div className="Humidity"></div>
            <div className="WindSpeed"></div>
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
