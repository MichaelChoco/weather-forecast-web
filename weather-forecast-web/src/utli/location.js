function GetLocation() {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coors.longitude;

    console.log("Your current position is:");
    console.log(`Latitude : ${lat}`);
    console.log(`Longitude: ${long}`);

    GetWeather(lat, long)
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}

export default GetLocation;
