export const currentWeather = async (lat, long) => {
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const URL = `${BASE_URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
  return await fetch(URL)
    .then((respone) => respone.json())
    .then((data) => {
      return data;
    });
};

export const forecastWeather = async (lat, long) => {
  const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const URL = `${BASE_URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

  return await fetch(URL)
    .then((respone) => respone.json())
    .then((data) => {
      return data;
    });
};


