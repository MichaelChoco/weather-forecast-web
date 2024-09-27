import { GetLocation } from "./location";
import ForecastWeather from "./forecastWeather";
import CurrentWeather from "./currentWeather";

function WeatherComponent(state) {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [weatherData, setWeatherData] = useState<Weather>(undefined);
  const [error, setError] = useState(null);
  let info = [];
  useEffect(() => {
    async function fetchLocation() {
      try {
        const loc = await GetLocation();
        setLocation(loc);
        if (state == "current") {
          CurrentWeather(loc.lat, loc.long).then( weatherData => {

            setWeatherData({
              city: weatherData.name,
              humidity: weatherData.main.humidity,
              temperature: weatherData.main.temp,
              windspeed: weatherData.wind.speed,
            });
          })
          console.log(weatherData);
        } else {
          ForecastWeather(loc.lat, loc.long);
        }
      } catch (err) {
        setError(err);
      }
    }

    fetchLocation();
  }, []);

  return;
}

export default WeatherComponent;
